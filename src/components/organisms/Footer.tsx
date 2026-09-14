import { Brand } from '../atoms/Brand';
import { gym } from '../../content';
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main wrap">
        <div>
          <Brand />
          <p>
            Rise above your past.
            <br />
            Begin your future.
          </p>
        </div>
        <div>
          <p className="small-label">COME TRAIN WITH US</p>
          <p>{gym.address}</p>
          <a href={gym.directions}>Get directions ↗</a>
        </div>
        <div>
          <p className="small-label">STAY CONNECTED</p>
          <a href={gym.instagram}>Instagram ↗</a>
          <a href={gym.facebook}>Facebook ↗</a>
          <a href={`mailto:${gym.email}`}>Email the gym ↗</a>
        </div>
        <img
          className="heritage"
          src="./media/images/prajioud.jpg"
          alt="Traditional Muay Thai armbands"
          loading="lazy"
        />
      </div>
      <div className="footer-bottom wrap">
        <span>Knockout Fitness · Brick, NJ</span>
        <a href="./schedule.html">See you on the mats. ↗</a>
      </div>
    </footer>
  );
}
