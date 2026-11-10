import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowLeft, ArrowUpRight, Search } from 'lucide-react';
import { workPlatforms } from '@/lib/platforms-and-models';

export const Route = createFileRoute('/platforms')({
  head: () => ({ meta: [
    { title: 'AI Platforms Directory — AI FLEX Connect' },
    { name: 'description', content: 'Full list of AI training work platforms: owners, pay, who they hire and how to get in.' },
    { property: 'og:title', content: 'AI Platforms Directory — AI FLEX Connect' },
    { property: 'og:description', content: 'Every major AI training platform in one place, with pay and entry requirements.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' },
  ] }),
  component: PlatformsPage,
});

function PlatformsPage() {
  const [tier, setTier] = useState('All');
  const [q, setQ] = useState('');
  const list = workPlatforms.filter(p => (tier === 'All' || p.tier === tier) && `${p.name} ${p.parent} ${p.targets}`.toLowerCase().includes(q.toLowerCase()));
  return <main className="min-h-screen bg-background">
    <header className="flex-band"><div className="section-shell flex h-16 items-center justify-between">
      <Link to="/" className="flex-wordmark text-[14px] text-ink">AI FLEX <span className="text-crimson">Connect</span></Link>
      <Link to="/" className="flex-nav inline-flex items-center gap-1 text-sm"><ArrowLeft className="h-4 w-4" /> Home</Link>
    </div></header>
    <section className="section-shell section-space">
      <p className="section-label text-crimson">Companies</p>
      <h1 className="display-heading mt-2 text-3xl md:text-4xl">AI Platforms Directory ({workPlatforms.length})</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">Who owns each AI work platform, what it pays and how to get in. Always confirm details on the official site.</p>
      <div className="mt-8 flex flex-wrap items-center gap-2">
        <label className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2"><Search className="h-4 w-4" /><input value={q} onChange={e => setQ(e.target.value)} placeholder="Search platforms" className="bg-transparent text-sm outline-none" /></label>
        {['All', 'Expert', 'Generalist', 'Enterprise'].map(t => <button key={t} onClick={() => setTier(t)} className={`rounded-full px-4 py-2 text-xs font-semibold ${tier === t ? 'flex-pill' : 'bg-muted'}`}>{t}</button>)}
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map(p => <article key={p.name} className="lift rounded-2xl border border-border bg-card p-5 text-sm">
          <div className="flex items-start justify-between gap-2"><h2 className="font-display text-lg font-bold">{p.name}</h2><span className="rounded-full bg-muted px-2 py-0.5 text-xs">{p.tier}</span></div>
          <p className="mt-1 font-semibold text-crimson">Parent: {p.parent}</p>
          <p className="text-xs text-muted-foreground">{p.status}</p>
          <p className="mt-3"><strong>For:</strong> {p.targets}</p>
          <p className="mt-1"><strong>Pay:</strong> {p.pay}</p>
          <p className="mt-1"><strong>Entry:</strong> {p.entry}</p>
          <a href={p.url} target="_blank" rel="noopener noreferrer" className="flex-pill mt-4 inline-flex items-center gap-1 px-4 py-1.5 text-xs font-semibold">Visit site <ArrowUpRight className="h-3 w-3" /></a>
        </article>)}
        {!list.length && <p className="text-muted-foreground">No platforms match.</p>}
      </div>
    </section>
  </main>;
}
