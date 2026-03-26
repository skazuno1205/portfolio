import type { CSSProperties, RefObject } from "react";

import type { SkyColorSlot } from "../../../model/portfolioData";
import { cn } from "../../utils/cn";
import baseStyles from "../PortfolioBase.module.css";
import styles from "./SkyLotteryModal.module.css";

type SkyLotteryModalProps = {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  hostRef: RefObject<HTMLDivElement | null>;
  isDrawing: boolean;
  isOpen: boolean;
  selectedSkySlot: SkyColorSlot;
  onClose: () => void;
  onDraw: () => void;
};

export function SkyLotteryModal({
  canvasRef,
  hostRef,
  isDrawing,
  isOpen,
  onClose,
  onDraw,
  selectedSkySlot,
}: SkyLotteryModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.skyModal}>
      <button
        aria-label="背景を押して sky 抽選モーダルを閉じる"
        className={styles.skyModalBackdrop}
        disabled={isDrawing}
        onClick={onClose}
        type="button"
      />
      <dialog
        aria-label="Sky color lottery"
        aria-modal="true"
        className={cn(styles.skyModalDialog, baseStyles.panel)}
        open
      >
        <button
          aria-label="sky 抽選モーダルを閉じる"
          className={styles.skyModalClose}
          disabled={isDrawing}
          onClick={onClose}
          type="button"
        >
          X
        </button>
        <div className={styles.skyModalContent}>
          <div className={styles.skyModalCopy}>
            <p className={baseStyles.systemLabel}>SKY COLOR LOTTERY</p>
            <h2>空の色を抽選</h2>
            <p className={styles.skyModalDescription}>
              ボールの着地点で空の色が決まります。
            </p>
          </div>

          <div aria-label="sky color board" className={styles.skyBoard}>
            <div className={styles.skyBoardFrame} ref={hostRef}>
              <canvas
                aria-label="sky color physics board"
                className={styles.skyBoardCanvas}
                ref={canvasRef}
              />
            </div>
          </div>

          <div
            className={cn(
              baseStyles.panel,
              baseStyles.panelInner,
              styles.skyModalResult,
            )}
          >
            <div>
              <p className={styles.skyModalResultLabel}>SELECTED SKY</p>
              <strong>{selectedSkySlot.label.toUpperCase()}</strong>
            </div>
            <div className={styles.skyModalResultSwatchWrap}>
              <span
                aria-hidden="true"
                className={styles.skyModalResultSwatch}
                style={
                  {
                    "--swatch-color": selectedSkySlot.swatchHex,
                  } as CSSProperties
                }
              />
              <code>{selectedSkySlot.swatchHex}</code>
            </div>
          </div>

          <div className={styles.skyModalActions}>
            <button
              className={baseStyles.pixelBtn}
              disabled={isDrawing}
              onClick={onDraw}
              type="button"
            >
              DROP BALL
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
