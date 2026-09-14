import { Eyebrow } from '../atoms/Eyebrow';
import { ActionLink } from '../atoms/ActionLink';
export function Hero() {
  return (
    <section className="hero">
      <div className="hero-main wrap">
        <div className="hero-content">
          <Eyebrow>KNOCKOUT FITNESS · BRICK, NJ</Eyebrow>
          <h1>
            RISE ABOVE.
            <br />
            <span>BEGIN YOUR</span>
            <br />
            FUTURE.
          </h1>
          <p>
            Muay Thai. Real training. A place to grow.
            <br />
            Find your next chapter on the mats.
          </p>
          <div className="actions">
            <ActionLink href="./schedule.html">Find your class</ActionLink>
            <a className="hero-explore" href="#programs">
              Explore the gym <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <img
          className="hero-art"
          src="./media/images/silouette.png"
          width="800"
          height="400"
          alt=""
          aria-hidden="true"
        />
      </div>
      <div className="hero-bottom wrap">
        <span>DISCIPLINE. CONFIDENCE. COMMUNITY.</span>
        <span>SCROLL TO EXPLORE ↓</span>
      </div>
    </section>
  );
}
