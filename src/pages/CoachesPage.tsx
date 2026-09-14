import { coaches } from '../content';
import { SectionHeading } from '../components/molecules/SectionHeading';
import { CoachCard } from '../components/molecules/CoachCard';
import { ContactBanner } from '../components/organisms/ContactBanner';
export function CoachesPage() {
  return (
    <>
      <section className="page-heading wrap">
        <SectionHeading
          eyebrow="IN YOUR CORNER"
          title="MEET YOUR COACHES."
          text="Experience, dedication and a shared love of martial arts. Get to know the people behind Knockout Fitness."
          large
        />
      </section>
      <section className="coach-grid wrap" aria-label="Our coaches">
        {coaches.map((coach) => (
          <CoachCard key={coach.name} coach={coach} />
        ))}
      </section>
      <ContactBanner />
    </>
  );
}
