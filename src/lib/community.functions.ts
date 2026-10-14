import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

const schema = z.object({
  fullName: z.string().trim().min(2, 'Please enter your name').max(100),
  email: z.string().trim().email('Please enter a valid email').max(255),
});

const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

export const joinCommunity = createServerFn({ method: 'POST' })
  .inputValidator((data: FormData) => {
    if (!(data instanceof FormData)) throw new Error('Invalid form');
    const parsed = schema.parse({ fullName: data.get('fullName'), email: data.get('email') });
    const resume = data.get('resume');
    const file = resume instanceof File && resume.size > 0 ? resume : null;
    if (file && (file.size > 5 * 1024 * 1024 || !allowed.includes(file.type))) throw new Error('Résumé must be a PDF or Word file under 5MB');
    return { ...parsed, file };
  })
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    let resumePath: string | null = null;
    if (data.file) {
      const ext = data.file.name.split('.').pop()?.toLowerCase().replace(/[^a-z]/g, '') || 'pdf';
      resumePath = `${crypto.randomUUID()}.${ext}`;
      const { error } = await supabaseAdmin.storage.from('resumes').upload(resumePath, await data.file.arrayBuffer(), { contentType: data.file.type });
      if (error) throw new Error('Could not upload résumé. Please try again.');
    }
    const { error } = await supabaseAdmin.from('community_join_requests').insert({ full_name: data.fullName, email: data.email.toLowerCase(), resume_path: resumePath });
    if (error) throw new Error('Could not save your details. Please try again.');
    return { ok: true };
  });
