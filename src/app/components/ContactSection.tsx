import styles from "./ContactSection.module.css";

const contactLinks = [
  {
    label: "Email",
    icon: "mail",
    href: "mailto:mathewbulawan@gmail.com",
    value: "mathewbulawan@gmail.com",
  },
  {
    label: "GitHub",
    icon: "github",
    href: "https://github.com/Matty025",
    value: "github.com/Matty025",
  },
  {
    label: "Facebook",
    icon: "facebook",
    href: "https://www.facebook.com/mathew.rafael.5",
    value: "facebook.com/mathew.rafael.5",
  },
  {
    label: "Viber",
    icon: "viber",
    href: "viber://chat?number=%2B639694063677",
    value: "Mathew Rafael Bulawan",
    detail: "+63 969 ••• 3677",
  },
];

function ContactIcon({ name }: { name: (typeof contactLinks)[number]["icon"] }) {
  switch (name) {
    case "mail":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path
            d="m4 8 8 6 8-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48 0-.24-.01-1.04-.02-1.89-2.78.6-3.37-1.18-3.37-1.18-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.61.07-.61 1 .08 1.53 1.03 1.53 1.03.89 1.53 2.33 1.09 2.9.83.09-.64.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.93 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.28.1-2.67 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.39.2 2.42.1 2.67.64.7 1.03 1.59 1.03 2.68 0 3.83-2.33 4.68-4.56 4.93.36.31.68.92.68 1.86 0 1.34-.01 2.42-.01 2.75 0 .26.18.58.69.48A10 10 0 0 0 12 2Z"
            fill="currentColor"
          />
        </svg>
      );
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M14 8.5V7.3c0-.88.58-1.3 1.17-1.3H17V3h-2.15C12.31 3 11 4.5 11 6.78V8.5H9v3h2V21h3v-9.5h2.38l.62-3H14Z"
            fill="currentColor"
          />
        </svg>
      );
    case "viber":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M6.2 4.5h11.6A2.2 2.2 0 0 1 20 6.7v8.6a2.2 2.2 0 0 1-2.2 2.2H13l-4.2 2.4v-2.4H6.2A2.2 2.2 0 0 1 4 15.3V6.7a2.2 2.2 0 0 1 2.2-2.2Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path
            d="M8.2 9.1c1.1 2.1 2.6 3.6 4.6 4.7.3.2.7.1.9-.2l.7-1.1c.2-.3.6-.5 1-.4.8.2 1.6.4 2.4.8.4.2.6.6.5 1-.2.9-.7 1.5-1.6 1.8-1.4.4-3.3.2-5.4-1-2.4-1.3-4.1-3.2-5.4-5.7-.7-1.3-.9-2.7-.4-4 .3-.8.9-1.3 1.8-1.5.5-.1.9.1 1.1.5.4.8.6 1.6.8 2.4.1.4-.1.8-.4 1l-1 .7c-.4.3-.5.6-.2 1Z"
            fill="currentColor"
          />
        </svg>
      );
    default:
      return null;
  }
}

export default function ContactSection() {
  return (
    <section id="contact" className={styles.contactSection}>
      <div className={styles.contactCard}>
        <p className={styles.kicker}>CONTACT</p>
        <h2 className={styles.title}>Let&apos;s build the next thing</h2>
        <p className={styles.lead}>
          If you&apos;re a client, recruiter, or company representative and want to discuss a
          projects, or collaboration, reach out through any of the channels below.
        </p>

        <div className={styles.linkGrid}>
          {contactLinks.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className={styles.linkCard}>
              <span className={styles.linkTopRow}>
                <span className={styles.linkIcon} aria-hidden="true">
                  <ContactIcon name={link.icon} />
                </span>
                <span className={styles.linkLabel}>{link.label}</span>
              </span>
              <span className={styles.linkValue}>{link.value}</span>
              {"detail" in link && link.detail ? (
                <span className={styles.linkDetail}>{link.detail}</span>
              ) : null}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}