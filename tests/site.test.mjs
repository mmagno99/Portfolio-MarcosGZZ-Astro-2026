import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, access } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve('.vercel/output/static');
const catalogs = await Promise.all(
  [
    ['personal-projects', 'src/data/projects.ts'],
    ['projects-bbx', 'src/data/work.js'],
    ['projects-tdi', 'src/data/tdi.ts'],
  ].map(async ([category, file]) => ({
    category,
    ids: [...(await readFile(file, 'utf8')).matchAll(/\bid:\s*'([^']+)'/g)].map(
      (match) => match[1],
    ),
  })),
);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((e) =>
        e.isDirectory() ? walk(path.join(dir, e.name)) : path.join(dir, e.name),
      ),
    )
  ).flat();
}
const files = (await walk(root)).filter((f) => f.endsWith('.html'));
const pages = await Promise.all(
  files.map(async (file) => ({ file, html: await readFile(file, 'utf8') })),
);
const blogSources = await Promise.all(
  (await walk(path.resolve('src/content/blog')))
    .filter((file) => file.endsWith('.mdx'))
    .map(async (file) => {
      const source = await readFile(file, 'utf8');
      return {
        lang: source.match(/^lang:\s*['"]?(\w+)/m)[1],
        slug: source.match(/^slug:\s*['"]?([^'"\r\n]+)/m)[1],
      };
    }),
);
const articlePages = pages.filter(({ html }) =>
  html.includes('"@type":"BlogPosting"'),
);

test('all original content and localized portfolio routes are generated', async () => {
  assert.ok(
    files.length >=
      34 +
        blogSources.length +
        catalogs.reduce((total, catalog) => total + catalog.ids.length * 3, 0),
    'the build must retain all existing pages while allowing new sections',
  );
  for (const prefix of ['', 'en/', 'pt/']) {
    for (const route of [
      '',
      prefix ? 'projects/' : 'proyectos/',
      prefix ? 'about/' : 'acerca-de/',
      'blog/',
      'personal-projects/',
      'projects-bbx/',
      'projects-tdi/',
      'cotizacion/',
      ...catalogs.flatMap(({ category, ids }) =>
        ids.map((id) => `${category}/${id}/`),
      ),
    ]) {
      await access(path.join(root, prefix, route, 'index.html'));
    }
  }
  for (const { slug, lang } of blogSources) {
    const prefix = lang === 'es' ? '' : lang;
    await access(path.join(root, prefix, 'blog', slug, 'index.html'));
  }
});
test('every page has static content, one main heading and canonical metadata', () => {
  for (const { file, html } of pages) {
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, file);
    assert.match(html, /<main[^>]*id="main"/);
    assert.match(html, /<link rel="canonical" href="https:\/\/marcosgzz.tech/);
    assert.match(html, /<meta name="description" content="[^"]+"/);
    assert.doesNotMatch(
      html,
      /__NEXT_DATA__|href="(?:undefined|javascript:|function)/,
    );
  }
});
test('all internal navigation and stylesheet targets exist', async () => {
  for (const { file, html } of pages) {
    for (const match of html.matchAll(/(?:href|src)="(\/[^"#?]*)[^\"]*"/g)) {
      const target = decodeURIComponent(match[1]);
      const full = path.join(root, target);
      const candidates = [full, path.join(full, 'index.html')];
      let found = false;
      for (const candidate of candidates) {
        try {
          await access(candidate);
          found = true;
          break;
        } catch {}
      }
      assert.ok(found, `${file}: missing ${target}`);
    }
  }
});
test('language switching preserves project details and translations are present', () => {
  for (const { file, html } of pages) {
    const rel = path.relative(root, file).replaceAll('\\', '/');
    const lang = rel.startsWith('en/')
      ? 'en'
      : rel.startsWith('pt/')
        ? 'pt'
        : 'es';
    assert.match(html, new RegExp(`<html lang="${lang}">`));
    assert.doesNotMatch(
      html,
      />\s*(?:navbar\.nav\d|home\.\w+|projects\.\w+)\s*</,
    );
    if (rel.includes('projects-bbx/' + catalogs[1].ids[0] + '/'))
      for (const prefix of ['', '/en', '/pt'])
        assert.ok(
          html.includes(`href="${prefix}/projects-bbx/${catalogs[1].ids[0]}"`),
        );
  }
});
test('blog is pre-rendered with syntax highlighting and correct language', () => {
  const article = pages.find(
    (p) =>
      p.file ===
      path.join(root, 'blog', 'que-hace-un-front-end-developer', 'index.html'),
  );
  assert.match(article.html, /<html lang="es">/);
  assert.match(article.html, /astro-code/);
  assert.match(article.html, /Un <strong>Front-end Developer<\/strong>/);
});

test('articles retain their translated language and language switch points to the same article', () => {
  for (const lang of ['en', 'pt']) {
    const article = pages.find(
      (p) =>
        p.file ===
        path.join(
          root,
          lang,
          'blog',
          'que-hace-un-front-end-developer',
          'index.html',
        ),
    );
    assert.match(article.html, new RegExp(`<html lang="${lang}">`));
    assert.ok(
      article.html.includes(
        lang === 'en'
          ? 'What does a front-end developer do?'
          : 'O que faz um desenvolvedor front-end?',
      ),
    );
    assert.ok(
      article.html.includes('href="/en/blog/que-hace-un-front-end-developer"'),
    );
    assert.ok(
      article.html.includes(
        'hreflang="pt" href="https://marcosgzz.tech/pt/blog/que-hace-un-front-end-developer"',
      ),
    );
  }
});
test('React is isolated to the quote pages and TDI placeholders are disclosed', () => {
  for (const { file, html } of pages) {
    if (file.includes(`${path.sep}cotizacion${path.sep}`))
      assert.match(html, /<astro-island/);
    else assert.doesNotMatch(html, /<astro-island/);
    if (file.includes('sitio-corporativo'))
      assert.match(html, /demostración|Demonstration|demonstração/);
  }
});

test('Spanish navigation, metadata and permanent redirects use the new routes', async () => {
  for (const [oldRoute, newRoute] of [
    ['projects', 'proyectos'],
    ['about', 'acerca-de'],
  ]) {
    const page = pages.find(
      (p) => p.file === path.join(root, newRoute, 'index.html'),
    );
    assert.ok(page);
    assert.ok(
      page.html.includes(
        `rel="canonical" href="https://marcosgzz.tech/${newRoute}"`,
      ),
    );
    assert.ok(
      page.html.includes(
        `hreflang="x-default" href="https://marcosgzz.tech/${newRoute}"`,
      ),
    );
    assert.ok(page.html.includes(`href="/en/${oldRoute}"`));
    for (const { html } of pages)
      assert.ok(!html.includes(`href="/${oldRoute}"`));
  }
  const config = JSON.parse(
    await readFile('.vercel/output/config.json', 'utf8'),
  );
  for (const target of ['/proyectos', '/acerca-de'])
    assert.ok(
      config.routes.some(
        (route) =>
          route.status === 301 &&
          Object.values(route.headers ?? {}).includes(target),
      ),
      target,
    );
});

test('every source article has localized SEO and valid structured data', () => {
  const articles = articlePages;
  assert.equal(articles.length, blogSources.length);
  const descriptions = new Set();
  for (const { file, html } of articles) {
    const json = html.match(
      /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/,
    );
    assert.ok(json, file);
    const data = JSON.parse(json[1]);
    assert.equal(data['@type'], 'BlogPosting');
    assert.ok(data.description.length > 70);
    assert.ok(data.keywords.length > 5);
    assert.ok(data.url.startsWith('https://marcosgzz.tech/'));
    assert.match(html, /name="twitter:description"/);
    assert.match(html, /property="article:published_time"/);
    assert.ok(data.image[0].startsWith('https://'));
    descriptions.add(data.description);
    if (file.includes('rendimiento-sitio-web')) {
      assert.match(html, /LCP/);
      assert.match(html, /INP/);
      assert.match(html, /CLS/);
      assert.ok(html.includes(`href="/en/blog/rendimiento-sitio-web"`));
      assert.ok(html.includes(`href="/pt/blog/rendimiento-sitio-web"`));
    }
  }
  assert.equal(descriptions.size, blogSources.length);
});

test('social icons and back-to-top are global; WhatsApp is limited to quote routes', () => {
  const quotePages = [];
  for (const { file, html } of pages.filter(({ html }) =>
    html.includes('<main'),
  )) {
    assert.match(html, /data-back-to-top/);
    assert.match(html, /class="social-links/);
    assert.doesNotMatch(html, /iconify-icon|GitHub ↗|LinkedIn ↗|Instagram ↗/);
    const isQuote = path
      .relative(root, file)
      .split(path.sep)
      .includes('cotizacion');
    assert.equal(html.includes('data-whatsapp'), isQuote, file);
    if (isQuote) {
      quotePages.push(file);
      assert.match(html, /phone=527776308952/);
    }
  }
  assert.equal(quotePages.length, 3);
  const spanishQuote = pages.find(
    ({ file }) => file === path.join(root, 'cotizacion', 'index.html'),
  );
  assert.match(spanishQuote.html, /Cotización personalizada/);
  assert.doesNotMatch(spanishQuote.html, /Proyecto a medida/);
});

test('home header starts transparent and inner pages use a stable white header', () => {
  for (const { file, html } of pages) {
    const route = path.relative(root, file).replaceAll('\\', '/');
    const home = ['index.html', 'en/index.html', 'pt/index.html'].includes(
      route,
    );
    assert.match(html, new RegExp(`data-always-white="${!home}"`), file);
    assert.match(html, /<dialog[^>]*id="mobile-menu"/);
    assert.match(html, /aria-controls="mobile-menu"/);
    const quote = route.includes('cotizacion/');
    assert.match(
      html,
      new RegExp(`data-side="${quote ? 'left' : 'right'}"`),
      file,
    );
  }
});

test('localized policy pages link to each other and are included in the sitemap', async () => {
  const groups = [
    [
      'politica-de-privacidad',
      'en/privacy-policy',
      'pt/politica-de-privacidade',
    ],
    ['politica-de-cookies', 'en/cookie-policy', 'pt/politica-de-cookies'],
    ['terminos-y-condiciones', 'en/terms', 'pt/termos-e-condicoes'],
  ];
  const sitemap = await readFile(path.join(root, 'sitemap-0.xml'), 'utf8');
  for (const group of groups)
    for (const route of group) {
      const page = pages.find(
        ({ file }) => file === path.join(root, route, 'index.html'),
      );
      assert.ok(page, route);
      assert.match(page.html, /contacto@marcosgzz.tech/);
      assert.ok(sitemap.includes(`https://marcosgzz.tech/${route}`), route);
      for (const other of group)
        assert.ok(page.html.includes(`href="/${other}"`), `${route}: ${other}`);
    }
});

test('sitemap covers every indexable page and every article on the production domain', async () => {
  const index = await readFile(path.join(root, 'sitemap-index.xml'), 'utf8');
  const sitemap = await readFile(path.join(root, 'sitemap-0.xml'), 'utf8');
  assert.ok(index.includes('<loc>https://marcosgzz.tech/sitemap-0.xml</loc>'));
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (match) => match[1],
  );
  const expected = pages
    .filter(({ html }) => !html.includes('name="robots" content="noindex"'))
    .map(({ html }) => html.match(/rel="canonical" href="([^"]+)"/)[1]);
  assert.deepEqual(new Set(urls), new Set(expected));
  assert.equal(urls.length, new Set(urls).size);
  assert.equal(
    urls.filter((url) =>
      /\/(?:en\/|pt\/)?blog\/[^/]+$/.test(new URL(url).pathname),
    ).length,
    blogSources.length,
  );
  for (const url of urls) {
    assert.equal(new URL(url).origin, 'https://marcosgzz.tech');
    assert.doesNotMatch(
      new URL(url).pathname,
      /^\/(?:404|500|api|about|projects)(?:\/|$)/,
    );
  }
  const robots = await readFile(path.join(root, 'robots.txt'), 'utf8');
  assert.match(
    robots,
    /Sitemap: https:\/\/marcosgzz\.tech\/sitemap-index\.xml/,
  );
});

test('each blog share button uses that article canonical URL and translated title', () => {
  const articles = pages.filter(({ html }) =>
    html.includes('"@type":"BlogPosting"'),
  );
  for (const { html, file } of articles) {
    const data = JSON.parse(
      html.match(
        /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/,
      )[1],
    );
    const share = html.match(/<nav[^>]*data-article-share[\s\S]*?<\/nav>/)[0];
    const links = [...share.matchAll(/<a\s([^>]+)>/g)];
    assert.equal(links.length, 3, file);
    assert.deepEqual(
      links.map(([_, attributes]) => {
        assert.match(attributes, /target="_blank"/);
        assert.match(attributes, /rel="noopener noreferrer"/);
        const href = new URL(
          attributes.match(/href="([^"]+)"/)[1].replaceAll('&amp;', '&'),
        );
        assert.equal(
          href.searchParams.get('url') ?? href.searchParams.get('u'),
          data.url,
          file,
        );
        if (href.hostname === 'x.com') {
          assert.equal(href.searchParams.get('text'), data.headline);
          assert.equal(href.searchParams.get('lang'), data.inLanguage);
        }
        return href.hostname;
      }),
      ['www.linkedin.com', 'www.facebook.com', 'x.com'],
    );
    assert.doesNotMatch(
      html,
      /platform\.(?:linkedin|x|twitter)\.com|connect\.facebook\.net/,
    );
  }
});

test('quote FAQ and footer content are localized and available as static HTML', () => {
  for (const [prefix, title, footerTitle, terms] of [
    ['', 'Preguntas frecuentes', 'Mapa de sitio', '/terminos-y-condiciones'],
    ['en', 'Frequently asked questions', 'Site map', '/en/terms'],
    ['pt', 'Perguntas frequentes', 'Mapa do site', '/pt/termos-e-condicoes'],
  ]) {
    const quote = pages.find(
      ({ file }) =>
        file === path.join(root, prefix, 'cotizacion', 'index.html'),
    );
    const faq = quote.html.match(
      /<section[^>]*data-quote-faq[\s\S]*?<\/section>/,
    )[0];
    assert.ok(faq.includes(title));
    assert.equal((faq.match(/<details\b/g) ?? []).length, 3);
    assert.ok(
      faq.includes('$200') && faq.includes('$700') && faq.includes('50%'),
    );
    assert.ok(
      quote.html.indexOf('data-quote-faq') >
        quote.html.indexOf('</astro-island>'),
    );
    const footer = quote.html.match(/<footer[\s\S]*?<\/footer>/)[0];
    assert.ok(footer.includes(footerTitle));
    assert.ok(footer.includes(`href="${terms}"`));
    assert.ok(footer.includes('Cuernavaca'));
    assert.ok(footer.includes('mailto:contacto@marcosgzz.tech'));
    assert.ok(footer.includes('&lt;24h'));
    assert.ok(footer.indexOf('class="social-links') < footer.indexOf('©'));
  }
});

test('both quote cards are present before hydration in every language', () => {
  for (const { file, html } of pages.filter(({ file }) =>
    file.includes(`${path.sep}cotizacion${path.sep}`),
  )) {
    const island = html.match(/<astro-island\b[\s\S]*?<\/astro-island>/)[0];
    assert.equal((island.match(/<button\b/g) ?? []).length, 2, file);
    assert.equal((island.match(/<h3\b/g) ?? []).length, 2, file);
    assert.doesNotMatch(
      island,
      /class="[^"]*\b(?:hidden|opacity-0)\b|data-reveal/,
      file,
    );
    assert.match(island, /client="load"/, file);
  }
});

test('footer site map contains only the five main sections', () => {
  for (const { file, html } of pages) {
    const nav = html.match(
      /<nav[^>]*aria-labelledby="footer-sitemap"[\s\S]*?<\/nav>/,
    )[0];
    assert.equal((nav.match(/<a\b/g) ?? []).length, 5, file);
    assert.doesNotMatch(
      nav,
      /projects-tdi|projects-bbx|personal-projects/,
      file,
    );
    assert.match(nav, /\/blog/);
    assert.match(nav, /\/cotizacion/);
  }
});

test('AI article has complete translations, the supplied image and linked research', () => {
  const slug = 'inteligencia-artificial-desarrolladores-web';
  for (const prefix of ['', 'en', 'pt']) {
    const article = pages.find(
      ({ file }) =>
        file === path.join(root, prefix, 'blog', slug, 'index.html'),
    );
    assert.ok(article, prefix);
    assert.match(
      article.html,
      /https:\/\/ik.imagekit.io\/mmagnodev\/ia-reemplazo-desarrollo-web.webp/,
    );
    assert.match(article.html, /survey.stackoverflow.co\/2025\/ai/);
    assert.match(
      article.html,
      /metr.org\/blog\/2025-07-10-early-2025-ai-experienced-os-dev-study/,
    );
    assert.match(article.html, /dora.dev\/research\/2025\/dora-report/);
    assert.match(article.html, /astro-code/);
    assert.ok((article.html.match(/<h2\b/g) ?? []).length >= 11);
    for (const other of ['', '/en', '/pt'])
      assert.ok(article.html.includes(`href="${other}/blog/${slug}"`));
  }
});
