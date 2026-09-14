import { SectionHeading } from '../components/molecules/SectionHeading';
import { ClassSchedule } from '../components/organisms/ClassSchedule';
import { ContactBanner } from '../components/organisms/ContactBanner';
export function SchedulePage() {
  return (
    <>
      <section className="page-heading wrap">
        <SectionHeading
          eyebrow="MAKE TIME FOR YOURSELF"
          title="SHOW UP. GET TO WORK."
          text="Muay Thai, kickboxing, grappling and more. Find a session and take your next step."
          large
        />
      </section>
      <section className="wrap schedule-section" aria-label="Class schedule">
        <ClassSchedule />
      </section>
      <ContactBanner />
    </>
  );
}
