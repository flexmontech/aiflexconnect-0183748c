import { useEffect, useState } from 'react';
import { ArrowUpRight, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getLatestAINews, type NewsItem } from '@/lib/news.functions';

const fmt = (d: string) => { const t = Date.parse(d); return t ? new Date(t).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''; };

export function LiveNews() {
  const [items, setItems] = useState<NewsItem[] | null>(null);
  const [sources, setSources] = useState<string[]>([]);
  const [filter, setFilter] = useState('All');
  const [error, setError] = useState(false);

  useEffect(() => {
    getLatestAINews().then(r => { setItems(r.items); setSources(r.sources); }).catch(() => { setError(true); setItems([]); });
  }, []);

  const shown = (items ?? []).filter(i => filter === 'All' || i.source === filter);
  const present = sources.filter(s => items?.some(i => i.source === s));

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <span className="mr-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-coral"><Radio className="h-4 w-4" /> Live from AI magazines</span>
        {['All', ...present].map(s => (
          <Button key={s} size="sm" variant={filter === s ? 'default' : 'outline'} className="rounded-full" onClick={() => setFilter(s)}>{s}</Button>
        ))}
      </div>
      {items === null ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-40 animate-pulse rounded-2xl bg-muted" />)}</div>
      ) : shown.length === 0 ? (
        <p className="rounded-2xl border border-border p-6 text-sm text-muted-foreground">{error ? 'Live news is temporarily unavailable. Please check back shortly.' : 'No news stories right now. Please check back shortly.'}</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.slice(0, 12).map(n => (
            <a key={n.link} href={n.link} target="_blank" rel="noopener noreferrer" className="group flex flex-col rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-lg">
              <span className="flex items-center justify-between text-xs"><span className="section-label text-coral">{n.source}</span><span className="text-muted-foreground">{fmt(n.date)}</span></span>
              <span className="mt-2 font-display text-base font-bold leading-snug">{n.title}</span>
              <span className="mt-2 line-clamp-3 text-sm text-muted-foreground">{n.summary}</span>
              <span className="mt-auto inline-flex items-center gap-1 pt-3 text-xs font-semibold">Read full story <ArrowUpRight className="h-3.5 w-3.5" /></span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
