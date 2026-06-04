"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DURATION, EASE, FADE_IN, FADE_UP, SCALE_IN, stagger } from "@/lib/motion";
import styles from "./Home.module.css";

export default function HomeSection() {
  const shouldReduceMotion = useReducedMotion();

  const dateIso = new Date().toISOString().slice(0, 10);
  const dateForDisplay = new Date(`${dateIso}T00:00:00.000Z`);
  const dateText = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(dateForDisplay);

  const headline = "\u00A0Transforming ideas into functional web platforms.";

  const getAbbrev = (label: string) => {
    const known: Record<string, string> = {
      JavaScript: "JS", TypeScript: "TS", Python: "PY", Java: "JV",
      Swift: "SW", Kotlin: "KT", HTML: "HTML", CSS: "CSS",
      React: "RE", "React Native": "RN", "Next.js": "NX", Angular: "NG",
      "Node.js": "ND", Flask: "FK", "scikit-learn": "SK", pandas: "PD",
      PostgreSQL: "PG", MySQL: "MY", InfluxDB: "IF", Supabase: "SB",
      Docker: "DK", Git: "GT", GitHub: "GH", Vercel: "VC",
      Render: "RD", "Microsoft Azure": "AZ", AWS: "AWS", Postman: "PM",
    };
    if (known[label]) return known[label];
    const words = label.replace(/[^a-z0-9]+/gi, " ").trim().split(/\s+/).filter(Boolean);
    if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
    return (words[0] ?? label).slice(0, 2).toUpperCase();
  };

  const allTechs: { label: string; iconSrc?: string }[] = [
    { label: "JavaScript",      iconSrc: "/techstacks-icon/icons8-javascript-50.svg" },
    { label: "TypeScript",      iconSrc: "/techstacks-icon/icons8-typescript-50.svg" },
    { label: "Python",          iconSrc: "/techstacks-icon/icons8-python-50.svg" },
    { label: "Java",            iconSrc: "/techstacks-icon/icons8-java-50.svg" },
    { label: "Swift",           iconSrc: "/techstacks-icon/icons8-swift-50.svg" },
    { label: "Kotlin",          iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
    { label: "HTML",            iconSrc: "/techstacks-icon/icons8-html-5-50.svg" },
    { label: "CSS",             iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { label: "React",           iconSrc: "/techstacks-icon/react-icon.png" },
    { label: "React Native",    iconSrc: "/techstacks-icon/icons8-react-native-50.svg" },
    { label: "Next.js",         iconSrc: "/techstacks-icon/nextjs-icon-svgrepo-com.svg" },
    { label: "Angular",         iconSrc: "/techstacks-icon/icons8-angularjs-50.svg" },
    { label: "Node.js",         iconSrc: "/techstacks-icon/icons8-nodejs-50.svg" },
    { label: "Flask",           iconSrc: "/techstacks-icon/icons8-flask-50.png" },
    { label: "scikit-learn",    iconSrc: "/techstacks-icon/Scitkit-learn-icon.png" },
    { label: "pandas",          iconSrc: "/techstacks-icon/icons8-pandas-48.png" },
    { label: "PostgreSQL",      iconSrc: "/techstacks-icon/icons8-postgresql-48.png" },
    { label: "MySQL",           iconSrc: "/techstacks-icon/icons8-mysql-24.png" },
    { label: "InfluxDB",        iconSrc: "/techstacks-icon/icons8-influxdb-64.png" },
    { label: "Supabase",        iconSrc: "/techstacks-icon/icons8-supabase-48.png" },
    { label: "Docker",          iconSrc: "https://cdn-icons-png.flaticon.com/512/919/919853.png" },
    { label: "Git",             iconSrc: "/techstacks-icon/icons8-git-48.png" },
    { label: "GitHub",          iconSrc: "/techstacks-icon/icons8-github-50.png" },
    { label: "Vercel",          iconSrc: "/vercel.svg" },
    { label: "Render",          iconSrc: "https://gdm-catalog-fmapi-prod.imgix.net/ProductLogo/ca9f2eee-43a4-463a-b8d2-23ae5fa5d03f.jpeg" },
    { label: "Microsoft Azure", iconSrc: "/techstacks-icon/icons8-azure-48.png" },
    { label: "AWS",             iconSrc: "/techstacks-icon/icons8-aws-48.png" },
    { label: "Postman",         iconSrc: "/techstacks-icon/icons8-postman-inc-24.png" },
  ];

  const marqueeItems = [...allTechs, ...allTechs];

  // Page-load mount animation helper
  const mount = (delay: number, variants = FADE_UP) => {
    if (shouldReduceMotion) return {};
    return {
      variants,
      initial: "hidden" as const,
      animate: "visible" as const,
      transition: { duration: DURATION.base, ease: EASE.out, delay },
    };
  };

  // Scroll-reveal helper (for elements below the fold)
  const reveal = (delay: number, variants = FADE_UP) => {
    if (shouldReduceMotion) return {};
    return {
      variants,
      initial: "hidden" as const,
      whileInView: "visible" as const,
      viewport: { once: true, amount: 0.15 },
      transition: { duration: DURATION.base, ease: EASE.out, delay },
    };
  };

  return (
    <div className={styles.parent}>
      <div className={styles.leftCol}>

        {/* ── intro card ── */}
        <motion.div
          className={`${styles.card} ${styles.div1} ${styles.introCard}`}
          {...mount(0, FADE_UP)}
        >
          <time className={styles.introDate} dateTime={dateIso}>
            {dateText}
          </time>

          <div className={styles.introBody}>
            <motion.p className={styles.heroGreeting} {...mount(0.1, FADE_UP)}>
              Hi, I&apos;m Mathew Rafael
            </motion.p>
            <motion.h1
              className={styles.heroTitle}
              aria-label={headline}
              {...mount(0.2, FADE_UP)}
            >
              <span
                className={styles.typewriterLoop}
                style={{
                  ["--tw-width" as never]: `${headline.length}ch`,
                  animationTimingFunction: `steps(${headline.length}, end), linear`,
                }}
              >
                {headline}
              </span>
            </motion.h1>
          </div>
        </motion.div>

        {/* ── what I do card ── */}
        <motion.div className={styles.card} {...mount(0.25, SCALE_IN)}>
          <div className={styles.categoryTitle}>What I do</div>
          <p className={styles.muted}>
            I&apos;m a full-stack developer who builds web applications using React and
            Node.js. I work across the entire stack, from UI to databases, and bring
            in machine learning and IoT experience when the project calls for it.
          </p>
        </motion.div>

        {/* ── get in touch card ── */}
        <motion.div className={styles.card} {...mount(0.35, FADE_UP)}>
          <h3 className={styles.heading}>Get in touch</h3>
          <p className={styles.muted}>
            Got a project in mind or just want to connect?
          </p>
          <div className={styles.contactRow}>
            {[
              { label: "Email",    href: "https://mail.google.com/mail/?view=cm&fs=1&to=mathewbulawan@gmail.com" },
              { label: "GitHub",   href: "https://github.com/Matty025" },
              { label: "Facebook", href: "https://www.facebook.com/mathew.rafael.5" },
              { label: "Viber",    href: "viber://chat?number=%2B639694063677" },
            ].map((chip, index) => (
              <motion.a
                key={chip.label}
                href={chip.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactChip}
                {...mount(0.38 + stagger(index, 0.07), FADE_UP)}
                whileHover={shouldReduceMotion ? {} : {
                  scale: 1.05,
                  border: "2px solid #2dd4bf",
                  y: -3,
                  transition: { type: "spring", stiffness: 1000, damping: 10 },
                }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
              >
                {chip.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── right col: featured projects ── */}
      <div className={styles.rightCol}>
        <motion.div
          className={`${styles.card} ${styles.div3}`}
          {...mount(0.3, FADE_UP)}
        >
          <h3 className={styles.heading}>Featured Projects</h3>
          <div className={styles.projectGrid}>
            {[
              {
                badge: "Machine Learning · IoT",
                name: "FI MOTORCYCLE MAINTENANCE DEVICE",
                headline: "Machine Learning",
                headlineRest: "Capabilities",
                desc: "Streams real-time OBD data over MQTT and uses anomaly detection to monitor engine health and predict maintenance needs.",
                pills: ["React", "Node.js", "Python", "Flask", "InfluxDB", "PostgreSQL", "scikit-learn"],
              },
              {
                badge: "Web App",
                name: "EIMCOGNITO",
                headline: "Gamified",
                headlineRest: "EIM Learning Platform",
                desc: "Role-based platform where students complete modules and quizzes to earn coins and rewards, while teachers manage content, leaderboards, and redemptions.",
                pills: ["React", "Node.js", "Supabase"],
              },
            ].map((project, index) => (
              <motion.div
                key={project.name}
                className={styles.projectCard}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: DURATION.base,
                  ease: EASE.out,
                  delay: 0.42 + stagger(index, 0.1),
                }}
                whileHover={shouldReduceMotion ? {} : {
                  y: -4,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 80, damping: 18, mass: 0.8 },
                }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              >
                <div className={`${styles.projectBanner} ${styles.projectBannerDark}`}>
                  <div className={styles.projectTopRow}>
                    <span className={styles.projectBadge}>{project.badge}</span>
                    <span className={styles.projectArrow} aria-hidden="true">↗</span>
                  </div>
                  <div className={styles.projectName}>{project.name}</div>
                  <div className={styles.projectHeadline}>
                    <span style={{ color: "#5DCAA5" }}>{project.headline}</span>{" "}
                    {project.headlineRest}
                  </div>
                </div>
                <div className={styles.projectBody}>
                  <p className={styles.projectDesc}>{project.desc}</p>
                  <div className={styles.projectDivider} aria-hidden="true" />
                  <div className={styles.projectPills} aria-label="Technologies used">
                    {project.pills.map((pill) => (
                      <span key={pill} className={styles.projectPill}>{pill}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── marquee / tech stack ── */}
      <motion.div
        className={`${styles.card} ${styles.marqueeCard}`}
        {...reveal(0, FADE_IN)}
      >
        <div className={styles.marqueeKicker}>TECH STACK</div>

        {/* Row 1 — scrolls left */}
        <motion.div
          className={styles.iconScroller}
          {...reveal(0.08, FADE_IN)}
        >
          <div className={styles.iconTrack} aria-hidden="true">
            {marqueeItems.map((tech, i) => (
              <span key={`${tech.label}:${i}`} className={styles.iconChip}>
                {tech.iconSrc ? (
                  <img className={styles.iconImg} src={tech.iconSrc} alt="" />
                ) : (
                  <span className={styles.iconFallback} aria-hidden="true">
                    {getAbbrev(tech.label)}
                  </span>
                )}
                <span className={styles.iconLabel}>{tech.label}</span>
              </span>
            ))}
          </div>
        </motion.div>

        {/* Row 2 — scrolls right (reverse) */}
        <motion.div
          className={`${styles.iconScroller} ${styles.iconScrollerReverse}`}
          {...reveal(0.14, FADE_IN)}
        >
          <div
            className={`${styles.iconTrack} ${styles.iconTrackReverse}`}
            aria-hidden="true"
          >
            {[...marqueeItems].reverse().map((tech, i) => (
              <span key={`${tech.label}:rev:${i}`} className={styles.iconChip}>
                {tech.iconSrc ? (
                  <img className={styles.iconImg} src={tech.iconSrc} alt="" />
                ) : (
                  <span className={styles.iconFallback} aria-hidden="true">
                    {getAbbrev(tech.label)}
                  </span>
                )}
                <span className={styles.iconLabel}>{tech.label}</span>
              </span>
            ))}
          </div>
        </motion.div>

        <ul className={styles.srOnly}>
          {allTechs.map((tech) => (
            <li key={tech.label}>{tech.label}</li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}