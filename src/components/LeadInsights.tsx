import { useEffect, useState } from 'react';
import { ArrowUpRight, Star } from 'lucide-react';
import { getLeadInsights, type NewsItem } from '@/lib/news.functions';

type Insight = NewsItem & { badge: string };
const fmt = (d: string) => { const t = Date.parse(d); return t ? new Date(t).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''; };

export function LeadInsights() {
  const [items, setItems] = useState<Insight[] | null>(null);
  useEffect(() => { getLeadInsights().then(setItems).catch(() => setItems([])); }, []);
  if (items && items.length === 0) return null;
  return (
    <div className="mb-12 rounded-3xl bg-foreground p-6 text-background sm:p-8">
      <p className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary"><Star className="h-4 w-4" /> AI FLEX insights · refreshed every 2 days</p>
      <div className="grid gap-5 md:grid-cols-2">
        {(items ?? [null, null]).map((n, i) => n ? (
          <a key={n.link} href={n.link} target="_blank" rel="noopener noreferrer" className="group flex flex-col rounded-2xl border border-background/15 bg-background/5 p-6 transition-colors hover:bg-background/10">
            <span className="w-fit rounded-full bg-coral px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-background">{n.badge}</span>
            <span className="mt-4 text-xs text-background/60">{n.source} · {fmt(n.date)}</span>
            <span className="mt-2 font-display text-xl font-bold leading-snug">{n.title}</span>
            <span className="mt-3 line-clamp-3 text-sm text-background/75">{n.summary}</span>
            <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-primary">Read the briefing <ArrowUpRight className="h-4 w-4" /></span>
          </a>
        ) : <div key={i} className="h-56 animate-pulse rounded-2xl bg-background/10" />)}
      </div>
    </div>
  );
}
