const PROJECTS = [
  {
    icon: 'fa-solid fa-cart-shopping',
    title: 'Sales System',
    status: 'finished',
    statusLabel: 'Completed',
    description:
      'Desktop application developed using Java and Object-Oriented Programming principles for managing sales operations and business workflows.',
    stack: [
      { icon: 'devicon-java-plain', label: 'Java' },
      { icon: 'fa-solid fa-cubes', label: 'OOP' },
    ],
    github: 'https://github.com/AnjaanaJ/SalesSystem',
  },
  {
    icon: 'fa-solid fa-user-graduate',
    title: 'Student Record Manager',
    status: 'finished',
    statusLabel: 'Completed',
    description:
      'Java-based application created to manage and organize student records efficiently using structured programming concepts.',
    stack: [
      { icon: 'devicon-java-plain', label: 'Java' },
      { icon: 'fa-solid fa-folder-open', label: 'File Handling' },
    ],
    github: 'https://github.com/AnjaanaJ/Student-Record-Manager',
  },
  {
    icon: 'fa-solid fa-car-side',
    title: 'DriveEASE',
    status: 'project-active',
    statusLabel: 'In Progress',
    description:
      'Modern web platform for an online driving school featuring responsive UI and full-stack architecture using the MERN stack.',
    stack: [
      { icon: 'devicon-mongodb-plain', label: 'MongoDB' },
      { icon: 'devicon-express-original', label: 'Express' },
      { icon: 'devicon-react-original', label: 'React' },
      { icon: 'devicon-nodejs-plain', label: 'Node.js' },
    ],
    github: 'https://github.com/AnjaanaJ/driveEASE',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="projects section">
      <div className="section-title">
        <span>PROJECTS</span>
        <h2>Featured Work</h2>
      </div>

      <div className="project-grid">
        {PROJECTS.map((project) => (
          <article className="project reveal" key={project.title}>
            <div>
              <span className={`project-status ${project.status}`}>{project.statusLabel}</span>
              <div className="project-title">
                <div className="project-tech-icon">
                  <i className={project.icon}></i>
                </div>
                <h3>{project.title}</h3>
              </div>
              <p>{project.description}</p>
              <div className="stack">
                {project.stack.map(({ icon, label }) => (
                  <span key={label}>
                    <i className={icon}></i>
                    {label}
                  </span>
                ))}
              </div>
              <div className="project-links">
                <a href={project.github}>GitHub</a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
