import { coaches, gym } from '../../content';
import { ActionLink } from '../atoms/ActionLink';
export function ContactDetails() {
  return (
    <section className="contact-grid wrap">
      <div className="contact-info">
        <p className="small-label">TALK TO A COACH</p>
        {coaches.map((coach) => (
          <div className="contact-person" key={coach.name}>
            <h2>{coach.name}</h2>
            <a href={`tel:+1${coach.phone.replaceAll('-', '')}`}>{coach.phone} ↗</a>
          </div>
        ))}
        <a className="email-link" href={`mailto:${gym.email}`}>
          {gym.email} ↗
        </a>
        <p>
          Ask about classes, membership or private training. We’ll help you find your next step.
        </p>
        <div className="social-links">
          <a href={gym.instagram}>Instagram ↗</a>
          <a href={gym.facebook}>Facebook ↗</a>
        </div>
      </div>
      <div className="visit-card">
        <img src="./media/images/building_dark.JPG" alt="The Knockout Fitness gym building" />
        <div>
          <p className="small-label">FIND THE GYM</p>
          <h2>
            BRICK,
            <br />
            NEW JERSEY.
          </h2>
          <p>{gym.address}</p>
          <ActionLink href={gym.directions}>Get directions</ActionLink>
        </div>
      </div>
    </section>
  );
}
