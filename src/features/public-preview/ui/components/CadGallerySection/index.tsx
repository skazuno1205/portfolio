import { cadArtifacts } from "../../../model/portfolioData";
import { cn } from "../../utils/cn";
import baseStyles from "../PortfolioBase.module.css";
import styles from "./CadGallerySection.module.css";

export function CadGallerySection() {
  return (
    <section className={baseStyles.section} id="cad-lab">
      <div className={cn(baseStyles.sectionHeading, baseStyles.reveal)}>
        <p className={baseStyles.sectionHeadingEyebrow}>CAD WORKSHOP</p>
        <h2>3D CAD Gallery</h2>
        <p>立体を扱う設計ログと3D CADアーカイブ。</p>
      </div>

      <div className={styles.cadGrid}>
        {cadArtifacts.map((artifact) => (
          <article
            key={artifact.title}
            className={cn(styles.cadCard, baseStyles.panel, baseStyles.reveal)}
          >
            <div className={styles.cadCardViewer}>
              <model-viewer
                alt={artifact.alt}
                ar={false}
                autoplay
                camera-controls
                class={styles.cadCardModel}
                disable-pan
                exposure="1.05"
                interaction-prompt="none"
                loading="lazy"
                shadow-intensity="1"
                src={artifact.modelSrc}
                touch-action="pan-y"
              />
            </div>
            <div className={styles.cadCardBody}>
              <p className={baseStyles.questCardType}>{artifact.type}</p>
              <h3>{artifact.title}</h3>
              <p>{artifact.description}</p>
              <div className={baseStyles.chipRow}>
                {artifact.highlights.map((highlight) => (
                  <span key={highlight} className={baseStyles.chip}>
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
