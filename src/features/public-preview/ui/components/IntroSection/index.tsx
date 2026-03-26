import { cn } from "../../utils/cn";
import baseStyles from "../PortfolioBase.module.css";
import styles from "./IntroSection.module.css";

const introChips = [
  "Autonomous Mobility",
  "React / TypeScript",
  "Hardware / Circuit",
  "2D / 3D CAD",
  "Shopify",
];

export function IntroSection() {
  return (
    <section
      className={cn(baseStyles.section, baseStyles.sectionNarrow)}
      id="intro"
    >
      <div
        className={cn(baseStyles.panel, styles.storyPanel, baseStyles.reveal)}
      >
        <p className={baseStyles.storyPanelLabel}>PROLOGUE</p>
        <h2>ハードウェア開発とフロントエンド開発を横断してきたエンジニア</h2>
        <p>
          自動運転バス向けの車載機器、センサー、電気回路などのハードウェア開発からキャリアをスタートし、その後は
          React / TypeScript
          を中心としたフロントエンド開発へ領域を拡大。現場で動くものをつくる視点を軸に、UI実装、運用改善、品質改善、アーキテクチャ設計まで一貫して担当。
        </p>
        <div className={baseStyles.chipRow}>
          {introChips.map((chip) => (
            <span key={chip} className={baseStyles.chip}>
              {chip}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
