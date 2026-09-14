import { programs } from '../../content';
export function ProgramCard({
  program,
  index,
}: {
  program: (typeof programs)[number];
  index: number;
}) {
  return (
    <article className="program-card" id={program.id}>
      <div className="program-image">
        <img
          src={`./media/${program.image}`}
          alt={`${program.name} at Knockout Fitness`}
          loading="lazy"
        />
        <span className="program-number">0{index + 1}</span>
      </div>
      <div className="program-body">
        <p className="small-label">{program.tag}</p>
        <h3>{program.name}</h3>
        <p>{program.text}</p>
        <a className="text-link" href="./schedule.html">
          Explore classes <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}
