import { useEffect, useState } from "react";

import { getCurrentAge } from "../../../model/playerProfile";
import { cn } from "../../utils/cn";
import baseStyles from "../PortfolioBase.module.css";
import styles from "./PortfolioHeader.module.css";

const commandItems = [
  { href: "#PROGRESSION", label: "PROGRESSION" },
  { href: "#quests", label: "Quests" },
  { href: "#inventory", label: "Inventory" },
  { href: "#tech-stack", label: "Stack" },
  { href: "#game-project", label: "Works" },
  { href: "#hobbies", label: "Hobbies" },
  { href: "#cad-lab", label: "CAD" },
] as const;

export function getMatchedCommandHref(currentHash: string) {
  return commandItems.find((item) => item.href === currentHash)?.href;
}

export function getCurrentBrowserWindow() {
  return typeof window === "undefined" ? undefined : window;
}

export function moveToWorld(
  currentWindow: Window | undefined,
  currentDocument: Document,
  setActiveHref: (href: (typeof commandItems)[number]["href"]) => void,
) {
  setActiveHref("#PROGRESSION");

  if (!currentWindow) {
    return;
  }

  currentWindow.location.hash = "PROGRESSION";
  currentDocument
    .getElementById("PROGRESSION")
    ?.scrollIntoView({ behavior: "smooth" });
}

export function attachHashchangeSync(
  currentWindow: Window | undefined,
  setActiveHref: (href: (typeof commandItems)[number]["href"]) => void,
) {
  if (!currentWindow) {
    return;
  }

  const syncActiveCommand = () => {
    const matchedCommand = getMatchedCommandHref(currentWindow.location.hash);

    if (matchedCommand) {
      setActiveHref(matchedCommand);
    }
  };

  syncActiveCommand();
  currentWindow.addEventListener("hashchange", syncActiveCommand);

  return () => {
    currentWindow.removeEventListener("hashchange", syncActiveCommand);
  };
}

export function PortfolioHeader() {
  const [activeHref, setActiveHref] = useState<
    (typeof commandItems)[number]["href"]
  >(commandItems[0].href);
  const currentAge = getCurrentAge();

  useEffect(() => {
    return attachHashchangeSync(getCurrentBrowserWindow(), setActiveHref);
  }, []);

  return (
    <header className={styles.topbar} id="portfolio-hud">
      <div className={cn(styles.playerPanel, baseStyles.panel)}>
        <button
          className={styles.playerCore}
          onClick={() =>
            moveToWorld(getCurrentBrowserWindow(), document, setActiveHref)
          }
          type="button"
        >
          <span className={styles.playerBadge}>
            <img
              alt=""
              aria-hidden="true"
              className={styles.playerBadgeImage}
              src="/images/projects/sk.png"
            />
          </span>
          <span className={styles.playerIdentity}>
            <span className={styles.playerName}>Shota Kazuno</span>
            <span className={styles.playerClass}>
              Class: Frontend / Hardwere
            </span>
          </span>
        </button>

        <div className={styles.playerStatus}>
          <div className={styles.playerStatusRow}>
            <span>Lv. {currentAge}</span>
            <span>STATUS: ACTIVE</span>
          </div>
          <div
            aria-hidden="true"
            className={styles.hpGauge}
            role="presentation"
          >
            <span className={styles.hpGaugeFill} />
          </div>
          <div className={styles.playerStatusRow}>
            <span>HP 824 / 999</span>
          </div>
        </div>
      </div>

      <div className={cn(styles.commandPanel, baseStyles.panel)}>
        <div className={styles.commandPanelHeader}>
          <div>
            <p className={baseStyles.sectionHeadingEyebrow}>COMMAND HUD</p>
            <p className={styles.commandPanelHint}>Select the next route.</p>
          </div>
          <a className={styles.systemLink} href="#save-point">
            <span aria-hidden="true" className={styles.commandCursor}>
              ▶
            </span>
            <span>SAVE POINT</span>
          </a>
        </div>

        <nav aria-label="メインナビゲーション" className={styles.commandGrid}>
          {commandItems.map((item) => {
            const isActive = item.href === activeHref;

            return (
              <a
                key={item.href}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  styles.commandLink,
                  isActive && styles.commandLinkActive,
                )}
                href={item.href}
                onClick={() => setActiveHref(item.href)}
              >
                <span aria-hidden="true" className={styles.commandCursor}>
                  ▶
                </span>
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
