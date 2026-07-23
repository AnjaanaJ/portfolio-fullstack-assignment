export default function About() {
  return (
    <section id="about" className="about section">
      <div className="section-title">
        <span>ABOUT</span>
        <h2>Who I am</h2>
      </div>

      <div className="about-grid">
        <div className="profile-card reveal">
          <img className="profile-image" src="images/image.jpeg" alt="Anjana Kamburugamuwa" />
        </div>

        <div className="about-content reveal">
          <div className="about-block">
            <h3>
              <span className="minor-style">Anjana Kamburgamuwa</span>
            </h3>
            <p>
              A Passionate developer focused on clean UI, modern architecture, and practical DevOps
              workflows.
            </p>
          </div>

          <div className="about-block">
            <h3>
              <span className="minor-style">Education</span>
            </h3>
            <p>
              Bsc. physical Science -ICT (university of Sri Jayawaradanepura)
              <br />
              Good Shepherd Convent- Panadura(A/L)
            </p>
          </div>

          <div className="about-block">
            <h3>
              <span className="minor-style">About me</span>
            </h3>
            <p>
              I&apos;m a passionate Software Developer and ICT undergraduate focused on building
              modern, responsive, and user-friendly digital experiences. I enjoy combining clean
              design, structured architecture and practical development skills to create projects
              that are both functional and visually engaging. Continuously learning and improving,
              I&apos;m exploring web development, software engineering and DevOps practices through
              hands-on projects.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
