import { useState } from 'react';
import { Brand } from '../atoms/Brand';
import { ActionLink } from '../atoms/ActionLink';
import { Navigation } from '../molecules/Navigation';
import type { Page } from '../../content';

export function Header({ page }: { page: Page }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="announcement">
        <span>MUAY THAI · KICKBOXING · GRAPPLING</span>
        <span>BRICK, NEW JERSEY</span>
      </div>
      <header
        className={`site-header ${open ? 'menu-open' : ''}`}
        onKeyDown={(e) => {
          if (e.key === 'Escape') setOpen(false);
        }}
      >
        <div className="header-inner">
          <Brand />
          <Navigation page={page} id="main-navigation" />
          <ActionLink href="./location.html" className="header-action">
            Get in touch
          </ActionLink>
          <button
            className="menu-button"
            type="button"
            aria-expanded={open}
            aria-controls="main-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? 'Close −' : 'Menu +'}
          </button>
        </div>
      </header>
    </>
  );
}
