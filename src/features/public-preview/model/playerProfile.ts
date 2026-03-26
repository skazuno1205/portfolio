import type { Meter } from "./portfolioData";

const playerBirthDate = {
  year: 1993,
  month: 12,
  day: 1,
} as const;

function createBirthdayDate(year: number) {
  return new Date(year, playerBirthDate.month - 1, playerBirthDate.day);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
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
  const currentYear = referenceDate.getFullYear();
  const birthdayThisYear = createBirthdayDate(currentYear);
  const previousBirthday =
    referenceDate >= birthdayThisYear
      ? birthdayThisYear
      : createBirthdayDate(currentYear - 1);
  const nextBirthday =
    referenceDate >= birthdayThisYear
      ? createBirthdayDate(currentYear + 1)
      : birthdayThisYear;
  const totalDuration = nextBirthday.getTime() - previousBirthday.getTime();
  const elapsedDuration = referenceDate.getTime() - previousBirthday.getTime();
  const progress = clamp(elapsedDuration / totalDuration, 0, 1);

  return {
    nextBirthdayLabel: "UNTIL DEC",
    progressPercent: Math.round(progress * 100),
  };
}

export function getPortfolioMeters(referenceDate = new Date()): Meter[] {
  const birthdayProgress = getBirthdayProgress(referenceDate);

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
    },
  ];
}
