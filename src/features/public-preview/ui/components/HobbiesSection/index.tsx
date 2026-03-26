import { hobbies } from "../../../model/portfolioData";
import { cn } from "../../utils/cn";
import baseStyles from "../PortfolioBase.module.css";
import styles from "./HobbiesSection.module.css";

export function HobbiesSection() {
  return (
    <section className={baseStyles.section} id="hobbies">
      <div className={cn(baseStyles.sectionHeading, baseStyles.reveal)}>
        <p className={baseStyles.sectionHeadingEyebrow}>SIDE LIFE</p>
        <h2>Hobby Log</h2>
        <p>仕事外の観測対象と手作業ログ。</p>
      </div>

      <div className={styles.hobbyGrid}>
        {hobbies.map((hobby) => (
          <article
            key={hobby.title}
            className={cn(
              styles.hobbyCard,
              baseStyles.panel,
              baseStyles.reveal,
            )}
          >
            <div aria-hidden="true" className={styles.hobbyCardIconWrap}>
              <span
                className={cn(
                  baseStyles.materialSymbolsOutlined,
                  styles.hobbyCardIcon,
                )}
              >
                {hobby.iconName}
              </span>
            </div>
            <div className={styles.hobbyCardBody}>
              <h3>{hobby.title}</h3>
              <p>{hobby.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
