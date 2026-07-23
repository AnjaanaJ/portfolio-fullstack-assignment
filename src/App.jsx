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
  useScrollReveal();

  return (
    <>
      <Preloader />
      <BackgroundOrbs />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Admin />
        <Blogs />
        <Contact />
      </main>
      <footer>
        <p>© 2026 Portfolio | Anjana Kamburugamuwa</p>
      </footer>
    </>
  );
}
