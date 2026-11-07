import { createServerFn } from '@tanstack/react-start';

export type NewsItem = { title: string; link: string; source: string; date: string; summary: string };

const FEEDS = [
  { source: 'TechCrunch AI', url: 'https://techcrunch.com/category/artificial-intelligence/feed/' },
  { source: 'The Verge AI', url: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml' },
  { source: 'MIT Technology Review', url: 'https://www.technologyreview.com/topic/artificial-intelligence/feed' },
  { source: 'VentureBeat AI', url: 'https://venturebeat.com/category/ai/feed/' },
  { source: 'Wired AI', url: 'https://www.wired.com/feed/tag/ai/latest/rss' },
  { source: 'AI News', url: 'https://www.artificialintelligence-news.com/feed/' },
];

let cache: { at: number; items: NewsItem[] } | null = null;
const TTL = 20 * 60 * 1000;

const decode = (s: string) => s
  .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
  .replace(/&#039;|&#8217;|&rsquo;/g, "'").replace(/&#8216;|&lsquo;/g, "'").replace(/&#8220;|&#8221;|&ldquo;|&rdquo;/g, '"')
  .replace(/&#8211;|&#8212;|&mdash;|&ndash;/g, '–').replace(/&nbsp;|&#160;/g, ' ').replace(/&#\d+;/g, '')
  .replace(/\s+/g, ' ').trim();

const tag = (block: string, name: string) => block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, 'i'))?.[1] ?? '';

function parse(xml: string, source: string): NewsItem[] {
  const blocks = xml.match(/<item[\s>][\s\S]*?<\/item>|<entry[\s>][\s\S]*?<\/entry>/gi) ?? [];
  return blocks.slice(0, 8).map(b => {
    const link = decode(tag(b, 'link')) || (b.match(/<link[^>]*href="([^"]+)"/i)?.[1] ?? '');
    const summary = decode(tag(b, 'description') || tag(b, 'summary') || tag(b, 'content'));
    return {
      title: decode(tag(b, 'title')), link, source,
      date: decode(tag(b, 'pubDate') || tag(b, 'published') || tag(b, 'updated')),
      summary: summary.length > 220 ? summary.slice(0, 217) + '…' : summary,
    };
  }).filter(i => i.title && i.link.startsWith('http'));
}

export const getLatestAINews = createServerFn({ method: 'GET' }).handler(async () => {
  if (cache && Date.now() - cache.at < TTL) return { items: cache.items, sources: FEEDS.map(f => f.source) };
  const results = await Promise.allSettled(FEEDS.map(async f => {
    const res = await fetch(f.url, { headers: { 'User-Agent': 'Mozilla/5.0 AIFlexConnect/1.0', Accept: 'application/rss+xml, application/xml, text/xml' }, signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`${f.source} ${res.status}`);
    return parse(await res.text(), f.source);
  }));
  results.forEach(r => { if (r.status === 'rejected') console.error('News feed failed:', r.reason); });
  const items = results.flatMap(r => r.status === 'fulfilled' ? r.value : [])
    .sort((a, b) => (Date.parse(b.date) || 0) - (Date.parse(a.date) || 0))
    .slice(0, 24);
  if (items.length) cache = { at: Date.now(), items };
  return { items: items.length ? items : cache?.items ?? [], sources: FEEDS.map(f => f.source) };
});
