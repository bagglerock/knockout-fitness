import type { Page } from './content';
import { SiteLayout } from './components/layout/SiteLayout';
import { HomePage } from './pages/HomePage';
import { CoachesPage } from './pages/CoachesPage';
import { SchedulePage } from './pages/SchedulePage';
import { PhotosPage } from './pages/PhotosPage';
import { LocationPage } from './pages/LocationPage';
const routes = {
  index: HomePage,
  coaches: CoachesPage,
  schedule: SchedulePage,
  photos: PhotosPage,
  location: LocationPage,
};
export function App({ page }: { page: Page }) {
  const Content = routes[page];
  return (
    <SiteLayout page={page}>
      <Content />
    </SiteLayout>
  );
}
