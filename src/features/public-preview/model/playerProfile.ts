import type { Meter } from "./portfolioData";

const playerBirthDate = {
  year: 1993,
  month: 12,
  day: 5,
} as const;

function createBirthdayDate(year: number) {
  return new Date(year, playerBirthDate.month - 1, playerBirthDate.day);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function createCareerExp(referenceDate: Date) {
  const currentLevel = getCurrentAge(referenceDate);
  const totalExp = 365;
  const currentExp = getElapsedDaysSincePreviousBirthday(referenceDate);

  return {
    levelLabel: `LV.${currentLevel}`,
    progressLabel: `EXP ${currentExp} / ${totalExp}`,
    nextLevelLabel: `NEXT LEVEL IN ${totalExp - currentExp} EXP`,
  };
}

export function getCurrentAge(referenceDate = new Date()) {
  const currentYear = referenceDate.getFullYear();
  const birthdayThisYear = createBirthdayDate(currentYear);
  const hasHadBirthdayThisYear = referenceDate >= birthdayThisYear;

  return hasHadBirthdayThisYear
    ? currentYear - playerBirthDate.year
    : currentYear - playerBirthDate.year - 1;
}

export function getBirthdayProgress(referenceDate = new Date()) {
  const elapsedDays = getElapsedDaysSincePreviousBirthday(referenceDate);
  const progress = clamp(elapsedDays / 365, 0, 1);

  return {
    nextBirthdayLabel: "UNTIL DEC",
    progressPercent: Math.round(progress * 100),
  };
}

function getElapsedDaysSincePreviousBirthday(referenceDate: Date) {
  const currentYear = referenceDate.getFullYear();
  const birthdayThisYear = createBirthdayDate(currentYear);
  const previousBirthday =
    referenceDate >= birthdayThisYear
      ? birthdayThisYear
      : createBirthdayDate(currentYear - 1);

  return Math.floor(
    (referenceDate.getTime() - previousBirthday.getTime()) /
      (1000 * 60 * 60 * 24),
  );
}

export function getPortfolioMeters(referenceDate = new Date()): Meter[] {
  const birthdayProgress = getBirthdayProgress(referenceDate);
  const careerExp = createCareerExp(referenceDate);

  return [
    {
      label: "BUILD TIME",
      valueLabel: "10H",
      width: 84,
      fillClassName: "hpFill",
    },
    {
      label: "EXP / CAREER",
      valueLabel: birthdayProgress.nextBirthdayLabel,
      width: birthdayProgress.progressPercent,
      fillClassName: "expFill",
      levelLabel: careerExp.levelLabel,
      progressLabel: careerExp.progressLabel,
      nextLevelLabel: careerExp.nextLevelLabel,
    },
  ];
}
