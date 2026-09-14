import { programs } from '../../content';
import { SectionHeading } from '../molecules/SectionHeading';
import { ProgramCard } from '../molecules/ProgramCard';
export function Programs() {
  return (
    <section className="section wrap" id="programs">
      <div className="heading-row">
        <SectionHeading eyebrow="FIND YOUR DISCIPLINE" title="YOUR TRAINING. YOUR PATH." />
        <p>
          From your first session to your next challenge.
          <br />
          Training for adults and children.
        </p>
      </div>
      <div className="program-grid">
        {programs.map((program, index) => (
          <ProgramCard key={program.id} program={program} index={index} />
        ))}
      </div>
    </section>
  );
}
