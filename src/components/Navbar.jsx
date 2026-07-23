import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#blogs', label: 'Blogs' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 30);

      const sections = document.querySelectorAll('section');
      let current = '';
      sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 180) {
          current = section.id;
        }
      });
      if (current) setActiveSection(current);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') setMenuOpen(false);
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  const handleMobileKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') setMenuOpen((o) => !o);
  };

  return (
    <header>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
        <a href="#hero" className="logo">
          {'</>'}
          <span>Anjaana</span>
        </a>

        <div
          className="mobile-toggle"
          id="mobileToggle"
          aria-label="Open navigation"
          role="button"
          tabIndex={0}
          onClick={() => setMenuOpen((o) => !o)}
          onKeyDown={handleMobileKeyDown}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-links${menuOpen ? ' open' : ''}`} id="navLinks">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className={activeSection === href.slice(1) ? 'active' : ''}
                onClick={handleLinkClick}
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <button
              id="themeToggle"
              className="theme-btn"
              aria-label="Toggle Theme"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? '🌙' : '☀'}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
