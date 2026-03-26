import { type CSSProperties, useEffect, useRef, useState } from "react";

import { useTypewriterMessage } from "../hooks/useTypewriterMessage";
import { getPortfolioMeters } from "../model/playerProfile";
import {
  locations,
  parallelStages,
  skyColorSlots,
  statusCards,
  systemMessages,
} from "../model/portfolioData";
import {
  type SkyLotteryBall,
  createSkyLotteryBall,
  createSkyLotteryBoard,
  drawSkyLotteryScene,
  stepSkyLotteryBall,
} from "../model/skyLottery";
import styles from "./PortfolioPage.module.css";
import { AchievementsSection } from "./components/AchievementsSection";
import { BackToHudButton } from "./components/BackToHudButton";
import { CadGallerySection } from "./components/CadGallerySection";
import {
  type ActiveCareerSelection,
  CareerTimelineSection,
} from "./components/CareerTimelineSection";
import { ContactSection } from "./components/ContactSection";
import { HeroSection } from "./components/HeroSection";
import { HobbiesSection } from "./components/HobbiesSection";
import { ImageLightbox } from "./components/ImageLightbox";
import { IntroSection } from "./components/IntroSection";
import { InventorySection } from "./components/InventorySection";
import { PastProjectsSection } from "./components/PastProjectsSection";
import {
  PortfolioBackground,
  type Star,
} from "./components/PortfolioBackground";
import { PortfolioFooter } from "./components/PortfolioFooter";
import { PortfolioHeader } from "./components/PortfolioHeader";
import { QuestSection } from "./components/QuestSection";
import { SkyLotteryModal } from "./components/SkyLotteryModal";
import { StackSection } from "./components/StackSection";

