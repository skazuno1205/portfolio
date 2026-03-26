import { mainQuests, sideQuest } from "../../../model/portfolioData";
import { cn } from "../../utils/cn";
import baseStyles from "../PortfolioBase.module.css";
import styles from "./QuestSection.module.css";

export function QuestSection() {
  return (
    <section className={baseStyles.section} id="quests">
      <div className={cn(baseStyles.sectionHeading, baseStyles.reveal)}>
        <p className={baseStyles.sectionHeadingEyebrow}>QUEST LOG</p>
        <h2>Main Quests</h2>
        <p>本業で担当してきた主要案件ログ。</p>
      </div>

      <div className={styles.questGrid}>
        {mainQuests.map((quest) => (
          <article
            key={quest.title}
            className={cn(
              styles.questCard,
              baseStyles.panel,
              baseStyles.reveal,
            )}
          >
            <div className={styles.questCardHead}>
              <h3>{quest.title}</h3>
            </div>
            <p>{quest.description}</p>
            <div className={baseStyles.chipRow}>
              {quest.chips.map((chip) => (
                <span key={chip} className={baseStyles.chip}>
                  {chip}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div
        className={cn(
          baseStyles.sectionHeading,
          baseStyles.reveal,
          styles.sideQuestHeading,
        )}
      >
        <h2>SIDE QUEST</h2>
        <p>kutsulab 領域での担当ログと運営実績。</p>
      </div>

      <article
        className={cn(
          styles.questCard,
          styles.questCardSide,
          baseStyles.panel,
          baseStyles.reveal,
        )}
      >
        <div className={styles.questCardHead}>
          <h3>{sideQuest.title}</h3>
        </div>
        <p>{sideQuest.description}</p>
        <div className={baseStyles.chipRow}>
          {sideQuest.chips.map((chip) => (
            <span
              key={chip}
              className={cn(baseStyles.chip, baseStyles.chipSide)}
            >
              {chip}
            </span>
          ))}
        </div>
        <div className={styles.sideQuestLinks}>
          {sideQuest.links.map((link) => (
            <a
              key={link.href}
              className={styles.sideQuestLink}
              href={link.href}
              rel="noreferrer"
              target="_blank"
            >
              {link.title}
            </a>
          ))}
        </div>
      </article>
    </section>
  );
}
