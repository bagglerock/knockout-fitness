import { coaches } from '../../content';
export function CoachCard({ coach }: { coach: (typeof coaches)[number] }) {
  return (
    <article className="coach-card">
      <div className="coach-image">
        <img src={`./media/images/${coach.image}`} alt={coach.name} loading="lazy" />
      </div>
      <div className="coach-body">
        <p className="small-label">{coach.role}</p>
        <h2>{coach.name}</h2>
        <p>{coach.text}</p>
        <a className="text-link" href={`tel:+1${coach.phone.replaceAll('-', '')}`}>
          Call {coach.name.split(' ')[0]} · {coach.phone} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}
