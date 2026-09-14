import { pages, type Page } from '../../content';
export function Navigation({ page, id }: { page: Page; id: string }) {
  return (
    <nav id={id} aria-label="Main navigation">
      {Object.entries(pages).map(([key, value]) => (
        <a key={key} href={`./${key}.html`} aria-current={page === key ? 'page' : undefined}>
          {value.label}
        </a>
      ))}
    </nav>
  );
}
