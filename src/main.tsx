import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { App } from './App';
import { pages, type Page } from './content';

const name = location.pathname.split('/').pop()?.replace('.html', '') || 'index';
const page: Page = name in pages ? (name as Page) : 'index';
hydrateRoot(
  document.getElementById('root')!,
  <React.StrictMode>
    <App page={page} />
  </React.StrictMode>,
);
