import styles from "./page.module.css";
import Navbar from "./components/Navbar";
import HomeSection from "./components/Home";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";

export default function Home() {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.content}>
        <section id="home" className={styles.section}>
          <HomeSection />
        </section>

        <AboutSection />

        <ProjectsSection />

        <ContactSection />
      </main>
    </div>
  );
}
