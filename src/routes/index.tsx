import { createFileRoute } from '@tanstack/react-router';
import { useState, type ReactNode } from 'react';
import { ArrowRight, ArrowUpRight, BookOpen, BrainCircuit, Check, CheckCheck, ChevronDown, Clock3, Code2, FlaskConical, Layers3, MapPin, Menu, Search, ShieldCheck, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { categories, opportunities, platforms, lessons, updates } from '@/lib/sample-content';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'AI FLEX Connect — Find Your Place in the AI Work Economy' },
    { name: 'description', content: 'Discover AI work, understand AI training opportunities, learn useful skills and find legitimate AI platforms with AI FLEX Connect.' },
    { property: 'og:title', content: 'AI FLEX Connect — Find Your Place in the AI Work Economy' },
    { property: 'og:description', content: 'An information and opportunity platform for people exploring AI work.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});

type Modal = { title: string; text: string; detail?: ReactNode } | null;

const categoryInfo: Record<string, { icon: typeof BrainCircuit; text: string }> = {
  'AI Trainer': { icon: BrainCircuit, text: 'Teach models through writing, examples and expert feedback.' },
  'AI Evaluator': { icon: CheckCheck, text: 'Judge AI output for quality, relevance and accuracy.' },
  'LLM Evaluation': { icon: Code2, text: 'Review language-model reasoning and responses.' },
  'Data Annotation': { icon: Layers3, text: 'Label text, image and audio data that AI learns from.' },
  'AI Research': { icon: FlaskConical, text: 'Support studies on how people and AI work together.' },
  'AI Safety': { icon: ShieldCheck, text: 'Help test AI for harmful, biased or unsafe behaviour.' },
};

function Brand() {
  return <span className="flex items-center gap-2.5">
    <span className="relative grid h-9 w-9 place-items-center rounded-full bg-primary font-display text-sm font-extrabold text-primary-foreground glow-gold">AF<span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-card bg-coral" /></span>
    <span className="font-display text-[17px] font-bold tracking-tight text-foreground">AI FLEX <span className="font-medium text-muted-foreground">Connect</span></span>
  </span>;
}

function Heading({ label, title, text, action }: { label: string; title: string; text?: string; action?: ReactNode }) {
  return <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
    <div className="max-w-xl">
      <p className="section-label mb-3 flex items-center gap-2 text-muted-foreground"><span className="h-px w-6 bg-coral" />{label}</p>
      <h2 className="display-heading text-3xl text-foreground sm:text-4xl">{title}</h2>
      {text && <p className="mt-3 leading-relaxed text-muted-foreground">{text}</p>}
    </div>
    {action}
  </div>;
}

function HeroGraphic() {
  return <div className="relative mx-auto aspect-square w-full max-w-[420px]" aria-hidden="true">
    <div className="dot-grid absolute inset-6 rounded-full opacity-70" />
    <div className="orbit absolute inset-0" />
    <div className="orbit absolute inset-[18%]" />
    <div className="absolute inset-[34%] grid place-items-center rounded-full bg-primary glow-gold"><Sparkles className="h-10 w-10 text-primary-foreground" /></div>
    {[
      { t: 'AI Trainer', c: 'left-0 top-[18%]' },
      { t: 'Evaluation', c: 'right-0 top-[30%]' },
      { t: 'AI Safety', c: 'bottom-[14%] left-[8%]' },
      { t: 'Learning', c: 'bottom-[4%] right-[14%]' },
    ].map((n, i) => <span key={n.t} className={`float-slow absolute ${n.c} flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-xs font-semibold text-foreground shadow-sm`} style={{ animationDelay: `${i * 0.8}s` }}><span className={`h-2 w-2 rounded-full ${i % 2 ? 'bg-coral' : 'bg-primary'}`} />{n.t}</span>)}
  </div>;
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [location, setLocation] = useState('All locations');
  const [modal, setModal] = useState<Modal>(null);

  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); setMenuOpen(false); };
  const soon = (title: string) => { setMenuOpen(false); setModal({ title, text: 'This section is coming soon. AI FLEX Connect is currently a preview edition with sample content.' }); };

  const navGroups = [
    { name: 'AI Work', act: () => go('find'), subs: [
      { name: 'Jobs', act: () => go('featured') },
      { name: 'Referrals', act: () => soon('Referrals') },
    ] },
    { name: 'AI Dev Platforms', act: () => go('platforms'), subs: [
      { name: 'Companies', act: () => go('platforms') },
      { name: 'AI Updates', act: () => go('updates') },
    ] },
    { name: 'AI Learning', act: () => go('learning'), subs: [
      { name: 'AI Tools', act: () => soon('AI Tools') },
      { name: 'AI Models', act: () => soon('AI Models') },
      { name: 'AI Update', act: () => go('updates') },
      { name: 'AI Educate', act: () => go('learning') },
    ] },
  ];

  const locations = ['All locations', ...Array.from(new Set(opportunities.map(o => o.location)))];
  const filtered = opportunities.filter(o => (category === 'All' || o.category === category) && (location === 'All locations' || o.location === location) && `${o.title} ${o.company} ${o.skills.join(' ')}`.toLowerCase().includes(query.toLowerCase().trim()));
  const pickCategory = (c: string) => { setCategory(c); go('featured'); };
  const openDetail = (o: typeof opportunities[number]) => setModal({ title: o.title, text: o.description, detail: <div className="space-y-4 text-sm">
    <div className="flex flex-wrap gap-2">{[o.company, o.location, o.type].map(t => <span key={t} className="rounded-full bg-muted px-3 py-1">{t}</span>)}</div>
    <p><strong>{o.rate} / hour</strong> <span className="text-muted-foreground">· illustrative</span></p>
    <p className="text-muted-foreground">Skills: {o.skills.join(' · ')}</p>
    <p className="rounded-lg border-l-2 border-coral bg-coral-soft p-3 leading-relaxed">This is sample content, not a live listing. Always check a platform's eligibility, pay terms and legitimacy before applying.</p>
  </div> });

  return <div id="home" className="bg-background text-foreground">
    <header className="sticky top-0 z-30 border-b border-border bg-card/90 backdrop-blur">
      <div className="section-shell flex h-[72px] items-center justify-between gap-4">
        <button onClick={() => go('home')} aria-label="AI FLEX Connect home"><Brand /></button>
        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          {navGroups.map(g => <div key={g.name} className="group relative">
            <button onClick={g.act} className="flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              {g.name} <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
            </button>
            <div className="invisible absolute left-0 top-full z-40 min-w-[180px] translate-y-1 rounded-2xl border border-border bg-card p-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              {g.subs.map(s => <button key={s.name} onClick={s.act} className="block w-full rounded-xl px-3.5 py-2.5 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">{s.name}</button>)}
            </div>
          </div>)}
          <Button size="sm" className="ml-2 rounded-full" onClick={() => go('join')}>Join</Button>
        </nav>
        <Button size="icon" variant="ghost" className="lg:hidden" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
      </div>
      {menuOpen && <nav aria-label="Mobile navigation" className="section-shell grid gap-1 border-t border-border py-3 lg:hidden">
        {navGroups.map(g => <div key={g.name}>
          <button onClick={g.act} className="w-full rounded-lg px-3 py-2 text-left text-sm font-semibold hover:bg-muted">{g.name}</button>
          <div className="grid gap-0.5 pb-1 pl-4">{g.subs.map(s => <button key={s.name} onClick={s.act} className="rounded-lg px-3 py-1.5 text-left text-sm text-muted-foreground hover:bg-muted hover:text-foreground">{s.name}</button>)}</div>
        </div>)}
        <Button className="mt-1 rounded-full" onClick={() => go('join')}>Join</Button>
      </nav>}
    </header>

    <main>
      {/* Hero — graphic left, words right */}
      <section className="hero-field overflow-hidden">
        <div className="section-shell grid items-center gap-12 py-16 md:grid-cols-[1fr_1.1fr] md:py-24">
          <HeroGraphic />
          <div className="hero-enter">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-gold-soft px-3 py-1.5 text-xs font-semibold text-foreground"><span className="h-1.5 w-1.5 rounded-full bg-coral" /> Information · Opportunity · Learning</p>
            <h1 className="display-heading text-[32px] leading-[1.12] sm:text-[44px]">
              <span className="text-coral-soft-foreground">Find Your Place in the </span>
              <span className="relative whitespace-nowrap text-coral">AI Work<span className="absolute inset-x-0 bottom-1 -z-10 h-2.5 rounded bg-primary/50" /></span>
              <span className="text-foreground"> Economy</span>
            </h1>
            <p className="mt-5 max-w-lg leading-relaxed text-muted-foreground">AI FLEX Connect helps you discover AI work, understand AI training opportunities, learn useful skills and find legitimate platforms — all in one clear, trustworthy place.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="h-12 rounded-full px-7 glow-gold" onClick={() => go('find')}>AI Jobs | Placements <ArrowRight /></Button>
              <Button size="lg" variant="outline" className="h-12 rounded-full px-7" onClick={() => go('learning')}><BookOpen /> AI Educate | Learn</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Find AI Work */}
      <section id="find" className="scroll-mt-20 relative z-10 -mt-6">
        <div className="section-shell rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div><h2 className="display-heading text-2xl sm:text-3xl">Find AI Work</h2><p className="mt-1 text-muted-foreground">Search sample roles by skill, title or platform.</p></div>
            <span className="text-sm text-muted-foreground"><strong className="text-foreground">{filtered.length}</strong> matching opportunities</span>
          </div>
          <div className="grid gap-3 md:grid-cols-[1fr_200px_180px_auto]">
            <label className="flex h-14 items-center gap-3 rounded-2xl border border-input bg-background px-4 focus-within:border-primary"><Search className="h-5 w-5 text-muted-foreground" /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="e.g. writing, Python, evaluation" aria-label="Search AI work" className="w-full bg-transparent outline-none placeholder:text-muted-foreground" /></label>
            <select value={category} onChange={e => setCategory(e.target.value)} aria-label="Category" className="h-14 rounded-2xl border border-input bg-background px-4">{['All', ...categories].map(c => <option key={c} value={c}>{c === 'All' ? 'All categories' : c}</option>)}</select>
            <select value={location} onChange={e => setLocation(e.target.value)} aria-label="Location" className="h-14 rounded-2xl border border-input bg-background px-4">{locations.map(l => <option key={l}>{l}</option>)}</select>
            <Button className="h-14 rounded-2xl px-7" onClick={() => go('featured')}>Search</Button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">{['Writing', 'Coding', 'Research', 'Annotation'].map(t => <button key={t} onClick={() => setQuery(t)} className="rounded-full border border-border px-3 py-1.5 text-muted-foreground hover:border-primary hover:text-foreground">{t}</button>)}</div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="section-space scroll-mt-20">
        <div className="section-shell">
          <Heading label="Explore" title="View AI Work Categories" text="Six ways people contribute human judgement to AI." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c, i) => { const { icon: Icon, text } = categoryInfo[c]; return <button key={c} onClick={() => pickCategory(c)} className="lift group flex items-start gap-4 rounded-2xl border border-border bg-card p-6 text-left">
              <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${i % 3 === 2 ? 'bg-coral-soft text-coral' : 'bg-gold-soft text-foreground'}`}><Icon className="h-6 w-6" /></span>
              <span className="flex-1"><span className="flex items-center justify-between font-display text-lg font-bold">{c}<ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span><span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{text}</span></span>
            </button>; })}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section id="featured" className="section-space scroll-mt-20 bg-muted">
        <div className="section-shell">
          <Heading label="Opportunities" title="Featured Opportunities" text="Sample roles to show what AI work can look like." action={(category !== 'All' || query || location !== 'All locations') ? <Button variant="outline" className="rounded-full" onClick={() => { setQuery(''); setCategory('All'); setLocation('All locations'); }}>Clear filters</Button> : undefined} />
          {filtered.length === 0 ? <p className="rounded-2xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">No sample opportunities match yet — try another search.</p> :
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map(o => <article key={o.id} className="lift flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
              <div className={`h-1.5 ${o.featured ? 'bg-primary' : 'bg-border'}`} />
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between text-xs"><span className="font-semibold uppercase tracking-wider text-muted-foreground">{o.category}</span>{o.featured && <span className="rounded-full bg-coral-soft px-2.5 py-1 font-semibold text-coral">Featured</span>}</div>
                <h3 className="mt-3 font-display text-xl font-bold leading-snug">{o.title}</h3>
                <p className="mt-1 text-sm font-medium text-muted-foreground">{o.company}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{o.description}</p>
                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground"><span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{o.location}</span><span className="flex items-center gap-1"><Clock3 className="h-3.5 w-3.5" />{o.type}</span></div>
                <div className="mt-5 flex items-center justify-between border-t border-border pt-4"><span className="font-display font-bold">{o.rate}<span className="text-xs font-normal text-muted-foreground"> /hr</span></span><button onClick={() => openDetail(o)} className="flex items-center gap-1 text-sm font-semibold hover:text-coral">Learn more <ArrowRight className="h-4 w-4" /></button></div>
              </div>
            </article>)}
          </div>}
        </div>
      </section>

      {/* Platforms */}
      <section id="platforms" className="section-space scroll-mt-20">
        <div className="section-shell">
          <Heading label="Where the work is" title="AI Dev Platforms" text="A small preview of platforms people use for AI training work." />
          <div className="grid gap-4 md:grid-cols-3">
            {platforms.map(p => <div key={p.name} className="rounded-2xl border border-border p-6">
              <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-full border-2 border-primary font-display font-bold">{p.mark}</span><div><h3 className="font-display font-bold">{p.name}</h3><p className="text-xs text-muted-foreground">{p.subtitle}</p></div></div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              <p className="mt-4 text-xs font-semibold text-foreground">{p.tags}</p>
            </div>)}
          </div>
        </div>
      </section>

      {/* Learning */}
      <section id="learning" className="section-space scroll-mt-20 bg-muted">
        <div className="section-shell">
          <Heading label="AI Learning" title="Learn About AI Work" text="Short, practical guides to help you start with confidence." />
          <div className="grid gap-5 md:grid-cols-3">
            {lessons.map((l, i) => <button key={l.title} onClick={() => setModal({ title: l.title, text: `${l.text} Full lessons will be available to members soon.` })} className="lift rounded-2xl border border-border bg-card p-7 text-left">
              <span className="font-display text-5xl font-extrabold text-primary">0{i + 1}</span>
              <p className="section-label mt-4 text-coral">{l.category}</p>
              <h3 className="mt-2 font-display text-xl font-bold">{l.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{l.text}</p>
              <p className="mt-5 flex items-center gap-1.5 text-xs text-muted-foreground"><Clock3 className="h-3.5 w-3.5" />{l.duration}</p>
            </button>)}
          </div>
        </div>
      </section>

      {/* Updates */}
      <section id="updates" className="section-space scroll-mt-20">
        <div className="section-shell">
          <Heading label="Stay informed" title="AI Updates" />
          <div className="divide-y divide-border rounded-2xl border border-border">
            {updates.map(u => <button key={u.title} onClick={() => setModal({ title: u.title, text: u.text })} className="group grid w-full gap-2 p-6 text-left transition-colors hover:bg-muted sm:grid-cols-[140px_1fr_auto] sm:items-center sm:gap-6">
              <span className="text-xs text-muted-foreground">{u.date}</span>
              <span><span className="section-label text-coral">{u.label}</span><span className="mt-1 block font-display text-lg font-bold">{u.title}</span><span className="mt-1 block text-sm text-muted-foreground">{u.text}</span></span>
              <ArrowUpRight className="hidden h-5 w-5 text-muted-foreground group-hover:text-foreground sm:block" />
            </button>)}
          </div>
        </div>
      </section>

      {/* Join + Footer (dark band) */}
      <div id="join" className="scroll-mt-20 bg-ink text-on-dark">
        <section className="section-shell section-space">
          <p className="section-label mb-4 text-primary">Good connections. Greater possibilities.</p>
          <div className="grid items-center gap-10 md:grid-cols-[1.5fr_1fr]">
            <div>
              <h2 className="display-heading text-3xl sm:text-5xl">Don't just follow AI. <span className="text-primary">Find your place in it.</span></h2>
              <ul className="mt-8 space-y-3 text-sm text-on-dark-muted">
                {['AI training resources', 'Practical tips', 'Work updates'].map(t => (
                  <li key={t} className="flex items-center gap-3"><span className="grid h-6 w-6 place-items-center rounded-full bg-primary/15"><Check className="h-3.5 w-3.5 text-primary" /></span>{t}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <Button size="lg" className="h-12 rounded-full glow-gold" onClick={() => setModal({ title: 'Join AI FLEX Connect', text: 'Membership is coming soon. Members will receive additional AI training, tips and resources.' })}>Join AI FLEX Connect <ArrowUpRight /></Button>
              <button onClick={() => setModal({ title: 'Register', text: 'Registration is coming soon. No account details are collected yet.' })} className="text-sm font-semibold text-on-dark-muted transition-colors hover:text-on-dark">Ready to get started? <span className="text-primary">Register →</span></button>
            </div>
          </div>
        </section>

        <footer className="border-t border-on-dark/10">
          <div className="section-shell grid gap-10 py-14 sm:grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
            <div>
              <span className="flex items-center gap-2.5">
                <span className="relative grid h-9 w-9 place-items-center rounded-full bg-primary font-display text-sm font-extrabold text-primary-foreground glow-gold">AF<span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-ink bg-coral" /></span>
                <span className="font-display text-[17px] font-bold tracking-tight text-on-dark">AI FLEX <span className="font-medium text-on-dark-muted">Connect</span></span>
              </span>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-on-dark-muted">Connecting human potential with the possibilities of AI.</p>
            </div>
            {[
              { h: 'Discover', items: [{ t: 'AI Work', id: 'work' }, { t: 'AI Platforms', id: 'platforms' }, { t: 'AI Work Categories', id: 'categories' }] },
              { h: 'Grow', items: [{ t: 'Learning', id: 'learning' }, { t: 'AI Work Updates', id: 'updates' }, { t: 'Join the community', id: 'join' }] },
              { h: 'AI FLEX Connect', items: [{ t: 'About us', id: 'top' }, { t: 'Register', id: 'join' }] },
            ].map(col => (
              <div key={col.h}>
                <p className="section-label mb-4 text-on-dark-muted">{col.h}</p>
                <ul className="space-y-2.5 text-sm">
                  {col.items.map(i => <li key={i.t}><button onClick={() => go(i.id)} className="text-on-dark-muted transition-colors hover:text-primary">{i.t}</button></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-on-dark/10">
            <div className="section-shell flex flex-wrap items-center justify-between gap-4 py-6 text-xs text-on-dark-muted">
              <p className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5 text-primary" />Human potential. AI possibilities.</p>
              <p>© 2026 AI FLEX Connect. All rights reserved.</p>
              <p>Preview edition · All opportunities and resources are sample content.</p>
            </div>
          </div>
        </footer>
      </div>
    </main>

    <Dialog open={!!modal} onOpenChange={o => !o && setModal(null)}>
      <DialogContent>
        <DialogHeader><DialogTitle className="font-display text-xl">{modal?.title}</DialogTitle><DialogDescription className="leading-relaxed">{modal?.text}</DialogDescription></DialogHeader>
        {modal?.detail}
      </DialogContent>
    </Dialog>
  </div>;
}
