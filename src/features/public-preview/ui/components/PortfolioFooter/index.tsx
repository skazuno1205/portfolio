import styles from "./PortfolioFooter.module.css";

export function PortfolioFooter() {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Shota Kazuno Portfolio</p>
    </footer>
  );
}
