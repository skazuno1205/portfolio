import { useEffect, useRef, useState } from "react";

import { cadArtifacts } from "../../../model/portfolioData";
import { cn } from "../../utils/cn";
import baseStyles from "../PortfolioBase.module.css";
import styles from "./CadGallerySection.module.css";

export function CadGallerySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isModelViewerReady, setIsModelViewerReady] = useState(false);

  useEffect(() => {
    if (isModelViewerReady) {
      return;
    }

    const sectionElement = sectionRef.current;

    if (!sectionElement) {
      return;
    }

    const loadModelViewer = () => {
      void import("@google/model-viewer").then(() => {
        setIsModelViewerReady(true);
      });
    };

    if (typeof IntersectionObserver === "undefined") {
      loadModelViewer();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        observer.disconnect();
        loadModelViewer();
      },
      {
        rootMargin: "240px 0px",
      },
    );

    observer.observe(sectionElement);

    return () => observer.disconnect();
  }, [isModelViewerReady]);

  return (
    <section className={baseStyles.section} id="cad-lab" ref={sectionRef}>
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
              {isModelViewerReady ? (
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
              ) : (
                <div
                  aria-label={`${artifact.title} 3D preview loading`}
                  className={styles.cadCardModelFallback}
                />
              )}
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
