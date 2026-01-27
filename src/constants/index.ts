// Constants for component behavior
export const CONSTANTS = {
  // Skill categories
  FLIP_THRESHOLDS: {
    TRIPLE_THRESHOLD_WOMENS: 2,
    TRIPLE_THRESHOLD_MENS: 5,
  },

  // Animation durations
  ANIMATION: {
    STALL_DURATION: 0.1,
    STALL_ROTATION: 0.1,
    KICKOUT_DURATION: 0.5,
    KICKOUT_ROTATION: 0.5,
  },

  // UI constraints
  UI: {
    MAX_ROUTINE_SKILLS: 10,
    MIN_SKILL_NAME_WIDTH: 140,
    MIN_STATS_WIDTH: 120,
    ICON_SIZE_SMALL: 16,
    ICON_SIZE_MEDIUM: 20,
  },

  // Scoring
  SCORING: {
    MIN_DIFFICULTY: 0.1,
    MAX_DIFFICULTY: 4.0,
    POSITION_MULTIPLIER: 0.1,
  },
} as const;

// Type for the constants to ensure type safety
export type ConstantsType = typeof CONSTANTS;
