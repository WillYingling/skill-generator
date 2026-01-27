import type { Skill } from "../components/AthleteController";
import { type SkillDefinition, Position } from "../models/SkillDefinition";
import { positions } from "../components/Simulator";
import type { AthletePosition } from "../components/Athlete";

export interface RenderProperties {
  stallDuration: number; // delay before entering position
  stallRotation: number; // rotation during stall

  kickoutDuration: number; // duration of kickout phase
  kickoutRotation: number; // rotation during kickout phase
}

/**
 * Convert a SkillDefinition to a timed Skill for animation
 */
export function skillDefinitionToSkill(
  definition: SkillDefinition,
  renderProps: RenderProperties,
  cumulativeTwist: number = 0,
): Skill {
  const keyframes: AthletePosition[] = [];
  const timestamps: number[] = [];

  // Determine rotation direction based on skill type
  let rotationMultiplier = definition.isBackSkill ? -1 : 1;
  
  // If cumulative twist results in athlete facing backward (odd multiples of 0.5), invert rotation
  const halfTwists = Math.floor(cumulativeTwist * 2);
  if (halfTwists % 2 !== 0) {
    rotationMultiplier *= -1;
  }

  // Start position
  keyframes.push({
    rotation: 0,
    twist: 0,
    joints: positions.StraightArmsUp,
  });
  timestamps.push(0);

  if (definition.position !== Position.Straight) {
    // End of stall phase
    keyframes.push({
      rotation: renderProps.stallRotation * rotationMultiplier,
      twist: 0,
      joints: positions.StraightArmsUp,
    });
    timestamps.push(renderProps.stallDuration);

    let positionRotation =
      (definition.flips -
      renderProps.kickoutRotation -
      renderProps.stallRotation) * rotationMultiplier;
    let positionDuration =
      1 - renderProps.kickoutDuration - renderProps.stallDuration;
    let positionSpeed = positionRotation / positionDuration;

    let positionTransitionRotation = 0.18;
    // Start of position phase
    keyframes.push({
      rotation: (renderProps.stallRotation + positionTransitionRotation) * rotationMultiplier,
      twist: 0,
      joints: positions[definition.position],
    });
    timestamps.push(renderProps.stallDuration + Math.abs(positionTransitionRotation) / Math.abs(positionSpeed));


    // Start of kickout
    let kickoutRotation = (definition.flips - renderProps.kickoutRotation) * rotationMultiplier;
    let kickoutTransitionRotation = 0.18 * rotationMultiplier;
    keyframes.push({
      rotation: kickoutRotation - kickoutTransitionRotation,
      twist: 0,
      joints: positions[definition.position],
    });
    timestamps.push(
      1 -
        renderProps.kickoutDuration -
        Math.abs(kickoutTransitionRotation) / Math.abs(positionSpeed),
    );

    // End of kickout
    keyframes.push({
      rotation: kickoutRotation,
      twist: definition.twists / (1 / renderProps.kickoutDuration),
      joints: positions.StraightArmsUp,
    });
    timestamps.push(1 - renderProps.kickoutDuration);
  }

  // End position
  keyframes.push({
    rotation: definition.flips * rotationMultiplier,
    twist: definition.twists,
    joints: positions.StraightArmsUp,
  });
  timestamps.push(1.0);

  return {
    positions: keyframes,
    timestamps: timestamps,
  };
}
