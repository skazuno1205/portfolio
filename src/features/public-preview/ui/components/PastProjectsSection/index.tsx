import { type CSSProperties, useEffect, useState } from "react";

import type { PastProject } from "../../../model/portfolioData";
import { pastProjects } from "../../../model/portfolioData";
import { cn } from "../../utils/cn";
import baseStyles from "../PortfolioBase.module.css";
import styles from "./PastProjectsSection.module.css";
import { TrollTowerBattleProjectCard } from "./TrollTowerBattleProjectCard";

type PastProjectsSectionProps = {
  onPreviewImage: (image: { alt: string; src: string }) => void;
  showAll: boolean;
  onToggleShowAll: () => void;
};

type SpaceCatSprite = {
  animationClassName: string;
  durationMs: number;
  id: string;
  rotation: string;
  scale: number;
  src: string;
  startX: string;
  startY: string;
};

export const catImageSources = [
  "/images/cat/cat_01.png",
  "/images/cat/cat_02.png",
  "/images/cat/cat_03.png",
  "/images/cat/cat_04.png",
  "/images/cat/cat_05.png",
  "/images/cat/cat_06.png",
  "/images/cat/cat_07.png",
  "/images/cat/cat_08.png",
  "/images/cat/cat_09.png",
  "/images/cat/cat_10.png",
  "/images/cat/cat_11.png",
  "/images/cat/cat_12.png",
] as const;

export function readTrollTowerBattleBest(currentWindow: Window | undefined) {
  if (!currentWindow) {
    return "BEST --";
  }

  const savedBest = currentWindow.localStorage.getItem("trollTowerBattleBest");
  const parsedBest = Number(savedBest);

  if (!savedBest || !Number.isFinite(parsedBest) || parsedBest < 0) {
    return "BEST --";
  }

  return `BEST ${Math.floor(parsedBest)}`;
}

export function createSpaceCatSprites(
  currentWindow: Window | undefined,
  spriteFactory: (index: number) => SpaceCatSprite = createSpaceCatSprite,
) {
  if (!currentWindow) {
    return [];
  }

  const prefersReducedMotion =
    typeof currentWindow.matchMedia === "function" &&
    currentWindow.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const maxCats = currentWindow.innerWidth < 640 ? 2 : 3;
  const catCount = prefersReducedMotion
    ? 1
    : 1 + Math.floor(Math.random() * maxCats);

  return Array.from({ length: catCount }, (_, index) => spriteFactory(index));
}

