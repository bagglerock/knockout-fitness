import { ActionLink } from '../atoms/ActionLink';
export function ContactBanner() {
  return (
    <section className="contact-banner">
      <div className="wrap">
        <div>
          <p className="small-label">YOUR NEXT CHAPTER</p>
          <h2>STEP ONTO THE MATS.</h2>
          <p>Questions about classes or getting started? Let’s talk.</p>
        </div>
        <ActionLink href="./location.html">Get in touch</ActionLink>
      </div>
    </section>
  );
}
