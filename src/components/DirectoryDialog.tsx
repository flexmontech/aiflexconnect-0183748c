import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { aiModels, workPlatforms } from '@/lib/platforms-and-models';

export type DirectoryTab = 'platforms' | 'models';

export function DirectoryDialog({ tab, onTab, onClose }: { tab: DirectoryTab | null; onTab: (t: DirectoryTab) => void; onClose: () => void }) {
  const [filter, setFilter] = useState('All');
  const platformFilters = ['All', 'Expert', 'Generalist', 'Enterprise'];
  const modelFilters = ['All', 'Reasoning', 'Multimodal', 'Open-Weights'];
  const filters = tab === 'models' ? modelFilters : platformFilters;
  const switchTab = (t: DirectoryTab) => { setFilter('All'); onTab(t); };

  return <Dialog open={!!tab} onOpenChange={o => !o && onClose()}>
    <DialogContent className="max-h-[88dvh] overflow-y-auto sm:max-w-4xl">
      <DialogHeader>
        <DialogTitle className="font-display text-xl">AI Platforms &amp; Models Directory</DialogTitle>
        <DialogDescription>Who owns each AI work platform, and which models the work trains. Details are educational summaries — always confirm on the official site.</DialogDescription>
      </DialogHeader>
      <div className="flex flex-wrap gap-2">
        {(['platforms', 'models'] as const).map(t => <button key={t} onClick={() => switchTab(t)} className={`rounded-full px-5 py-2 text-sm font-semibold ${tab === t ? 'bg-foreground text-background' : 'border border-border'}`}>{t === 'platforms' ? `Platforms (${workPlatforms.length})` : `Models (${aiModels.length})`}</button>)}
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
