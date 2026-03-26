import { cn } from "../../utils/cn";
import baseStyles from "../PortfolioBase.module.css";
import styles from "./ImageLightbox.module.css";

type ImageLightboxProps = {
  image: {
    alt: string;
    src: string;
  };
  onClose: () => void;
};

export function ImageLightbox({ image, onClose }: ImageLightboxProps) {
  return (
    <div className={styles.imageLightbox}>
      <button
        aria-label="背景を押して作品画像プレビューを閉じる"
        className={styles.imageLightboxBackdrop}
        onClick={onClose}
        type="button"
      />
      <dialog
        aria-label="作品画像プレビュー"
        aria-modal="true"
        className={cn(styles.imageLightboxDialog, baseStyles.panel)}
        open
      >
        <button
          aria-label="作品画像プレビューを閉じる"
          className={styles.imageLightboxClose}
          onClick={onClose}
          type="button"
        >
          X
        </button>
        <div className={styles.imageLightboxFrame}>
          <img
            alt={image.alt}
            className={styles.imageLightboxImage}
            src={image.src}
          />
        </div>
      </dialog>
    </div>
  );
}
