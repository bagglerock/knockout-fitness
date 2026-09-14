import { Hero } from '../components/organisms/Hero';
import { Programs } from '../components/organisms/Programs';
import { Community } from '../components/organisms/Community';
import { Gallery } from '../components/organisms/Gallery';
import { ContactBanner } from '../components/organisms/ContactBanner';
export function HomePage() {
  return (
    <>
      <Hero />
      <div className="discipline-strip" aria-label="Training disciplines">
        <span>MUAY THAI</span>
        <b aria-hidden="true">✳</b>
        <span>KICKBOXING</span>
        <b aria-hidden="true">✳</b>
        <span>GRAPPLING</span>
        <b aria-hidden="true">✳</b>
        <span>PERSONAL TRAINING</span>
      </div>
      <Programs />
      <Community />
      <Gallery />
      <ContactBanner />
    </>
  );
}