export function PastProjectsSection({
  onPreviewImage,
  onToggleShowAll,
  showAll,
}: PastProjectsSectionProps) {
  const [trollTowerBattleBest, setTrollTowerBattleBest] = useState("BEST --");
  const [spaceCatSprites, setSpaceCatSprites] = useState<SpaceCatSprite[]>([]);
  const visiblePastProjects = showAll ? pastProjects : pastProjects.slice(0, 4);
  const hasMorePastProjects = pastProjects.length > 4;

  useEffect(() => {
    setTrollTowerBattleBest(
      readTrollTowerBattleBest(
        typeof window === "undefined" ? undefined : window,
      ),
    );
  }, []);

  const summonSpaceCats = () => {
    const nextSprites = createSpaceCatSprites(
      typeof window === "undefined" ? undefined : window,
    );

    setSpaceCatSprites((currentSprites) =>
      [...currentSprites, ...nextSprites].slice(-6),
    );
  };

  return (
    <section
      className={cn(baseStyles.section, baseStyles.sectionNarrow)}
      id="game-project"
    >
      <div aria-hidden="true" className={styles.spaceCatOverlay}>
        {spaceCatSprites.map((sprite) => (
          <img
            key={sprite.id}
            alt=""
            className={cn(styles.spaceCatSprite, sprite.animationClassName)}
            onAnimationEnd={() =>
              setSpaceCatSprites((currentSprites) =>
                currentSprites.filter(
                  (currentSprite) => currentSprite.id !== sprite.id,
                ),
              )
            }
            src={sprite.src}
            style={
              {
                "--space-cat-duration": `${sprite.durationMs}ms`,
                "--space-cat-rotation": sprite.rotation,
                "--space-cat-scale": String(sprite.scale),
                "--space-cat-start-x": sprite.startX,
                "--space-cat-start-y": sprite.startY,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <div className={cn(baseStyles.sectionHeading, baseStyles.reveal)}>
        <p className={baseStyles.sectionHeadingEyebrow}>PAST WORKS</p>
        <h2>Past Project Archive</h2>
        <p>最近作った作品一覧</p>
      </div>

      <div className={styles.projectList}>
        {visiblePastProjects.map((project) =>
          project.title === "トロールタワーバトル" ? (
            <TrollTowerBattleProjectCard
              key={project.title}
              project={project}
              trollTowerBattleBest={trollTowerBattleBest}
            />
          ) : (
            <PastProjectCard
              key={project.title}
              onSummonSpaceCats={summonSpaceCats}
              onPreviewImage={onPreviewImage}
              project={project}
            />
          ),
        )}
      </div>

      {hasMorePastProjects ? (
        <div className={styles.projectListActions}>
          <button
            className={cn(
              baseStyles.pixelBtn,
              baseStyles.pixelBtnGhost,
              styles.moreButton,
            )}
            onClick={onToggleShowAll}
            type="button"
          >
            <span aria-hidden="true" className={styles.moreButtonCursor}>
              ▶
            </span>
            <span className={styles.moreButtonLabel}>
              {showAll ? "CLOSE ARCHIVE" : "SCROLL TO CONTINUE"}
            </span>
          </button>
        </div>
      ) : null}
    </section>
  );
}

type PastProjectCardProps = {
  onSummonSpaceCats: () => void;
  onPreviewImage: (image: { alt: string; src: string }) => void;
  project: PastProject;
};

function PastProjectCard({
  onSummonSpaceCats,
  onPreviewImage,
  project,
}: PastProjectCardProps) {
  const previewImageSrc = project.opensPreview ? project.imageSrc : undefined;
  const isSpaceCatProject = project.title === "宇宙猫召喚装置";

  return (
    <article
      className={cn(styles.projectCard, baseStyles.panel, baseStyles.reveal)}
    >
      {project.imageSrc ? (
        <div className={styles.projectCardMedia}>
          <img
            alt={project.imageAlt ?? project.title}
            className={styles.projectCardImage}
            loading="lazy"
            src={project.imageSrc}
          />
        </div>
      ) : null}
      <div className={styles.projectCardContent}>
        <div className={styles.projectCardBody}>
          <p className={baseStyles.sectionHeadingEyebrow}>{project.eyebrow}</p>
          <h3>
            {isSpaceCatProject ? (
              <button
                className={styles.projectTitleTrigger}
                onClick={onSummonSpaceCats}
                type="button"
              >
                {project.title}
              </button>
            ) : (
              project.title
            )}
          </h3>
          <p className={styles.projectCardSubtitle}>{project.subtitle}</p>
          <p className={styles.projectCardDescription}>{project.description}</p>
        </div>
        <div className={styles.projectActions}>
          {previewImageSrc ? (
            <button
              className={cn(
                baseStyles.pixelBtn,
                baseStyles.pixelBtnPreview,
                styles.projectAction,
              )}
              onClick={() =>
                onPreviewImage({
                  src: previewImageSrc,
                  alt: project.imageAlt ?? project.title,
                })
              }
              type="button"
            >
              {project.ctaLabel}
            </button>
          ) : (
            <>
              <a
                className={cn(baseStyles.pixelBtn, styles.projectAction)}
                href={project.href}
                rel="noreferrer"
                target="_blank"
              >
                {project.ctaLabel}
              </a>
            </>
          )}
          {project.secondaryLinks?.map((link) => (
            <a
              key={link.href}
              className={cn(
                baseStyles.pixelBtn,
                baseStyles.pixelBtnGhost,
                styles.projectAction,
              )}
              href={link.href}
              rel="noreferrer"
              target="_blank"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

export function createSpaceCatSprite(index: number): SpaceCatSprite {
  const direction =
    spaceCatDirections[Math.floor(Math.random() * spaceCatDirections.length)];
  const imageSrc =
    catImageSources[Math.floor(Math.random() * catImageSources.length)] ??
    catImageSources[0];

  return {
    animationClassName: styles[direction.animationClassName],
    durationMs: 1200 + Math.round(Math.random() * 700),
    id: `space-cat-${Date.now()}-${index}-${Math.round(Math.random() * 9999)}`,
    rotation: `${-12 + Math.random() * 24}deg`,
    scale: 0.82 + Math.random() * 0.45,
    src: imageSrc,
    startX: direction.startX,
    startY: direction.startY(),
  };
}

const spaceCatDirections = [
  {
    animationClassName: "spaceCatFlyLeft",
    startX: "108vw",
    startY: () => `${12 + Math.random() * 62}vh`,
  },
  {
    animationClassName: "spaceCatFlyRight",
    startX: "-16vw",
    startY: () => `${10 + Math.random() * 68}vh`,
  },
  {
    animationClassName: "spaceCatFlyDownLeft",
    startX: "108vw",
    startY: () => `${-12 + Math.random() * 18}vh`,
  },
  {
    animationClassName: "spaceCatFlyDownRight",
    startX: "-18vw",
    startY: () => `${-10 + Math.random() * 22}vh`,
  },
  {
    animationClassName: "spaceCatFlyUpLeft",
    startX: "108vw",
    startY: () => `${76 + Math.random() * 20}vh`,
  },
  {
    animationClassName: "spaceCatFlyUpRight",
    startX: "-18vw",
    startY: () => `${76 + Math.random() * 18}vh`,
  },
] as const;
