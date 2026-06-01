"use client";

import { motion } from "framer-motion";
import styles from "./AboutSection.module.css";

const technicalSkills = [
  { name: "TypeScript", level: 80},
  { name: "JavaScript", level: 85},
  { name: "React.js", level: 85 },
  { name: "Next.js", level: 80 },
  { name: "Node.js", level: 85 },
  { name: "Express.js", level: 80 },
  { name: "PostgreSQL", level: 80 },
  { name: "MySQL", level: 75 },
  { name: "InfluxDB", level: 75 },
];

const timelineEntries = [
  {
    label: "EDUCATION",
    title: "Baliuag University",
    meta: "Baliwag, Bulacan · BSIT Major in Web and App Development",
    desc: "Bachelor of Science in Information Technology",
    date: "2022–2026",
  },
  {
    label: "WORK EXPERIENCE",
    title: "School Division Office City of Baliwag",
    meta: "Baliwag, Bulacan · Full-Stack Developer Intern",
    desc: "Built MSSS, a full-stack procurement web app across 600 hours from schema design to production",
    date: "Oct 2025–Feb 2026",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className={styles.aboutPage}>
      <div className={styles.aboutContainer}>
        <p className={styles.aboutSectionLabel}>ABOUT</p>
        <h2 className={styles.aboutHeading}>Who I Am and How I Work</h2>

        <div className={styles.aboutColumns}>
          <div className={styles.aboutLeftColumn}>
            <img src="/Aboutimg.png" alt="Profile photo" className={styles.aboutProfileImage} />
            <div className={styles.aboutName}>Mathew Rafael</div>
            <div className={styles.aboutRole}>Full-Stack Developer</div>

            <div className={styles.aboutDivider} />

            <p className={styles.aboutSubLabel}>TECHNICAL SKILLS</p>
            <h3 className={styles.aboutSubHeading}>Tools I use most often</h3>

            <div className={styles.skillsList}>
              {technicalSkills.map((skill, index) => (
                <div key={skill.name} className={styles.skillRow}>
                  <div className={styles.skillMetaRow}>
                    <span className={styles.skillName}>{skill.name}</span>
                    <span className={styles.skillValue}>{skill.level}%</span>
                  </div>
                  <div className={styles.skillTrack} aria-hidden="true">
                    <motion.span
                      className={styles.skillFill}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 0.9, ease: "easeOut" as const, delay: index * 0.07 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.aboutRightColumn}>
            <p className={styles.bioParagraph}>
              I&apos;m a <span className={styles.aboutAccent}>Full-Stack Developer</span> with a background in web applications, machine learning, and IoT systems. I work across UI, backend, databases, and deployment, and I can quickly adapt to what the project needs.
            </p>
            <p className={styles.bioParagraph}>
              I recently graduated with a Bachelor of Science in Information Technology from Baliuag University and I&apos;m ready to contribute to a professional team. I build things that work, and I build them properly.
            </p>
            <p className={styles.bioParagraph}>
              If you&apos;re looking for someone who can contribute across the stack and grow fast, let&apos;s talk.
            </p>

            <div className={styles.pillRow}>
              <span className={styles.pill}>BSIT Graduate</span>
              <span className={styles.pill}>Full-Stack Developer</span>
              <span className={styles.pill}>3+ Projects</span>
            </div>

            <a href="/cv.pdf" className={styles.cvButton} download>
              Download CV
            </a>

            <div className={styles.aboutDivider} />

            <div className={styles.timelineList}>
              {timelineEntries.map((entry, index) => (
                <motion.div
                  key={entry.label}
                  className={styles.timelineEntry}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <div className={styles.timelineRail}>
                    <span className={styles.timelineLine} />
                    <span className={styles.timelineDot} />
                  </div>

                  <div className={styles.timelineContent}>
                    <div className={styles.timelineLabel}>{entry.label}</div>
                    <div className={styles.timelineTitle}>{entry.title}</div>
                    <div className={styles.timelineMeta}>{entry.meta}</div>
                    <div className={styles.timelineDesc}>{entry.desc}</div>
                    <div className={styles.timelineDate}>{entry.date}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}