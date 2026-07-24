import { useEffect, useState } from "react";
import { useTheme } from "./hooks/useTheme";
import { useScrollReveal } from "./hooks/useScrollReveal";
import Preloader from "./components/Preloader";
import BackgroundOrbs from "./components/BackgroundOrbs";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Blogs from "./components/Blogs";
import Contact from "./components/Contact";
import Admin from "./components/Admin";

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [currentHash, setCurrentHash] = useState(
    () => window.location.hash || "#hero",
  );
  const isAdminView = currentHash === "#admin";

  useScrollReveal(currentHash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || "#hero");
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    const scrollToCurrentSection = window.requestAnimationFrame(() => {
      document.querySelector(currentHash)?.scrollIntoView();
    });

    return () => window.cancelAnimationFrame(scrollToCurrentSection);
  }, [currentHash]);

  return (
    <>
      <Preloader />
      <BackgroundOrbs />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        {isAdminView ? (
          <Admin />
        ) : (
          <>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Blogs />
            <Contact />
          </>
        )}
      </main>
      <footer>
        <p>© 2026 Portfolio | Anjana Kamburugamuwa</p>
      </footer>
    </>
  );
}
