import { cn } from "../../utils/cn";
import styles from "./BackToHudButton.module.css";

type BackToHudButtonProps = {
  visible: boolean;
};

export function BackToHudButton({ visible }: BackToHudButtonProps) {
  if (!visible) {
    return null;
  }

  return (
    <button
      className={styles.backToHudButton}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      type="button"
    >
      <span aria-hidden="true" className={styles.backToHudCursor}>
        ▶
      </span>
      <span className={styles.backToHudLabel}>BACK TO HUD</span>
    </button>
  );
}
