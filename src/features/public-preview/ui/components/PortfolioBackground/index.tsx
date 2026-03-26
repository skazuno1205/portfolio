import styles from "./PortfolioBackground.module.css";

export type Star = {
  left: string;
  top: string;
  animationDelay: string;
  opacity: number;
};

type PortfolioBackgroundProps = {
  stars: Star[];
};

export function PortfolioBackground({ stars }: PortfolioBackgroundProps) {
  return (
    <>
      <div aria-hidden="true" className={styles.pageNoise} />
      <div aria-hidden="true" className={styles.scanlines} />
      <div aria-hidden="true" className={styles.stars}>
        {stars.map((star) => (
          <span
            key={`${star.left}-${star.top}-${star.animationDelay}`}
            className={styles.star}
            style={{
              left: star.left,
              top: star.top,
              animationDelay: star.animationDelay,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>
      <div aria-hidden="true" className={styles.aurora} />
    </>
  );
}
