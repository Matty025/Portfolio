import ThemeToggle from "./ThemeToggle";
import styles from "./Navbar.module.css";

const links = [
  { href: "#home", label: "Home", icon: "home" },
  { href: "#about", label: "About", icon: "user" },
  { href: "#projects", label: "Projects", icon: "briefcase" },
  { href: "#contact", label: "Contact", icon: "mail" },
]

function NavIcon({ name }: { name: (typeof links)[number]["icon"] }) {
  switch (name) {
    case "home":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10.5Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "user":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M20 21a8 8 0 1 0-16 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M12 13a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </svg>
      );
    case "briefcase":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M9 7V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M4 12h16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "mail":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M4 6h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="m4 8 8 6 8-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

export default function Navbar(){
    return (
    <aside className={styles.sidebar} aria-label="Sidebar">
      <div className={styles.header}>
        <div className={styles.cover} aria-hidden="true" />

        <div className={styles.profile}>
          <div className={styles.avatar} aria-hidden="true" />
          <div className={styles.profileText}>
            <div className={styles.name}>Mathew Rafael</div>
            <div className={styles.role}>Full-stack Developer</div>
          </div>
        </div>
      </div>

      <nav className={styles.nav} aria-label="Section navigation">
        {links.map((link) => (
          <a key={link.href} className={styles.navLink} href={link.href}>
      <span className={styles.navIcon} aria-hidden="true">
        <NavIcon name={link.icon} />
      </span>
      <span className={styles.navLabel}>{link.label}</span>
          </a>
        ))}
      </nav>

      <div className={styles.bottom}>
        <ThemeToggle />
      </div>
    </aside>
    );
}