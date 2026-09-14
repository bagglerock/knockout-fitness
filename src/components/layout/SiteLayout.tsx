import type { ReactNode } from 'react';
import type { Page } from '../../content';
import { Header } from '../organisms/Header';
import { Footer } from '../organisms/Footer';
export function SiteLayout({ page, children }: { page: Page; children: ReactNode }) {
  return (
    <>
      <Header page={page} />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  );
}
