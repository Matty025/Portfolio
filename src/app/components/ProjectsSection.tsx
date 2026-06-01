"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import styles from "../page.module.css";
import projStyles from "./ProjectsSection.module.css";

type ProjectTag = "Web-Based" | "ML · IoT";

type ProjectItem = {
  title: string;
  date: string;
  category: ProjectTag;
  image: string;
  summary: string;
  tech: string[];
  liveUrl?: string;
  repoUrl?: string;
  tags: ProjectTag[];
};

const filterOptions: Array<"All" | ProjectTag> = ["All", "Web-Based", "ML · IoT"];

const projectItems: ProjectItem[] = [
  {
    title: "EIMCognito",
    date: "April 2026",
    category: "Web-Based",
    image: "/EIMCognito.png",
    summary:
      "A web-based gamified learning platform for teens studying Electrical Installation & Maintenance and solar (PV) systems.",
    tech: ["React", "Node.js", "Supabase", "JavaScript"],
    liveUrl: "https://eimcognito.vercel.app/",
    repoUrl: "https://github.com/Matty025/EIMCognito_Public",
    tags: ["Web-Based"],
  },
  {
    title: "Market Scoping & Survey System",
    date: "Jan 2026",
    category: "Web-Based",
    image: "/marketscoping.png",
    summary:
      "A web-based procurement platform for market research and scoping. It helps DepEd collect supplier information, compare pricing, and prepare future purchasing decisions.",
    tech: ["Node.js", "Express", "React", "Vite", "Ant Design", "PostgreSQL", "Supabase"],
    liveUrl: "https://msss-2pxo.vercel.app/",
    repoUrl: "https://github.com/Matty025/Market_Scoping_and_Survey_System",
    tags: ["Web-Based"],
  },
  {
    title: "Fuel Injected (FI) Motorcycle Maintenance Device",
    date: "August 2025",
    category: "Web-Based",
    image: "/Machinelearning.png",
    summary:
      "An end-to-end IoT predictive maintenance platform using OBD-II data, MQTT streaming, and Python ML models to detect motorcycle engine anomalies with a real-time React dashboard.",
    tech: ["Python", "Flask", "React", "MQTT", "InfluxDB", "scikit-learn", "OBD-II"],
    liveUrl: "https://pm-machinelearning.onrender.com/",
    repoUrl: "https://github.com/Matty025/PM_Capstone-Revised",
    tags: ["Web-Based", "ML · IoT"],
  },
];

const containerVariants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.18, ease: "easeOut" as const },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 34, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 360, damping: 24, mass: 0.8 },
  },
  exit: {
    opacity: 0,
    y: -18,
    scale: 0.9,
    transition: { duration: 0.16 },
  },
};

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<"All" | ProjectTag>("All");

  const visibleProjects =
    activeFilter === "All"
      ? projectItems
      : projectItems.filter((project) => project.tags.includes(activeFilter));

  return (
    <section id="projects" className={styles.section}>
      <div className={`${projStyles.container} projects-section-container`}>
        <div className={styles.sectionHeader}>
          <h2 className={`${styles.sectionTitle} ${projStyles.title}`}>Projects</h2>
          <p className={`${styles.sectionLead} ${projStyles.lead}`}>
            A curated set of live builds with short summaries, source links, and quick filters.
          </p>
        </div>

        <div className={projStyles.filterBar} role="tablist" aria-label="Project filters">
        {filterOptions.map((option) => (
          <motion.button
            key={option}
            type="button"
            className={`${projStyles.filterButton} ${
              activeFilter === option ? projStyles.filterButtonActive : ""
            }`}
            onClick={() => setActiveFilter(option)}
            whileTap={{ scale: 0.98 }}
            aria-pressed={activeFilter === option}
          >
            {option}
          </motion.button>
        ))}
      </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeFilter}
            className={projStyles.grid}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
          >
          {visibleProjects.map((project, index) => (
            <motion.article
              key={project.title}
              className={projStyles.card}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.985 }}
            >
              <div className={projStyles.media}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className={projStyles.image}
                  sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
                />

                <div className={projStyles.mediaOverlay}>
                  <div className={projStyles.overlayButtons}>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={projStyles.overlayBtn}
                        aria-label={`Open live demo for ${project.title}`}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                          <path d="M14 3h7v7" stroke="#0f172a" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M10 14L21 3" stroke="#0f172a" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M21 21H3V3" stroke="#0f172a" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    )}

                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={projStyles.overlayBtn}
                        aria-label={`Open GitHub repo for ${project.title}`}
                      >
                        <Image src="/github.png" alt="GitHub" width={20} height={20} className={projStyles.overlayIconLight} />
                        <Image src="/github-dark.png" alt="GitHub" width={20} height={20} className={projStyles.overlayIconDark} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className={projStyles.body}>
                <div className={projStyles.badge}>{project.category}</div>
                <h3 className={projStyles.projectTitle}>{project.title}</h3>
                <p className={projStyles.date}>{project.date}</p>
                <p className={projStyles.summary}>{project.summary}</p>

                <div className={projStyles.pills}>
                  {project.tech.map((tech) => (
                    <span key={`${project.title}-${tech}`} className={projStyles.pill}>
                      {tech}
                    </span>
                  ))}
                </div>

                <div className={projStyles.actions}>
                  {project.repoUrl && (
                    <a href={project.repoUrl} target="_blank" rel="noreferrer" className={projStyles.actionGit}>
                      GitHub
                    </a>
                  )}

                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className={projStyles.actionLive}>
                      Live demo
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
