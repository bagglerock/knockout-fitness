import { SectionHeading } from '../molecules/SectionHeading';
import { ActionLink } from '../atoms/ActionLink';
export function Community() {
  return (
    <section className="community" id="welcome">
      <div className="community-photo">
        <img
          src="./media/images/group-2.jpg"
          alt="Knockout Fitness students and coaches together at the gym"
          loading="lazy"
        />
      </div>
      <div className="community-copy">
        <SectionHeading eyebrow="MORE THAN A WORKOUT" title="PUT IN THE WORK. FIND YOUR PEOPLE." />
        <p>
          Welcome to Knockout Fitness. We bring adults and children together through kickboxing,
          Muay Thai, MMA and personal training in a positive environment.
        </p>
        <p>
          Learn from experienced instructors, challenge yourself and keep showing up. Your journey
          is yours. You don’t have to train alone.
        </p>
        <ActionLink href="./coaches.html">Meet your coaches</ActionLink>
      </div>
    </section>
  );
}
