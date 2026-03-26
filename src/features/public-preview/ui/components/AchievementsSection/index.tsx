import { trophies } from "../../../model/portfolioData";
import { cn } from "../../utils/cn";
import baseStyles from "../PortfolioBase.module.css";
import styles from "./AchievementsSection.module.css";

export function AchievementsSection() {
  return (
    <section className={baseStyles.section} id="achievements">
      <div className={cn(baseStyles.sectionHeading, baseStyles.reveal)}>
        <p className={baseStyles.sectionHeadingEyebrow}>ACHIEVEMENTS</p>
        <h2>Trophy Room</h2>
        <p>ハードウェア・IoT・生活デザイン領域の受賞記録。</p>
      </div>

      <div className={styles.trophyList}>
        {trophies.map((trophy) => (
          <article
            key={`${trophy.year}-${trophy.title}`}
            className={cn(styles.trophy, baseStyles.panel, baseStyles.reveal)}
          >
            <span className={styles.trophyYear}>{trophy.year}</span>
            <div>
              <h3>{trophy.title}</h3>
              <p>{trophy.description}</p>
              <a
                className={styles.trophyLink}
                href={trophy.href}
                rel="noreferrer"
                target="_blank"
              >
                {trophy.linkLabel}
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
