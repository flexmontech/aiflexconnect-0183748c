import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { aiModels, aiTools, courses, workPlatforms } from '@/lib/platforms-and-models';

export type DirectoryTab = 'platforms' | 'models' | 'tools' | 'educate';

export function DirectoryDialog({ tab, onTab, onClose }: { tab: DirectoryTab | null; onTab: (t: DirectoryTab) => void; onClose: () => void }) {
  const [filter, setFilter] = useState('All');
  const platformFilters = ['All', 'Expert', 'Generalist', 'Enterprise'];
  const modelFilters = ['All', 'Reasoning', 'Multimodal', 'Open-Weights'];
  const toolFilters = ['All', 'Evaluation', 'Annotation', 'Prompting', 'Productivity'];
  const courseFilters = ['All', 'Foundations', 'Prompting & Evaluation', 'Technical', 'Certification', 'AI Safety'];
  const filters = tab === 'educate' ? courseFilters : tab === 'models' ? modelFilters : tab === 'tools' ? toolFilters : platformFilters;
  const switchTab = (t: DirectoryTab) => { setFilter('All'); onTab(t); };

  return <Dialog open={!!tab} onOpenChange={o => !o && onClose()}>
    <DialogContent className="max-h-[88dvh] overflow-y-auto sm:max-w-4xl">
      <DialogHeader>
        <DialogTitle className="font-display text-xl">{tab === 'platforms' ? `AI Platforms Directory (${workPlatforms.length})` : tab === 'educate' ? 'AI Educate — Courses & Training' : 'AI Tools & Models'}</DialogTitle>
        <DialogDescription>{tab === 'platforms' ? 'Who owns each AI work platform, what it pays and how to get in. Always confirm on the official site.' : tab === 'educate' ? 'Courses, training and certifications that build AI trainer, evaluator and research skills.' : 'Trending, important tools used in the AI industry — and the frontier models they work with.'}</DialogDescription>
      </DialogHeader>
      <div className="flex flex-wrap gap-2">
        {tab !== 'platforms' && tab !== 'educate' && (['tools', 'models'] as const).map(t => <button key={t} onClick={() => switchTab(t)} className={`rounded-full px-5 py-2 text-sm font-semibold ${tab === t ? 'bg-foreground text-background' : 'border border-border'}`}>{t === 'models' ? `Models (${aiModels.length})` : `Tools (${aiTools.length})`}</button>)}
      </div>
      <div className="flex flex-wrap gap-2">
        {filters.map(f => <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-3 py-1 text-xs font-semibold ${filter === f ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>{f}</button>)}
      </div>
      {tab === 'platforms' ? <div className="grid gap-3 sm:grid-cols-2">
        {workPlatforms.filter(p => filter === 'All' || p.tier === filter).map(p => <article key={p.name} className="rounded-xl border border-border p-4 text-sm">
          <div className="flex items-start justify-between gap-2"><h3 className="font-display text-base font-bold">{p.name}</h3><span className="rounded-full bg-muted px-2 py-0.5 text-xs">{p.tier}</span></div>
          <p className="mt-1 font-semibold text-destructive">Parent: {p.parent}</p>
          <p className="text-xs text-muted-foreground">{p.status}</p>
          <dl className="mt-2 space-y-1"><div><dt className="inline font-semibold">For: </dt><dd className="inline">{p.targets}</dd></div><div><dt className="inline font-semibold">Pay: </dt><dd className="inline">{p.pay}</dd></div><div><dt className="inline font-semibold">Entry: </dt><dd className="inline">{p.entry}</dd></div></dl>
          <a href={p.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 rounded-full bg-foreground px-4 py-1.5 text-xs font-semibold text-background">View gateway <ArrowUpRight className="h-3 w-3" /></a>
        </article>)}
      </div> : tab === 'tools' ? <div className="grid gap-3 sm:grid-cols-2">
        {aiTools.filter(t => filter === 'All' || t.type === filter).map(t => <article key={t.name} className="rounded-xl border border-border p-4 text-sm">
          <div className="flex items-start justify-between gap-2"><h3 className="font-display text-base font-bold">{t.name}</h3><span className="rounded-full bg-muted px-2 py-0.5 text-xs">{t.type}</span></div>
          <p className="mt-1 font-semibold text-destructive">{t.maker}</p>
          <p className="mt-2">{t.use}</p>
          <p className="mt-2 text-xs"><strong>Tip:</strong> {t.tip}</p>
          <a href={t.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 rounded-full bg-foreground px-4 py-1.5 text-xs font-semibold text-background">Open tool <ArrowUpRight className="h-3 w-3" /></a>
        </article>)}
      </div> : tab === 'educate' ? <div className="grid gap-3 sm:grid-cols-2">
        {courses.filter(c => filter === 'All' || c.level === filter).map(c => <article key={c.name} className="rounded-xl border border-border p-4 text-sm">
          <div className="flex items-start justify-between gap-2"><h3 className="font-display text-base font-bold">{c.name}</h3><span className="rounded-full bg-muted px-2 py-0.5 text-xs">{c.level}</span></div>
          <p className="mt-1 font-semibold text-destructive">{c.provider}</p>
          <p className="text-xs text-muted-foreground">{c.cost} · {c.duration}</p>
          <p className="mt-2">{c.learn}</p>
          <a href={c.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 rounded-full bg-foreground px-4 py-1.5 text-xs font-semibold text-background">View course <ArrowUpRight className="h-3 w-3" /></a>
        </article>)}
      </div> : <div className="grid gap-3 sm:grid-cols-2">
        {aiModels.filter(m => filter === 'All' || m.type === filter).map(m => <article key={m.name} className="rounded-xl border border-border p-4 text-sm">
          <div className="flex items-start justify-between gap-2"><h3 className="font-display text-base font-bold">{m.name}</h3><span className="rounded-full bg-muted px-2 py-0.5 text-xs">{m.type}</span></div>
          <p className="mt-1 font-semibold text-destructive">{m.maker}</p>
          <p className="text-xs text-muted-foreground">Current: {m.version}</p>
          <p className="mt-2">{m.note}</p>
          <p className="mt-2 text-xs"><strong>Trained via:</strong> {m.trainedVia.join(' · ')}</p>
        </article>)}
      </div>}
    </DialogContent>
  </Dialog>;
}
