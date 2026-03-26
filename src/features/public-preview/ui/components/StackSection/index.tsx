import {
  developmentBoardCategories,
  techStackCategories,
} from "../../../model/portfolioData";
import { cn } from "../../utils/cn";
import baseStyles from "../PortfolioBase.module.css";
import styles from "./StackSection.module.css";

type StackPanelProps = {
  items: Array<{ items: string[]; title: string }>;
  title: string;
};

function StackPanel({ items, title }: StackPanelProps) {
  return (
    <details
      className={cn(styles.stackPanel, baseStyles.panel, baseStyles.reveal)}
    >
      <summary className={styles.stackPanelSummary}>
        <span className={styles.stackPanelTitle}>{title}</span>
        <span className={styles.stackPanelHint}>click to expand</span>
      </summary>

      <div className={styles.stackPanelContent}>
        <div className={styles.stackPanelGrid}>
          {items.map((category) => (
            <section key={category.title} className={styles.stackPanelCategory}>
              <h3>{category.title}</h3>
              <div className={baseStyles.chipRow}>
                {category.items.map((item) => (
                  <span key={item} className={baseStyles.chip}>
                    {item}
                  </span>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </details>
  );
}

export function StackSection() {
  return (
    <section
      className={cn(baseStyles.section, baseStyles.sectionNarrow)}
      id="tech-stack"
    >
      <div className={cn(baseStyles.sectionHeading, baseStyles.reveal)}>
        <p className={baseStyles.sectionHeadingEyebrow}>TECH STACK</p>
        <h2>Detailed Stack</h2>
        <p>業務で扱った技術とツールの分野別ログ。</p>
      </div>

      <StackPanel items={techStackCategories} title="Open Detailed Stack" />
      <StackPanel
        items={developmentBoardCategories}
        title="Open Development Boards"
      />
    </section>
  );
}