function createStars(count = 80): Star[] {
  return Array.from({ length: count }, () => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 4}s`,
    opacity: Number(Math.random().toFixed(2)),
  }));
}

export function PortfolioPage() {
  const [activeCareerSelection, setActiveCareerSelection] =
    useState<ActiveCareerSelection>({
      track: "main",
      index: 0,
    });
  const [meterAnimated, setMeterAnimated] = useState(false);
  const [showAllPastProjects, setShowAllPastProjects] = useState(false);
  const [showBackToHud, setShowBackToHud] = useState(false);
  const [activeProjectImage, setActiveProjectImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);
  const [stars] = useState<Star[]>(() => createStars());
  const [isSkyModalOpen, setIsSkyModalOpen] = useState(false);
  const [isSkyDrawing, setIsSkyDrawing] = useState(false);
  const [selectedSkySlot, setSelectedSkySlot] = useState(skyColorSlots[0]);
  const [skyBall, setSkyBall] = useState<SkyLotteryBall | null>(null);
  const [skyBoardSize, setSkyBoardSize] = useState({
    width: 640,
    height: 420,
  });
  const skyCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const skyBoardHostRef = useRef<HTMLDivElement | null>(null);
  const skyBallRef = useRef<SkyLotteryBall | null>(null);

  const typewriterMessage = useTypewriterMessage(systemMessages);

  useEffect(() => {
    const animationFrameId = window.requestAnimationFrame(() => {
      setMeterAnimated(true);
    });

    return () => window.cancelAnimationFrame(animationFrameId);
  }, []);

  useEffect(() => {
    const headerElement = document.getElementById("portfolio-hud");

    if (!headerElement) {
      return;
    }

    if (typeof IntersectionObserver !== "undefined") {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setShowBackToHud(!entry.isIntersecting);
        },
        {
          threshold: 0.15,
        },
      );

      observer.observe(headerElement);

      return () => observer.disconnect();
    }

    const syncHeaderVisibility = () => {
      const headerBounds = headerElement.getBoundingClientRect();
      setShowBackToHud(headerBounds.bottom <= 0);
    };

    syncHeaderVisibility();
    window.addEventListener("scroll", syncHeaderVisibility, { passive: true });

    return () => window.removeEventListener("scroll", syncHeaderVisibility);
  }, []);

  const isParallelSelected = activeCareerSelection.track === "parallel";
  const activeCareerItems = isParallelSelected ? parallelStages : locations;
  const activeCareerIndex = Math.min(
    activeCareerSelection.index,
    activeCareerItems.length - 1,
  );
  const activeCareerStage =
    activeCareerItems[activeCareerIndex] ?? locations[0];
  const heroMeters = getPortfolioMeters();
  const activeSkyBoard = createSkyLotteryBoard(
    skyBoardSize.width,
    skyBoardSize.height,
  );

  useEffect(() => {
    if (!isSkyModalOpen) {
      return;
    }

    const hostElement = skyBoardHostRef.current;

    if (!hostElement) {
      return;
    }

    const updateBoardSize = () => {
      const { width, height } = hostElement.getBoundingClientRect();
      const nextSize = {
        width: Math.max(320, Math.floor(width)),
        height: Math.max(320, Math.floor(height)),
      };

      setSkyBoardSize((currentSize) => {
        if (
          currentSize.width === nextSize.width &&
          currentSize.height === nextSize.height
        ) {
          return currentSize;
        }

        setIsSkyDrawing(false);
        skyBallRef.current = null;
        setSkyBall(null);
        return nextSize;
      });
    };

    updateBoardSize();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateBoardSize);
      return () => window.removeEventListener("resize", updateBoardSize);
    }

    const resizeObserver = new ResizeObserver(() => {
      updateBoardSize();
    });
    resizeObserver.observe(hostElement);

    return () => resizeObserver.disconnect();
  }, [isSkyModalOpen]);

  useEffect(() => {
    const canvasElement = skyCanvasRef.current;

    if (!canvasElement) {
      return;
    }

    let context: CanvasRenderingContext2D | null = null;

    try {
      context = canvasElement.getContext("2d");
    } catch {
      return;
    }

    if (!context) {
      return;
    }

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvasElement.width = activeSkyBoard.width * pixelRatio;
    canvasElement.height = activeSkyBoard.height * pixelRatio;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    drawSkyLotteryScene(
      context,
      activeSkyBoard,
      skyColorSlots,
      selectedSkySlot.id,
      skyBall,
    );
  }, [activeSkyBoard, selectedSkySlot.id, skyBall]);

  useEffect(() => {
    if (!isSkyDrawing || !skyBallRef.current) {
      return;
    }

    let animationFrameId = 0;
    let previousTimestamp = 0;
    const board = createSkyLotteryBoard(
      skyBoardSize.width,
      skyBoardSize.height,
    );

    const animate = (timestamp: number) => {
      if (!skyBallRef.current) {
        return;
      }

      const deltaMs =
        previousTimestamp === 0 ? 16.67 : timestamp - previousTimestamp;
      previousTimestamp = timestamp;

      const nextBall = stepSkyLotteryBall(skyBallRef.current, board, deltaMs);
      skyBallRef.current = nextBall;
      setSkyBall(nextBall);

      if (nextBall.settled) {
        const winningSlot =
          skyColorSlots[nextBall.slotIndex] ?? skyColorSlots[0];
        setSelectedSkySlot(winningSlot);
        setIsSkyDrawing(false);
        return;
      }

      animationFrameId = window.requestAnimationFrame(animate);
    };

    animationFrameId = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(animationFrameId);
  }, [isSkyDrawing, skyBoardSize.height, skyBoardSize.width]);

  const openSkyModal = () => {
    skyBallRef.current = null;
    setSkyBall(null);
    setIsSkyModalOpen(true);
  };

  const closeSkyModal = () => {
    if (isSkyDrawing) {
      return;
    }

    skyBallRef.current = null;
    setSkyBall(null);
    setIsSkyModalOpen(false);
  };

  const drawSkyColor = () => {
    const nextBall = createSkyLotteryBall(activeSkyBoard);
    skyBallRef.current = nextBall;
    setSkyBall(nextBall);
    setIsSkyDrawing(true);
  };

  const pageStyle = {
    "--theme-sky-top": selectedSkySlot.topHex,
    "--theme-sky-bottom": selectedSkySlot.bottomHex,
    "--theme-glow": `rgba(${selectedSkySlot.glowRgb}, 0.24)`,
    "--theme-haze": `rgba(${selectedSkySlot.glowRgb}, 0.14)`,
  } as CSSProperties;

  return (
    <div className={styles.page} style={pageStyle}>
      <PortfolioBackground stars={stars} />

      {activeProjectImage ? (
        <ImageLightbox
          image={activeProjectImage}
          onClose={() => setActiveProjectImage(null)}
        />
      ) : null}

      <SkyLotteryModal
        canvasRef={skyCanvasRef}
        hostRef={skyBoardHostRef}
        isDrawing={isSkyDrawing}
        isOpen={isSkyModalOpen}
        onClose={closeSkyModal}
        onDraw={drawSkyColor}
        selectedSkySlot={selectedSkySlot}
      />
      <BackToHudButton visible={showBackToHud} />

      <PortfolioHeader />

      <main>
        <HeroSection
          meterAnimated={meterAnimated}
          meters={heroMeters}
          onOpenSkyModal={openSkyModal}
          statusCards={statusCards}
          typewriterMessage={typewriterMessage}
        />
        <IntroSection />
        <CareerTimelineSection
          activeSelection={activeCareerSelection}
          activeStage={activeCareerStage}
          activeStageIndex={activeCareerIndex}
          activeTrackItems={activeCareerItems}
          locations={locations}
          onSelect={setActiveCareerSelection}
          parallelStages={parallelStages}
        />
        <QuestSection />
        <InventorySection />
        <StackSection />
        <PastProjectsSection
          onPreviewImage={setActiveProjectImage}
          onToggleShowAll={() => setShowAllPastProjects((current) => !current)}
          showAll={showAllPastProjects}
        />
        <CadGallerySection />
        <AchievementsSection />
        <HobbiesSection />
        <ContactSection />
      </main>

      <PortfolioFooter />
    </div>
  );
}
