import { useTypingEffect } from '../hooks/useTypingEffect';

export default function Hero() {
  const typedText = useTypingEffect();

  return (
    <section id="hero" className="hero">
      <div className="hero-content reveal">
        <p className="eyebrow">SOFTWARE DEVELOPER</p>

        <h1>
          Hi, I am
          <span className="gradient"> Anjana Kamburgamuwa</span>
        </h1>

        <div className="typing-wrap">
          <span id="typing">{typedText}</span>
        </div>

        <p className="hero-text">
          Building elegant interfaces, clean architectures, and automated deployment pipelines.
        </p>

        <div className="hero-actions">
          <a className="btn primary" href="#projects">View Work</a>
          <a className="btn secondary" href="#contact">Get In Touch</a>
        </div>

        <div className="socials">
          <a href="https://github.com/AnjaanaJ" aria-label="GitHub">
            <i className="fa-brands fa-github"></i>
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/anjana-kamburugamuwa-35b02b41a/" aria-label="LinkedIn">
            <i className="fa-brands fa-linkedin-in"></i>
            LinkedIn
          </a>
          <a href="mailto:anjanajanani6@gmail.com" aria-label="Email">
            <i className="fa-solid fa-envelope"></i>
            Email
          </a>
        </div>
      </div>
    </section>
  );
}
