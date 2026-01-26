import { Position } from "../models/SkillDefinition";
import type { SkillDefinition } from "../models/SkillDefinition";

/**
 * Display position names in a user-friendly way
 */
export function formatPositionDisplay(position: Position): string {
  if (position === Position.Straight) {
    return "Straight";
  }
  return position;
}

/**
 * Get category name based on flip count
 */
export function getFlipCategory(flips: number): string {
  if (flips < 0.5) {
    return "No Flips";
  } else if (flips >= 0.5 && flips < 1.5) {
    return "Single Flips";
  } else if (flips >= 1.5 && flips < 2.5) {
    return "Double Flips";
  } else if (flips >= 2.5 && flips < 3.5) {
    return "Triple Flips";
  } else if (flips >= 3.5 && flips < 4.5) {
    return "Quadruple Flips";
  } else {
    return `${flips} Flips`;
  }
}

/**
 * Group skills by flip category
 */
export function groupSkillsByFlips(skills: SkillDefinition[]): Record<string, SkillDefinition[]> {
  return skills.reduce((groups, skill) => {
    const category = getFlipCategory(skill.flips);
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(skill);
    return groups;
  }, {} as Record<string, SkillDefinition[]>);
}

/**
 * Sort flip categories in logical order
 */
export function sortFlipCategories(categories: [string, SkillDefinition[]][]): [string, SkillDefinition[]][] {
  return categories.sort(([a], [b]) => {
    const getFlipNumber = (category: string) => {
      if (category === "No Flips") return -1;
      if (category === "Single Flips") return 1;
      if (category === "Double Flips") return 2;
      if (category === "Triple Flips") return 3;
      if (category === "Quadruple Flips") return 4;
      // For categories like "5 Flips", "6 Flips", etc.
      const match = category.match(/^(\d+) Flips$/);
      return match ? parseInt(match[1]) : 999;
    };
    return getFlipNumber(a) - getFlipNumber(b);
  });
}