import styles from "./Home.module.css";

export default function HomeSection() {
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
			JavaScript: "JS",
			TypeScript: "TS",
			Python: "PY",
			Java: "JV",
			Swift: "SW",
			Kotlin: "KT",
			HTML: "HTML",
			CSS: "CSS",
			React: "RE",
			"React Native": "RN",
			"Next.js": "NX",
			Angular: "NG",
			"Node.js": "ND",
			Flask: "FK",
			"scikit-learn": "SK",
			pandas: "PD",
			PostgreSQL: "PG",
			MySQL: "MY",
			InfluxDB: "IF",
			Supabase: "SB",
			Docker: "DK",
			Git: "GT",
			GitHub: "GH",
			Vercel: "VC",
			Render: "RD",
			"Microsoft Azure": "AZ",
			AWS: "AWS",
			Postman: "PM",
		};

		if (known[label]) return known[label];

		const words = label
			.replace(/[^a-z0-9]+/gi, " ")
			.trim()
			.split(/\s+/)
			.filter(Boolean);

		if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
		return (words[0] ?? label).slice(0, 2).toUpperCase();
	};

	// All techs in one flat list for the marquee
	const allTechs: { label: string; iconSrc?: string }[] = [
		{ label: "JavaScript", iconSrc: "/techstacks-icon/icons8-javascript-50.svg" },
		{ label: "TypeScript", iconSrc: "/techstacks-icon/icons8-typescript-50.svg" },
		{ label: "Python", iconSrc: "/techstacks-icon/icons8-python-50.svg" },
		{ label: "Java", iconSrc: "/techstacks-icon/icons8-java-50.svg" },
		{ label: "Swift", iconSrc: "/techstacks-icon/icons8-swift-50.svg" },
		{ label: "Kotlin", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
		{ label: "HTML", iconSrc: "/techstacks-icon/icons8-html-5-50.svg" },
		{ label: "CSS", iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
		{ label: "React", iconSrc: "/techstacks-icon/react-icon.png" },
		{ label: "React Native", iconSrc: "/techstacks-icon/icons8-react-native-50.svg" },
		{ label: "Next.js", iconSrc: "/techstacks-icon/nextjs-icon-svgrepo-com.svg" },
		{ label: "Angular", iconSrc: "/techstacks-icon/icons8-angularjs-50.svg" },
		{ label: "Node.js", iconSrc: "/techstacks-icon/icons8-nodejs-50.svg" },
		{ label: "Flask", iconSrc: "/techstacks-icon/icons8-flask-50.png" },
		{ label: "scikit-learn", iconSrc: "/techstacks-icon/Scitkit-learn-icon.png" },
		{ label: "pandas", iconSrc: "/techstacks-icon/icons8-pandas-48.png" },
		{ label: "PostgreSQL", iconSrc: "/techstacks-icon/icons8-postgresql-48.png" },
		{ label: "MySQL", iconSrc: "/techstacks-icon/icons8-mysql-24.png" },
		{ label: "InfluxDB", iconSrc: "/techstacks-icon/icons8-influxdb-64.png" },
		{ label: "Supabase", iconSrc: "/techstacks-icon/icons8-supabase-48.png" },
		{ label: "Docker", iconSrc: "https://cdn-icons-png.flaticon.com/512/919/919853.png" },
		{ label: "Git", iconSrc: "/techstacks-icon/icons8-git-48.png" },
		{ label: "GitHub", iconSrc: "/techstacks-icon/icons8-github-50.png" },
		{ label: "Vercel", iconSrc: "/vercel.svg" },
		{ label: "Render", iconSrc: "https://gdm-catalog-fmapi-prod.imgix.net/ProductLogo/ca9f2eee-43a4-463a-b8d2-23ae5fa5d03f.jpeg" },
		{ label: "Microsoft Azure", iconSrc: "/techstacks-icon/icons8-azure-48.png" },
		{ label: "AWS", iconSrc: "/techstacks-icon/icons8-aws-48.png" },
		{ label: "Postman", iconSrc: "/techstacks-icon/icons8-postman-inc-24.png" },
	];

	// Duplicate for seamless infinite loop
	const marqueeItems = [...allTechs, ...allTechs];

	return (
		<div className={styles.parent}>
			<div className={styles.leftCol}>
				<div className={`${styles.card} ${styles.div1} ${styles.introCard}`}>
					<time className={styles.introDate} dateTime={dateIso}>
						{dateText}
					</time>

					<div className={styles.introBody}>
						<h1 className={styles.heroTitle} aria-label={headline}>
							<span
								className={styles.typewriterLoop}
								style={{
									["--tw-width" as never]: `${headline.length}ch`,
									animationTimingFunction: `steps(${headline.length}, end), linear`,
								}}
							>
								{headline}
							</span>
						</h1>
					</div>
				</div>

				<div className={styles.card}>
					<div className={styles.categoryTitle}>What I do</div>
					<p className={styles.muted}>
						I'm a full-stack developer who builds web applications using React and
						Node.js. I work across the entire stack, from UI to databases, and bring
						in machine learning and IoT experience when the project calls for it.
					</p>
				</div>

				<div className={styles.card}>
					<h3 className={styles.heading}>Get in touch</h3>
					<p className={styles.muted}>
						Got a project in mind or just want to connect?
					</p>
					<div className={styles.contactRow}>
						<a
							href="mailto:mathewbulawan@gmail.com"
							target="_blank"
							rel="noopener noreferrer"
							className={styles.contactChip}
						>
							Email
						</a>
						<a
							href="https://github.com/Matty025"
							target="_blank"
							rel="noopener noreferrer"
							className={styles.contactChip}
						>
							GitHub
						</a>
						<a
							href="https://www.facebook.com/mathew.rafael.5"
							target="_blank"
							rel="noopener noreferrer"
							className={styles.contactChip}
						>
							Facebook
						</a>
						<a
							href="viber://chat?number=%2B639694063677"
							target="_blank"
							rel="noopener noreferrer"
							className={styles.contactChip}
						>
							Viber
						</a>
					</div>
				</div>
			</div>

			<div className={styles.rightCol}>
				<div className={`${styles.card} ${styles.div3}`}>
					<h3 className={styles.heading}>Featured Projects</h3>
					<div className={styles.projectGrid}>
						<div className={styles.projectCard}>
							<div className={`${styles.projectBanner} ${styles.projectBannerDark}`}>
								<div className={styles.projectTopRow}>
									<span className={styles.projectBadge}>Machine Learning · IoT</span>
									<span className={styles.projectArrow} aria-hidden="true">
										↗
									</span>
								</div>

								<div className={styles.projectName}>
									FI MOTORCYCLE MAINTENANCE DEVICE
								</div>
								<div className={styles.projectHeadline}>
									<span style={{ color: "#5DCAA5" }}>Machine Learning</span>{" "}
									Capabilities
								</div>
							</div>

							<div className={styles.projectBody}>
								<p className={styles.projectDesc}>
									Streams real-time OBD data over MQTT and uses anomaly detection to
									monitor engine health and predict maintenance needs.
								</p>

								<div className={styles.projectDivider} aria-hidden="true" />
								<div className={styles.projectPills} aria-label="Technologies used">
									<span className={styles.projectPill}>React</span>
									<span className={styles.projectPill}>Node.js</span>
									<span className={styles.projectPill}>Python</span>
									<span className={styles.projectPill}>Flask</span>
									<span className={styles.projectPill}>InfluxDB</span>
									<span className={styles.projectPill}>PostgreSQL</span>
									<span className={styles.projectPill}>scikit-learn</span>
								</div>
							</div>
						</div>

						<div className={styles.projectCard}>
							<div className={`${styles.projectBanner} ${styles.projectBannerDark}`}>
								<div className={styles.projectTopRow}>
									<span className={styles.projectBadge}>Web App</span>
									<span className={styles.projectArrow} aria-hidden="true">
										↗
									</span>
								</div>

								<div className={styles.projectName}>EIMCOGNITO</div>
								<div className={styles.projectHeadline}>
									<span style={{ color: "#5DCAA5" }}>Gamified</span>{" "}
									EIM Learning Platform
								</div>
							</div>

							<div className={styles.projectBody}>
								<p className={styles.projectDesc}>
									Role-based platform where students complete modules and quizzes to
									earn coins and rewards, while teachers manage content, leaderboards,
									and redemptions.
								</p>

								<div className={styles.projectDivider} aria-hidden="true" />
								<div className={styles.projectPills} aria-label="Technologies used">
									<span className={styles.projectPill}>React</span>
									<span className={styles.projectPill}>Node.js</span>
									<span className={styles.projectPill}>Supabase</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className={`${styles.card} ${styles.marqueeCard}`}>
				<div className={styles.marqueeKicker}>TECH STACK</div>

				{/* Row 1 — scrolls left */}
				<div className={styles.iconScroller}>
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
				</div>

				{/* Row 2 — scrolls right (reverse) */}
				<div className={`${styles.iconScroller} ${styles.iconScrollerReverse}`}>
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
				</div>

				<ul className={styles.srOnly}>
					{allTechs.map((tech) => (
						<li key={tech.label}>{tech.label}</li>
					))}
				</ul>
			</div>
		</div>
	);
}