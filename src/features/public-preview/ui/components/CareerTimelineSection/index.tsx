import type { Location, ParallelStage } from "../../../model/portfolioData";
import { cn } from "../../utils/cn";
import baseStyles from "../PortfolioBase.module.css";
import styles from "./CareerTimelineSection.module.css";

export type ActiveCareerSelection = {
  track: "main" | "parallel";
  index: number;
};

type CareerTimelineSectionProps = {
  activeSelection: ActiveCareerSelection;
  activeStage: Location | ParallelStage;
  activeStageIndex: number;
  activeTrackItems: Array<Location | ParallelStage>;
  locations: Location[];
  parallelStages: ParallelStage[];
  onSelect: (selection: ActiveCareerSelection) => void;
};

export function CareerTimelineSection({
  activeSelection,
  activeStage,
  activeStageIndex,
  activeTrackItems,
  locations,
  onSelect,
  parallelStages,
}: CareerTimelineSectionProps) {
  return (
    <section className={baseStyles.section} id="PROGRESSION">
      <div
        className={cn(
          baseStyles.sectionHeading,
          baseStyles.reveal,
          styles.careerSectionHeading,
        )}
      >
        <p className={baseStyles.sectionHeadingEyebrow}>PROGRESSION</p>
        <h2 className={styles.careerSectionTitle}>Career Stages</h2>
        <p>
          年代ごとのキャリアフェーズを選択すると、当時の役割と取り組み内容を表示します。
        </p>
      </div>

      <div className={styles.worldGrid}>
        <div
          aria-label="PROGRESSION"
          className={cn(
            styles.worldTimeline,
            baseStyles.panel,
            baseStyles.reveal,
          )}
        >
          <ul className={styles.worldTimelineTrack}>
            {locations.map((location, index) => (
              <li key={location.title}>
                <button
                  aria-pressed={
                    activeSelection.track === "main" &&
                    activeSelection.index === index
                  }
                  className={cn(
                    styles.timelineNode,
                    activeSelection.track === "main" &&
                      activeSelection.index === index &&
                      styles.isActive,
                  )}
                  onClick={() => onSelect({ track: "main", index })}
                  type="button"
                >
                  <span aria-hidden="true" className={styles.timelineNodeDot} />
                  <span className={styles.timelineNodeLabel}>
                    {location.markerLabel}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className={styles.parallelRoute}>
            <div className={styles.parallelRouteHeader}>
              <p className={baseStyles.locationPanelEyebrow}>PARALLEL ROUTE</p>
              <p className={styles.parallelRouteHint}>
                side activities continuing from 2022
              </p>
            </div>

            <ul className={styles.parallelRouteTrack}>
              {parallelStages.map((stage, index) => (
                <li key={stage.title}>
                  <button
                    aria-label={`${stage.markerLabel} の Side Route を表示`}
                    aria-pressed={
                      activeSelection.track === "parallel" &&
                      activeSelection.index === index
                    }
                    className={cn(
                      styles.parallelDot,
                      activeSelection.track === "parallel" &&
                        activeSelection.index === index &&
                        styles.isActive,
                    )}
                    onClick={() => onSelect({ track: "parallel", index })}
                    type="button"
                  >
                    <span
                      aria-hidden="true"
                      className={styles.parallelDotNode}
                    />
                    <span className={styles.parallelDotLabel}>
                      {stage.markerLabel}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <article
          className={cn(
            baseStyles.panel,
            styles.locationPanel,
            baseStyles.reveal,
          )}
        >
          <div className={styles.locationPanelHeader}>
            <p className={baseStyles.locationPanelEyebrow}>{activeStage.era}</p>
            <span className={styles.locationPanelIndex}>
              {String(activeStageIndex + 1).padStart(2, "0")} /{" "}
              {String(activeTrackItems.length).padStart(2, "0")}
            </span>
          </div>
          <div className={styles.locationPanelBody}>
            <h3>{activeStage.title}</h3>
            <p>{activeStage.description}</p>
          </div>
          <ul className={styles.locationStats}>
            {activeStage.stats.map((stat) => (
              <li key={stat}>{stat}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
