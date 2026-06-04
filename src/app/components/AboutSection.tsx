"use client";

import { motion, useReducedMotion } from "framer-motion";
import styles from "./AboutSection.module.css";
import AnimatedSection from "./AnimatedSection";
import { stagger } from "@/lib/motion";

const technicalSkills = [
  { name: "TypeScript",  level: 80 },
  { name: "JavaScript", level: 85 },
  { name: "React.js",   level: 85 },
  { name: "Next.js",    level: 80 },
  { name: "Node.js",    level: 85 },
  { name: "Express.js", level: 80 },
  { name: "PostgreSQL", level: 80 },
  { name: "MySQL",      level: 75 },
  { name: "InfluxDB",   level: 75 },
];

const timelineEntries = [
  {
    label: "EDUCATION",
    title: "Baliuag University",
    meta:  "Baliwag, Bulacan · BSIT Major in Web and App Development",
    desc:  "Bachelor of Science in Information Technology",
    date:  "2022–2026",
  },
  {
    label: "WORK EXPERIENCE",
    title: "School Division Office City of Baliwag",
    meta:  "Baliwag, Bulacan · Full-Stack Developer Intern",
    desc:  "Built MSSS, a full-stack procurement web app across 600 hours from schema design to production",
    date:  "Oct 2025–Feb 2026",
  },
];

export default function AboutSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about" className={styles.aboutPage}>
      <AnimatedSection variant="fadeUp">
        <div className={styles.aboutContainer}>

          {/* heading */}
          <AnimatedSection variant="fadeIn" delay={0.05}>
            <p className={styles.aboutSectionLabel}>ABOUT</p>
          </AnimatedSection>
          <AnimatedSection variant="fadeUp" delay={0.12}>
            <h2 className={styles.aboutHeading}>Who I Am and How I Work</h2>
          </AnimatedSection>

          <div className={styles.aboutColumns}>

            {/* ═══ LEFT COLUMN ═══ */}
            <motion.div
              className={styles.aboutLeftColumn}
              initial={shouldReduceMotion ? false : { opacity: 0, x: -36 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
            >
              {/* profile image pops in with scale */}
              <motion.img
                src="/Aboutimg.png"
                alt="Profile photo"
                className={styles.aboutProfileImage}
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
              />

              <motion.div
                className={styles.aboutName}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.36 }}
              >
                Mathew Rafael
              </motion.div>
              <motion.div
                className={styles.aboutRole}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.42 }}
              >
                Full-Stack Developer
              </motion.div>

              <div className={styles.aboutDivider} />

              <p className={styles.aboutSubLabel}>TECHNICAL SKILLS</p>
              <h3 className={styles.aboutSubHeading}>Tools I use most often</h3>

              {/* skill rows stagger in, then bars fill */}
              <div className={styles.skillsList}>
                {technicalSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className={styles.skillRow}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.38,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.25 + stagger(index, 0.055),
                    }}
                  >
                    <div className={styles.skillMetaRow}>
                      <span className={styles.skillName}>{skill.name}</span>
                      <span className={styles.skillValue}>{skill.level}%</span>
                    </div>
                    <div className={styles.skillTrack} aria-hidden="true">
                      <motion.span
                        className={styles.skillFill}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{
                          duration: 1.0,
                          ease: "easeOut",
                          delay: 0.35 + stagger(index, 0.06),
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* ═══ RIGHT COLUMN ═══ */}
            <motion.div
              className={styles.aboutRightColumn}
              initial={shouldReduceMotion ? false : { opacity: 0, x: 36 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
            >
              {/* bio paragraphs fade up one by one */}
              {[
                <>I&apos;m a <span className={styles.aboutAccent}>Full-Stack Developer</span> with a background in web applications, machine learning, and IoT systems. I work across UI, backend, databases, and deployment, and I can quickly adapt to what the project needs.</>,
                <>I recently graduated with a Bachelor of Science in Information Technology from Baliuag University and I&apos;m ready to contribute to a professional team. I build things that work, and I build them properly.</>,
                <>If you&apos;re looking for someone who can contribute across the stack and grow fast, let&apos;s talk.</>,
              ].map((text, index) => (
                <motion.p
                  key={index}
                  className={styles.bioParagraph}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.28 + stagger(index, 0.1),
                  }}
                >
                  {text}
                </motion.p>
              ))}

              {/* pills stagger in */}
              <motion.div
                className={styles.pillRow}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
              >
                {["BSIT Graduate", "Full-Stack Developer", "3+ Projects"].map((label, index) => (
                  <motion.span
                    key={label}
                    className={styles.pill}
                    initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.88 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.35,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.58 + stagger(index, 0.07),
                    }}
                  >
                    {label}
                  </motion.span>
                ))}
              </motion.div>

              {/* CV button with spring hover */}
              <motion.a
                href="/cv.pdf"
                className={styles.cvButton}
                download
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.72 }}
                whileHover={shouldReduceMotion ? {} : {
                  scale: 1.04,
                  y: -3,
                  transition: { type: "spring", stiffness: 1000, damping: 20 },
                }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              >
                Download CV
              </motion.a>

              <div className={styles.aboutDivider} />

              {/* timeline entries alternate left/right + dot springs in */}
              <div className={styles.timelineList}>
                {timelineEntries.map((entry, index) => (
                  <motion.div
                    key={entry.label}
                    className={styles.timelineEntry}
                    initial={
                      shouldReduceMotion
                        ? false
                        : { opacity: 0, x: index % 2 === 0 ? -28 : 28 }
                    }
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{
                      duration: 0.55,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.12 + index * 0.16,
                    }}
                  >
                    <div className={styles.timelineRail}>
                      <span className={styles.timelineLine} />
                      <motion.span
                        className={styles.timelineDot}
                        initial={shouldReduceMotion ? false : { scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                          delay: 0.2 + index * 0.16,
                        }}
                      />
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
            </motion.div>

          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}