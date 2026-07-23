const SKILLS = [
  {
    icon: 'fa-solid fa-code',
    title: 'Frontend',
    progress: '90%',
    tech: [
      { icon: 'devicon-html5-plain', label: 'HTML' },
      { icon: 'devicon-css3-plain', label: 'CSS' },
      { icon: 'devicon-javascript-plain', label: 'JavaScript' },
    ],
    desc: 'HTML • CSS • JavaScript',
  },
  {
    icon: 'fa-solid fa-server',
    title: 'Backend',
    progress: '90%',
    tech: [{ icon: 'devicon-mysql-plain', label: 'MySQL' }],
    desc: 'MySQL',
  },
  {
    icon: 'fa-solid fa-gears',
    title: 'DevOps',
    progress: '70%',
    tech: [
      { icon: 'devicon-git-plain', label: 'Git' },
      { icon: 'devicon-githubactions-plain', label: 'CI/CD' },
      { icon: 'devicon-docker-plain', label: 'Docker' },
    ],
    desc: 'Git • CI/CD • Docker',
  },
  {
    icon: 'fa-solid fa-cloud',
    title: 'Cloud',
    progress: '65%',
    tech: [{ icon: 'devicon-github-original', label: 'GitHub Pages' }],
    desc: 'GitHub Pages',
  },
  {
    icon: 'fa-solid fa-screwdriver-wrench',
    title: 'Tools',
    progress: '85%',
    tech: [
      { icon: 'devicon-vscode-plain', label: 'VS Code' },
      { icon: 'devicon-figma-plain', label: 'Figma' },
    ],
    desc: 'VS Code • Figma',
  },
  {
    icon: 'fa-solid fa-laptop-code',
    title: 'Languages',
    progress: '80%',
    tech: [
      { icon: 'devicon-java-plain', label: 'Java' },
      { icon: 'devicon-javascript-plain', label: 'JavaScript' },
    ],
    desc: 'Java • JavaScript',
  },
];

export default function Skills() {
  return (
    <section id="skills" className="skills section">
      <div className="section-title">
        <span>SKILLS</span>
        <h2>Technical Stack</h2>
      </div>

      <div className="skills-grid">
        {SKILLS.map((skill) => (
          <div className="skill-card reveal" key={skill.title}>
            <div className="skill-icon">
              <i className={skill.icon}></i>
            </div>
            <h3>{skill.title}</h3>
            <div className="progress">
              <span style={{ width: skill.progress }}></span>
            </div>
            <div className="skill-tech">
              {skill.tech.map(({ icon, label }) => (
                <span key={label}>
                  <i className={icon}></i>
                  {label}
                </span>
              ))}
            </div>
            <p>{skill.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
