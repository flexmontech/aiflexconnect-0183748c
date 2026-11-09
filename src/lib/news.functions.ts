import { createServerFn } from '@tanstack/react-start';

export type NewsItem = { title: string; link: string; source: string; date: string; summary: string };

const FEEDS = [
  { source: 'Interconnects', url: 'https://www.interconnects.ai/feed' },
  { source: 'Ahead of AI', url: 'https://magazine.sebastianraschka.com/feed' },
  { source: 'The Batch', url: 'batch' },
  { source: 'TLDR AI', url: 'https://tldr.tech/api/rss/ai' },
];
const PER_SOURCE = 2;
const TTL = 24 * 60 * 60 * 1000; // refresh once daily

let cache: { at: number; items: NewsItem[] } | null = null;
const UA = { 'User-Agent': 'Mozilla/5.0 AIFlexConnect/1.0' };

const decode = (s: string) => s
  .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
  .replace(/&#x27;|&#039;|&#8217;|&rsquo;/g, "'").replace(/&#8216;|&lsquo;/g, "'").replace(/&#8220;|&#8221;|&ldquo;|&rdquo;/g, '"')
  .replace(/&#8211;|&#8212;|&mdash;|&ndash;/g, '–').replace(/&nbsp;|&#160;/g, ' ').replace(/&#\d+;/g, '')
  .replace(/\s+/g, ' ').trim();

const tag = (block: string, name: string) => block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, 'i'))?.[1] ?? '';
const clip = (s: string) => (s.length > 220 ? s.slice(0, 217) + '…' : s);

function parse(xml: string, source: string): NewsItem[] {
  const blocks = xml.match(/<item[\s>][\s\S]*?<\/item>|<entry[\s>][\s\S]*?<\/entry>/gi) ?? [];
  return blocks.slice(0, 6).map(b => ({
    title: decode(tag(b, 'title')),
    link: decode(tag(b, 'link')) || (b.match(/<link[^>]*href="([^"]+)"/i)?.[1] ?? ''),
    source,
    date: decode(tag(b, 'pubDate') || tag(b, 'published') || tag(b, 'updated')),
    summary: clip(decode(tag(b, 'description') || tag(b, 'summary'))),
  })).filter(i => i.title && i.link.startsWith('http'));
}

// The Batch has no RSS feed: read the latest issue numbers from its index page, then each issue's page details.
async function fetchBatch(): Promise<NewsItem[]> {
  const html = await (await fetch('https://www.deeplearning.ai/the-batch/', { headers: UA, signal: AbortSignal.timeout(8000) })).text();
  const nums = [...new Set([...html.matchAll(/\/the-batch\/issue-(\d+)/g)].map(m => Number(m[1])))].sort((a, b) => b - a).slice(0, PER_SOURCE);
  const meta = (page: string, p: string) => decode(page.match(new RegExp(`<meta property="${p}" content="([^"]*)"`))?.[1] ?? '');
  return Promise.all(nums.map(async n => {
    const link = `https://www.deeplearning.ai/the-batch/issue-${n}/`;
    const page = await (await fetch(link, { headers: UA, signal: AbortSignal.timeout(8000) })).text();
    return { title: meta(page, 'og:title') || `The Batch — Issue ${n}`, link, source: 'The Batch', date: meta(page, 'article:published_time'), summary: clip(meta(page, 'og:description')) };
  }));
}

export const getLatestAINews = createServerFn({ method: 'GET' }).handler(async () => {
  const sources = FEEDS.map(f => f.source);
  if (cache && Date.now() - cache.at < TTL) return { items: cache.items, sources };
  const results = await Promise.allSettled(FEEDS.map(async f => {
    if (f.url === 'batch') return fetchBatch();
    const res = await fetch(f.url, { headers: { ...UA, Accept: 'application/rss+xml, application/xml, text/xml' }, signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`${f.source} ${res.status}`);
    return parse(await res.text(), f.source);
  }));
  results.forEach(r => { if (r.status === 'rejected') console.error('News feed failed:', r.reason); });
  const items = results.flatMap(r => r.status === 'fulfilled'
    ? [...r.value].sort((a, b) => (Date.parse(b.date) || 0) - (Date.parse(a.date) || 0)).slice(0, PER_SOURCE)
    : []);
  if (items.length) cache = { at: Date.now(), items };
  return { items: items.length ? items : cache?.items ?? [], sources };
});

// Lead insights: research outlets kept separate from the daily feeds above, so nothing repeats.
const INSIGHT_FEEDS = [
  { badge: 'Lead insight of the week', source: 'MIT Technology Review', url: 'https://www.technologyreview.com/topic/artificial-intelligence/feed' },
  { badge: 'Platform note of the week', source: 'Rest of World', url: 'https://restofworld.org/feed/latest' },
];
const INSIGHT_TTL = 48 * 60 * 60 * 1000; // refresh every 2 days
let insightCache: { at: number; items: (NewsItem & { badge: string })[] } | null = null;

export const getLeadInsights = createServerFn({ method: 'GET' }).handler(async () => {
  if (insightCache && Date.now() - insightCache.at < INSIGHT_TTL) return insightCache.items;
  const results = await Promise.allSettled(INSIGHT_FEEDS.map(async f => {
    const res = await fetch(f.url, { headers: { ...UA, Accept: 'application/rss+xml, application/xml, text/xml' }, signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`${f.source} ${res.status}`);
    let items = parse(await res.text(), f.source);
    if (f.source === 'Rest of World') items = items.filter(i => /\bAI\b|artificial|data|worker|gig|platform/i.test(i.title + i.summary)).concat(items);
    const top = items[0];
    if (!top) throw new Error(`${f.source} empty`);
    return { ...top, badge: f.badge };
  }));
  results.forEach(r => { if (r.status === 'rejected') console.error('Insight feed failed:', r.reason); });
  const items = results.flatMap(r => (r.status === 'fulfilled' ? [r.value] : []));
  if (items.length) insightCache = { at: Date.now(), items };
  return items.length ? items : insightCache?.items ?? [];
});
