import React from 'react';
import { renderToString } from 'react-dom/server';
import { writeFile, mkdir, cp } from 'node:fs/promises';
import { App } from '../src/App';
import { pages, type Page } from '../src/content';

function pageHtml(page: Page) {
  const meta = pages[page];
  return `<!doctype html>
<html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="theme-color" content="#f5e60b" /><title>${meta.title} | Knockout Fitness</title>
<meta name="description" content="${meta.description}" />
<link rel="stylesheet" href="/src/style.css" />
<link rel="icon" href="./media/images/9596014.png" type="image/png" />
<noscript><style>.menu-button{display:none!important}.site-header nav{display:flex!important;position:static!important;flex-wrap:wrap}.header-inner{flex-wrap:wrap}</style></noscript>
</head><body><div id="root">${renderToString(<App page={page} />)}</div><script type="module" src="/src/main.tsx"></script></body></html>\n`;
}
await mkdir('public/media', { recursive: true });
for (const directory of ['images', 'class-photos']) {
  await cp(`assets/${directory}`, `public/media/${directory}`, {
    recursive: true,
    filter: (path) => !path.endsWith('.htaccess'),
  });
}
for (const page of Object.keys(pages) as Page[]) await writeFile(`${page}.html`, pageHtml(page));
console.log('Prerendered five pages with original gym assets.');
