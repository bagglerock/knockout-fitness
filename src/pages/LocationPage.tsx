import { SectionHeading } from '../components/molecules/SectionHeading';
import { ContactDetails } from '../components/organisms/ContactDetails';
export function LocationPage() {
  return (
    <>
      <section className="page-heading wrap">
        <SectionHeading
          eyebrow="COME SAY HELLO"
          title="IT STARTS WITH A CONVERSATION."
          text="New to martial arts? Ready to return to training? Get in touch and tell us what you’re looking for."
          large
        />
      </section>
      <ContactDetails />
    </>
  );
}
