import { createFileRoute, Link } from '@tanstack/react-router';
import { useRef, useState, type FormEvent, type ReactNode } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { joinCommunity } from '@/lib/community.functions';
import { ArrowRight, ArrowUpRight, BookOpen, Check, ChevronDown, ChevronLeft, ChevronRight, Clock3, MapPin, Menu, Search, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { categories, opportunities, platforms, lessons } from '@/lib/sample-content';
import { DirectoryDialog, type DirectoryTab } from '@/components/DirectoryDialog';
import { LiveNews } from '@/components/LiveNews';
import { LeadInsights } from '@/components/LeadInsights';
import { demoInformation, lessonSections } from '@/lib/demo-content';

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


function InformationSections({ sections }: { sections: { heading: string; text: string }[] }) {
  return <div className="space-y-5 py-2">{sections.map(s => <section key={s.heading}><h3 className="mb-1 font-display text-sm font-bold">{s.heading}</h3><p className="text-sm leading-relaxed text-muted-foreground">{s.text}</p></section>)}</div>;
}

function Brand() {
  return <span className="flex items-center gap-2.5">
    <span className="relative grid h-10 w-10 place-items-center rounded-md border-2 border-ink bg-card font-display text-sm font-extrabold text-ink">AF<span className="absolute -right-1 -top-1 h-3 w-3 rounded-sm bg-crimson" /></span>
    <span className="flex-wordmark text-[14px] text-ink">AI FLEX <span className="text-crimson">Connect</span></span>
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
  const [joinOpen, setJoinOpen] = useState(false);
  const [dirTab, setDirTab] = useState<DirectoryTab | null>(null);
  const openDir = (t: DirectoryTab) => { setMenuOpen(false); setDirTab(t); };

  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); setMenuOpen(false); };
  const showInformation = (title: string) => {
    const information = demoInformation[title];
    if (!information) return;
    setMenuOpen(false);
    setModal({ title, text: information.intro, detail: <InformationSections sections={information.sections} /> });
  };

  const navGroups = [
    { name: 'AI Work', act: () => showInformation('AI Work'), intro: 'Roles, skills and pathways into AI work.', subs: [
      { name: 'Jobs', act: () => go('featured') },
    ] },
    { name: 'AI Platforms', act: () => showInformation('AI Platforms'), intro: 'Companies, project types and industry developments.', subs: [
      { name: 'Companies', act: () => openDir('platforms') },
      { name: 'AI Updates', act: () => go('updates') },
    ] },
    { name: 'AI Learning', act: () => showInformation('AI Learning'), intro: 'Tools, models and practical learning foundations.', subs: [
      { name: 'AI Tools & Models', act: () => openDir('tools') },
      { name: 'AI Educate', act: () => openDir('educate') },
      { name: 'AI Tips & Advice', act: () => openDir('tips') },
    ] },
  ];

  const locations = ['All locations', ...Array.from(new Set(opportunities.map(o => o.location)))];
  const filtered = opportunities.filter(o => (category === 'All' || o.category === category) && (location === 'All locations' || o.location === location) && query.toLowerCase().split(/\s+/).filter(Boolean).every(w => `${o.title} ${o.company} ${o.category} ${o.type} ${o.description} ${o.skills.join(' ')}`.toLowerCase().includes(w)));
  const pickCategory = (c: string) => { setCategory(c); go('featured'); };
  const openDetail = (o: typeof opportunities[number]) => setModal({ title: o.title, text: o.description, detail: <div className="space-y-4 text-sm">
    <div className="flex flex-wrap gap-2">{[o.company, o.location, o.type].map(t => <span key={t} className="rounded-full bg-muted px-3 py-1">{t}</span>)}</div>
    <p><strong>{o.rate} / hour</strong> <span className="text-muted-foreground">· illustrative</span></p>
    <p className="text-muted-foreground">Skills: {o.skills.join(' · ')}</p>
    <InformationSections sections={[{ heading: 'Typical tasks', text: `Use ${o.skills.join(', ')} to review examples, follow a quality rubric and explain your decisions clearly.` }, { heading: 'Application checklist', text: 'Prepare a relevant work sample, verify location eligibility and review the official assessment and payment terms. Project availability and rates can vary.' }]} />
    <p className="rounded-lg border-l-2 border-coral bg-coral-soft p-3 leading-relaxed">Check AI platform's eligibility, Pay terms and Current dates</p>
  </div> });

  return <div id="home" className="bg-background text-foreground">
    <header className="flex-band sticky top-0 z-30 border-b border-border">
      <div className="section-shell flex h-[80px] items-center justify-between gap-4">
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent" onClick={() => go('home')} aria-label="AI FLEX Connect home"><Brand /></Button>
        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          {navGroups.map(g => <div key={g.name} className="group relative">
            <Button variant="ghost" onClick={g.act} className="flex-nav flex items-center gap-1 rounded-full px-3.5 py-2 text-[15px] transition-colors hover:bg-transparent">
              {g.name} <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
            </Button>
            <div className="invisible absolute right-0 top-full z-40 w-[260px] translate-y-1 rounded-lg border border-border bg-card p-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <p className="px-3.5 py-3 text-xs leading-relaxed text-muted-foreground">{g.intro}</p>
              {g.subs.map(s => <Button variant="ghost" key={s.name} onClick={s.act} className="block w-full rounded-xl px-3.5 py-2.5 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">{s.name}</Button>)}
            </div>
          </div>)}
          <Button size="sm" className="flex-pill ml-2 px-6" onClick={() => go('join')}>Join</Button>
        </nav>
        <Button size="icon" variant="ghost" className="lg:hidden" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
      </div>
      {menuOpen && <nav aria-label="Mobile navigation" className="section-shell grid gap-1 border-t border-border py-3 lg:hidden">
        {navGroups.map(g => <div key={g.name}>
          <Button variant="ghost" onClick={g.act} className="w-full justify-start rounded-full px-3 py-2 text-left text-sm font-semibold hover:bg-muted">{g.name}</Button><p className="px-3 pb-2 text-xs text-muted-foreground">{g.intro}</p>
          <div className="grid gap-0.5 pb-1 pl-4">{g.subs.map(s => <Button variant="ghost" key={s.name} onClick={s.act} className="rounded-lg px-3 py-1.5 text-left text-sm text-muted-foreground hover:bg-muted hover:text-foreground">{s.name}</Button>)}</div>
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
            <p className="flex-wordmark mb-3 text-2xl sm:text-3xl">AI FLEX <span className="text-crimson">Connect</span></p>
            <p className="mb-5 text-sm font-semibold tracking-[0.2em] text-muted-foreground">AI WORK <span className="text-crimson">|</span> AI LEARNING <span className="text-crimson">|</span> AI PLATFORMS</p>
            <h1 className="display-heading text-[30px] leading-[1.15] sm:text-[40px]">
              <span className="text-foreground">Find Your Place in the </span>
              <span className="relative whitespace-nowrap text-crimson">AI Work<span className="absolute inset-x-0 bottom-1 -z-10 h-2.5 rounded bg-primary/50" /></span>
              <span className="text-foreground"> Economy</span>
            </h1>
            <p className="mt-5 max-w-lg font-medium leading-relaxed text-crimson">Connecting human potential with the possibilities of AI.</p>
            <p className="mt-3 max-w-lg leading-relaxed text-muted-foreground">AI FLEX Connect helps you discover AI work, understand AI training opportunities, learn useful skills and find legitimate platforms — all in one clear, trustworthy place.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="flex-pill h-12 px-8" onClick={() => go('find')}>AI Jobs | Placements <ArrowRight /></Button>
              <Button size="lg" variant="outline" className="h-12 rounded-full border-ink bg-card px-8" onClick={() => go('learning')}><BookOpen /> AI Educate | Learn</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Find AI Work */}
      <section id="find" className="scroll-mt-20 relative z-10 -mt-6">
        <div className="section-shell border-b border-border bg-background py-10">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div><h2 className="display-heading text-2xl sm:text-3xl">Find AI Work</h2><p className="mt-1 text-muted-foreground">Search roles by skill, title, category or platform.</p></div>
            <span className="text-sm text-muted-foreground"><strong className="text-foreground">{filtered.length}</strong> matching opportunities</span>
          </div>
          <div className="grid gap-3 md:grid-cols-[1fr_200px_180px_auto]">
            <label className="flex h-14 items-center gap-3 rounded-full border border-input bg-background px-4 focus-within:border-primary"><Search className="h-5 w-5 text-muted-foreground" /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="e.g. writing, Python, evaluation" aria-label="Search AI work" className="w-full bg-transparent outline-none placeholder:text-muted-foreground" /></label>
            <select value={category} onChange={e => setCategory(e.target.value)} aria-label="Category" className="h-14 rounded-full border border-input bg-background px-4">{['All', ...categories].map(c => <option key={c} value={c}>{c === 'All' ? 'All categories' : c}</option>)}</select>
            <select value={location} onChange={e => setLocation(e.target.value)} aria-label="Location" className="h-14 rounded-full border border-input bg-background px-4">{locations.map(l => <option key={l}>{l}</option>)}</select>
            <Button className="h-14 rounded-full px-7" onClick={() => go('featured')}>Search</Button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">{categories.map(t => <Button variant="outline" key={t} onClick={() => { setQuery(''); setLocation('All locations'); pickCategory(t); }} className="rounded-full border border-border px-3 py-1.5 text-muted-foreground hover:border-primary hover:text-foreground">{t}</Button>)}</div>
        </div>
      </section>

      {/* Featured */}
      <section id="featured" className="section-space scroll-mt-20 bg-muted">
        <div className="section-shell">
          <Heading label="Opportunities" title="Featured Opportunities" text={`${filtered.length} role${filtered.length === 1 ? '' : 's'} match your search.`} action={(category !== 'All' || query || location !== 'All locations') ? <Button variant="outline" className="rounded-full" onClick={() => { setQuery(''); setCategory('All'); setLocation('All locations'); }}>Clear filters</Button> : undefined} />
          {filtered.length === 0 ? <p className="rounded-2xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">No roles match — try another word or clear the filters.</p> :
          <Carousel>
            {filtered.map(o => <article key={o.id} className="circle-tile lift border-0 tile-coral">
              <span className="text-xs font-semibold text-coral">{o.featured ? 'Featured · ' : ''}{o.category}</span>
              <h3 className="font-display font-bold leading-snug">{o.title}</h3>
              <p className="font-medium text-muted-foreground">{o.company}</p>
              <span className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" />{o.location}</span>
              <span className="font-display font-bold">{o.rate}<span className="text-xs font-normal text-muted-foreground"> /hr</span></span>
              <Button variant="ghost" onClick={() => openDetail(o)} className="h-7 rounded-full text-xs font-semibold">Learn more <ArrowRight /></Button>
            </article>)}
          </Carousel>}
        </div>
      </section>

      {/* Learning */}
      <section id="learning" className="section-space scroll-mt-20 band-stone">
        <div className="section-shell">
          <div className="mb-8 max-w-xl">
            <p className="section-label mb-2 flex items-center gap-2 text-muted-foreground"><span className="h-px w-6 bg-coral" />AI Learning</p>
            <h2 className="display-heading text-xl text-foreground sm:text-2xl">AI Education, Tips & Research</h2>
            <p className="mt-2 text-sm text-muted-foreground">Free guides to read now. Tap a circle to open the full guide.</p>
          </div>
          <div className="learning-row">
            {lessons.slice(0, 3).map((l, i) => <Button variant="outline" key={l.title} onClick={() => setModal({ title: l.title, text: l.text, detail: <><InformationSections sections={lessonSections[i] ?? []} /><Button className="flex-pill" onClick={() => { setModal(null); setJoinOpen(true); }}>Join for more expert tips <ArrowRight /></Button></> })} className="circle-tile lift tile-blend">
              <span className="font-display text-2xl font-extrabold text-coral">0{i + 1}</span>
              <span className="hide-sm text-xs font-semibold text-coral">{['Education', 'Tips', 'Research'][i]}</span><h3 className="font-display font-bold">{l.title}</h3>
              <span className="text-xs font-semibold underline">Read guide</span>
            </Button>)}
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {lessons.slice(0, 3).map((l, i) => <article key={l.title} className="rounded-2xl border border-border bg-card p-5">
              <p className="text-xs font-semibold text-coral">0{i + 1} · {['Education', 'Tips', 'Research'][i]}</p>
              <h3 className="mt-1 font-display font-bold">{l.title}</h3>
              <div className="mt-3 space-y-3">{(lessonSections[i] ?? []).map(s => <div key={s.heading}><p className="text-sm font-semibold">{s.heading}</p><p className="text-sm leading-relaxed text-muted-foreground">{s.text}</p></div>)}</div>
            </article>)}
          </div>
          <div className="mt-10 rounded-3xl bg-ink p-8 text-center text-on-dark">
            <p className="section-label text-primary">Members get more</p>
            <h3 className="mt-2 font-display text-xl font-bold sm:text-2xl">Want deeper AI knowledge, tips and education?</h3>
            <p className="mx-auto mt-2 max-w-xl text-sm text-on-dark-muted">Join the community for expert advice, step-by-step masterclasses, new research breakdowns and AI work tips sent to members.</p>
            <Button size="lg" className="mt-6 h-auto whitespace-normal rounded-full px-8 py-4 text-base glow-gold" onClick={() => setJoinOpen(true)}>Join.. Get more AI tips and advice from experts <ArrowRight /></Button>
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section id="platforms" className="section-space scroll-mt-20 bg-muted">
        <div className="section-shell">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Heading label="Where the work is" title="AI Featured Platforms" text="5 trending platforms for AI training work." />
            <Link to="/platforms" className="mb-8 inline-flex items-center gap-1 text-sm font-semibold text-coral underline underline-offset-4">see full list here <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
          <Carousel>
            {platforms.slice(0, 5).map(p => <Button variant="outline" key={p.name} className="circle-tile lift tile-sand" onClick={() => setModal({ title: p.name, text: p.text, detail: <InformationSections sections={[{ heading: 'Platform focus', text: p.tags }, { heading: 'Typical contributor journey', text: 'Review official role requirements, complete any required assessment and confirm available projects. Acceptance and project availability depend on platform needs and contributor eligibility.' }, { heading: 'Before applying', text: 'Verify supported countries, contractor terms, payment schedules and data privacy requirements through the official company website. This profile is illustrative, not a live offer or endorsement.' }]} /> })}>
              <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-primary bg-card font-display font-bold shadow-sm">{p.mark}</span>
              <h3 className="font-display font-bold">{p.name}</h3><p className="text-xs text-coral">{p.subtitle}</p>
              <p className="text-sm text-muted-foreground">{p.text}</p>
              <span className="flex items-center gap-1 text-xs font-semibold">Explore <ArrowUpRight /></span>
            </Button>)}
          </Carousel>
        </div>
      </section>

      {/* Updates */}
      <section id="updates" className="section-space scroll-mt-20">
        <div className="section-shell">
          <Heading label="Stay informed" title="AI Updates" />
          <LeadInsights />
          <LiveNews />
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
              <Button size="lg" className="h-12 rounded-full glow-gold" onClick={() => showInformation('Join AI FLEX Connect')}>Join AI FLEX Connect <ArrowUpRight /></Button>
              <Button variant="ghost" onClick={() => showInformation('Register')} className="text-sm font-semibold text-on-dark-muted transition-colors hover:text-on-dark">Ready to get started? <span className="text-primary">Register →</span></Button>
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
              { h: 'Discover', items: [{ t: 'AI Work', id: 'find' }, { t: 'AI Platforms', id: 'platforms' }, { t: 'AI Work Categories', id: 'categories' }] },
              { h: 'Grow', items: [{ t: 'Learning', id: 'learning' }, { t: 'AI Work Updates', id: 'updates' }, { t: 'Join the community', id: 'join' }] },
              { h: 'AI FLEX Connect', items: [{ t: 'About us', id: 'about' }, { t: 'Register', id: 'join' }] },
            ].map(col => (
              <div key={col.h}>
                <p className="section-label mb-4 text-on-dark-muted">{col.h}</p>
                <ul className="space-y-2.5 text-sm">
                  {col.items.map(i => <li key={i.t}><Button variant="ghost" onClick={() => i.id === 'about' ? showInformation('About us') : i.t === 'Register' || i.t === 'Join the community' ? showInformation(i.t === 'Register' ? 'Register' : 'Join AI FLEX Connect') : go(i.id)} className="h-auto justify-start p-0 text-on-dark-muted transition-colors hover:bg-transparent hover:text-primary">{i.t}</Button></li>)}
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
      <DialogContent className="max-h-[85dvh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader><DialogTitle className="font-display text-xl">{modal?.title}</DialogTitle><DialogDescription className="leading-relaxed">{modal?.text}</DialogDescription></DialogHeader>
        {modal?.detail}
      </DialogContent>
    </Dialog>
    <DirectoryDialog tab={dirTab} onTab={setDirTab} onClose={() => setDirTab(null)} />
    <JoinDialog open={joinOpen} onOpenChange={setJoinOpen} />
  </div>;
}

function Carousel({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (d: number) => ref.current?.scrollBy({ left: d * 500, behavior: 'smooth' });
  return <div className="relative">
    <div ref={ref} className="circle-carousel">{children}</div>
    <div className="mt-2 flex justify-center gap-3">
      <Button variant="outline" size="icon" aria-label="Scroll left" className="rounded-full" onClick={() => scroll(-1)}><ChevronLeft /></Button>
      <Button variant="outline" size="icon" aria-label="Scroll right" className="rounded-full" onClick={() => scroll(1)}><ChevronRight /></Button>
    </div>
  </div>;
}

function JoinDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const join = useServerFn(joinCommunity);
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const [error, setError] = useState('');
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setError(''); setStatus('sending');
    try { await join({ data: new FormData(e.currentTarget) }); setStatus('done'); }
    catch (err) { setStatus('idle'); const m = err instanceof Error ? err.message : ''; setError(m.startsWith('[') ? 'Please check your name and email.' : m || 'Something went wrong.'); }
  }
  return <Dialog open={open} onOpenChange={o => { onOpenChange(o); if (!o) { setStatus('idle'); setError(''); } }}>
    <DialogContent className="sm:max-w-md">
      <DialogHeader><DialogTitle className="font-display text-xl">Join the AI FLEX Connect community</DialogTitle><DialogDescription>Get curated AI education, expert tips and research briefings.</DialogDescription></DialogHeader>
      {status === 'done' ? <p className="rounded-xl bg-gold-soft p-4 text-sm">Thank you — your details have been received. We'll be in touch with your member learning access.</p> :
      <form onSubmit={submit} className="grid gap-4">
        <label className="grid gap-1 text-sm font-medium">Full name<input name="fullName" required maxLength={100} className="h-10 rounded-md border border-input bg-background px-3" /></label>
        <label className="grid gap-1 text-sm font-medium">Email<input name="email" type="email" required maxLength={255} className="h-10 rounded-md border border-input bg-background px-3" /></label>
        <label className="grid gap-1 text-sm font-medium">Résumé <span className="text-xs font-normal text-muted-foreground">(optional · PDF or Word, max 5MB)</span><input name="resume" type="file" accept=".pdf,.doc,.docx" className="text-sm" /></label>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" className="flex-pill" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Join now'}</Button>
      </form>}
    </DialogContent>
  </Dialog>;
}
