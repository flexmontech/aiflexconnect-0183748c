// Educational directory data. Details are compiled summaries; verify on each official site before applying.
export type WorkPlatform = {
  name: string; parent: string; status: string; tier: 'Expert' | 'Generalist' | 'Enterprise';
  targets: string; pay: string; entry: string; url: string;
};

export type AIModel = {
  name: string; maker: string; version: string; type: 'Reasoning' | 'Multimodal' | 'Open-Weights';
  note: string; trainedVia: string[];
};

export const workPlatforms: WorkPlatform[] = [
  { name: 'Outlier', parent: 'Scale AI', status: 'Private (Meta minority stake)', tier: 'Generalist', targets: 'Writers, coders, STEM and language experts', pay: '$15–$50+/hr', entry: 'Skills screening + project assessments', url: 'https://outlier.ai' },
  { name: 'DataAnnotation.tech', parent: 'Surge AI', status: 'Private, bootstrapped', tier: 'Generalist', targets: 'Strong writers, coders, generalists', pay: '$20–$40+/hr', entry: 'Starter assessment (writing + reasoning)', url: 'https://www.dataannotation.tech' },
  { name: 'Alignerr', parent: 'Labelbox', status: 'Private, VC-backed', tier: 'Expert', targets: 'Domain experts, PhDs, coders', pay: '$15–$150/hr', entry: 'AI interview + domain tests', url: 'https://www.alignerr.com' },
  { name: 'Mindrift', parent: 'Toloka AI', status: 'Private (Bezos Expeditions-backed)', tier: 'Expert', targets: 'Subject experts, writers, linguists', pay: '$15–$50+/hr', entry: 'Qualification tests per project', url: 'https://mindrift.ai' },
  { name: 'Mercor', parent: 'Mercor (independent)', status: 'Private, VC-backed', tier: 'Expert', targets: 'Professionals: law, medicine, finance, code', pay: '$30–$150+/hr', entry: 'AI video interview + profile', url: 'https://mercor.com' },
  { name: 'Micro1', parent: 'Micro1 (independent)', status: 'Private, VC-backed', tier: 'Expert', targets: 'Engineers and domain experts', pay: '$25–$100/hr', entry: 'AI interviewer "Zara" screening', url: 'https://micro1.ai' },
  { name: 'Handshake AI', parent: 'Handshake (Stryder Corp)', status: 'Private', tier: 'Expert', targets: 'Students, grads, PhDs', pay: '$30–$100+/hr', entry: 'Handshake profile + fellowship tests', url: 'https://joinhandshake.com' },
  { name: 'Invisible Technologies', parent: 'Invisible (independent)', status: 'Private', tier: 'Expert', targets: 'AI trainers, advanced reasoning experts', pay: '$15–$60/hr', entry: 'Multi-stage assessments', url: 'https://invisible.co' },
  { name: 'TELUS Digital AI', parent: 'TELUS Corporation', status: 'Public (NYSE: TU)', tier: 'Enterprise', targets: 'Raters, linguists, search evaluators', pay: '$10–$20/hr', entry: 'Rater exam + region checks', url: 'https://www.telusdigital.com' },
  { name: 'Appen', parent: 'Appen Limited', status: 'Public (ASX: APX)', tier: 'Enterprise', targets: 'Raters, transcribers, linguists', pay: '$8–$20/hr', entry: 'Project qualification exams', url: 'https://appen.com' },
  { name: 'RWS TrainAI', parent: 'RWS Holdings', status: 'Public (LSE: RWS)', tier: 'Enterprise', targets: 'Linguists, translators, raters', pay: '$10–$30/hr', entry: 'Language + guideline tests', url: 'https://www.rws.com/artificial-intelligence/train-ai-data-services/' },
  { name: 'Rex.zone', parent: 'Rex.zone (independent)', status: 'Private, early-stage', tier: 'Expert', targets: 'Remote experts, writers, coders', pay: '$25–$45+/hr', entry: 'Profile + skills verification', url: 'https://rex.zone' },
  { name: 'Pasiflora AI', parent: 'Pasiflora (independent)', status: 'Private, early-stage', tier: 'Expert', targets: 'Credentialed SMEs, researchers', pay: '$30–$80+/hr', entry: 'Bloom quiz + credential review', url: 'https://pasiflora.ai' },
  { name: 'OneForma', parent: 'Pactera EDGE', status: 'Private', tier: 'Enterprise', targets: 'Multilingual contributors', pay: '$8–$25/hr', entry: 'Per-project qualifications', url: 'https://www.oneforma.com' },
  { name: 'Prolific', parent: 'Prolific (independent)', status: 'Private, UK-based', tier: 'Generalist', targets: 'Research participants, AI taskers', pay: '$8–$30+/hr', entry: 'Profile + screener studies', url: 'https://www.prolific.com' },
  { name: 'TaskUs', parent: 'TaskUs Inc.', status: 'Public (NASDAQ: TASK)', tier: 'Enterprise', targets: 'Content moderators, AI ops staff', pay: 'Salaried / hourly', entry: 'Standard employment hiring', url: 'https://www.taskus.com' },
];

export const aiModels: AIModel[] = [
  { name: 'GPT-5 / o-series', maker: 'OpenAI', version: 'GPT-5, o3, o4-mini', type: 'Reasoning', note: 'Chain-of-thought reasoning for maths, code and science.', trainedVia: ['Outlier', 'Mercor', 'Handshake AI'] },
  { name: 'Claude', maker: 'Anthropic', version: 'Claude Sonnet 4.5, Opus 4.1', type: 'Reasoning', note: 'Strong at coding, writing and safe agentic work.', trainedVia: ['DataAnnotation.tech', 'Mercor', 'Invisible Technologies'] },
  { name: 'Gemini', maker: 'Google DeepMind', version: 'Gemini 2.5 Pro / Flash', type: 'Multimodal', note: 'Text, image, audio and video in one long-context model.', trainedVia: ['TELUS Digital AI', 'Appen', 'Outlier'] },
  { name: 'Llama', maker: 'Meta AI', version: 'Llama 4 Scout / Maverick', type: 'Open-Weights', note: 'Openly downloadable multimodal models.', trainedVia: ['Outlier', 'Alignerr'] },
  { name: 'DeepSeek', maker: 'DeepSeek', version: 'DeepSeek-R1, V3.1', type: 'Open-Weights', note: 'Low-cost open reasoning models.', trainedVia: ['In-house annotation teams'] },
  { name: 'Grok', maker: 'xAI', version: 'Grok 4', type: 'Reasoning', note: 'Real-time X data with heavy reasoning mode.', trainedVia: ['xAI AI Tutor program', 'Mercor'] },
  { name: 'Mistral', maker: 'Mistral AI', version: 'Mistral Large 2, Medium 3', type: 'Open-Weights', note: 'European open and commercial models.', trainedVia: ['Mindrift', 'RWS TrainAI'] },
  { name: 'Command', maker: 'Cohere', version: 'Command A, R+', type: 'Multimodal', note: 'Enterprise search, RAG and multilingual focus.', trainedVia: ['Invisible Technologies', 'Prolific'] },
  { name: 'Gemma', maker: 'Google DeepMind', version: 'Gemma 3', type: 'Open-Weights', note: 'Small open models that run on laptops.', trainedVia: ['Appen', 'OneForma'] },
  { name: 'Amazon Nova', maker: 'Amazon AGI', version: 'Nova Pro / Lite / Premier', type: 'Multimodal', note: 'Multimodal models served through AWS Bedrock.', trainedVia: ['Appen', 'TaskUs'] },
];
