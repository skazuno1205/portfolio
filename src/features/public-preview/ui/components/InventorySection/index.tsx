import { inventories } from "../../../model/portfolioData";
import { cn } from "../../utils/cn";
import baseStyles from "../PortfolioBase.module.css";
import styles from "./InventorySection.module.css";

export type EquipmentSlot = {
  iconSrc?: string;
  iconText: string;
  id: string;
  label: string;
  tone: "cyan" | "gold" | "lime" | "pink" | "violet";
};

const inventoryLoadouts: Record<string, EquipmentSlot[]> = {
  "Frontend Stack": [
    {
      id: "react",
      label: "React",
      iconSrc: "/images/inventory/frontend/react.svg",
      iconText: "R",
      tone: "cyan",
    },
    {
      id: "typescript",
      label: "TypeScript",
      iconSrc: "/images/inventory/frontend/typescript.png",
      iconText: "TS",
      tone: "violet",
    },
    {
      id: "cypress",
      label: "Cypress",
      iconSrc: "/images/inventory/frontend/cypress.png",
      iconText: "Cy",
      tone: "lime",
    },
    {
      id: "testing-library",
      label: "Testing Library",
      iconSrc: "/images/inventory/frontend/testing-library.png",
      iconText: "RTL",
      tone: "pink",
    },
    {
      id: "vite",
      label: "Vite",
      iconSrc: "/images/inventory/frontend/vite.png",
      iconText: "Vi",
      tone: "gold",
    },
    {
      id: "biome",
      label: "Biome",
      iconSrc: "/images/inventory/frontend/biome.png",
      iconText: "Bm",
      tone: "cyan",
    },
    {
      id: "eslint",
      label: "ESLint",
      iconSrc: "/images/inventory/frontend/eslint.png",
      iconText: "ES",
      tone: "violet",
    },
  ],
  "Hardware Gear": [
    {
      id: "fusion360",
      label: "Fusion360",
      iconSrc: "/images/inventory/hardware/fusion-360.svg",
      iconText: "F360",
      tone: "gold",
    },
    {
      id: "wiring",
      label: "電気配線",
      iconSrc: "/images/inventory/hardware/electric-wiring.svg",
      iconText: "WR",
      tone: "pink",
    },
    {
      id: "arduino",
      label: "Arduino",
      iconSrc: "/images/inventory/hardware/arduino-logo.svg",
      iconText: "A",
      tone: "lime",
    },
    {
      id: "raspberry-pi",
      label: "Raspberry Pi",
      iconSrc: "/images/inventory/hardware/raspberry-pi.png",
      iconText: "Pi",
      tone: "cyan",
    },
  ],
};

export function InventoryLoadout({ slots }: { slots: EquipmentSlot[] }) {
  return (
    <div className={styles.inventoryLoadout}>
      <div className={styles.inventorySlots}>
        {slots.map((slot) => (
          <button
            key={slot.id}
            aria-label={slot.label}
            className={cn(
              styles.inventorySlot,
              styles[
                `inventorySlot${slot.tone[0].toUpperCase()}${slot.tone.slice(1)}`
              ],
            )}
            title={slot.label}
            type="button"
          >
            {slot.iconSrc ? (
              <img
                alt=""
                aria-hidden="true"
                className={styles.inventorySlotImage}
                loading="lazy"
                src={slot.iconSrc}
              />
            ) : (
              <span className={styles.inventorySlotIcon}>{slot.iconText}</span>
            )}
            <span className={styles.inventorySlotLabel}>{slot.label}</span>
            <span className={styles.inventoryTooltip} role="presentation">
              {slot.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function InventorySection() {
  return (
    <section className={baseStyles.section} id="inventory">
      <div className={cn(baseStyles.sectionHeading, baseStyles.reveal)}>
        <p className={baseStyles.sectionHeadingEyebrow}>INVENTORY</p>
        <h2>Skills &amp; Equipment</h2>
        <p>フロントエンド、ハードウェア、CADを横断する装備一覧。</p>
      </div>

      <div className={styles.inventoryGrid}>
        {inventories.map((inventory) => (
          <article
            key={inventory.title}
            className={cn(
              styles.inventoryCard,
              baseStyles.panel,
              baseStyles.reveal,
            )}
          >
            <div className={styles.inventoryCardInner}>
              <div className={styles.inventoryCardFront}>
                <h3>{inventory.title}</h3>
                <ul>
                  {inventory.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.inventoryCardBack}>
                <InventoryLoadout
                  slots={inventoryLoadouts[inventory.title] ?? []}
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
