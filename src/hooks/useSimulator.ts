import { useState } from "react";
import type { Skill } from "../components/AthleteController";
import type { SkillDefinition } from "../models/SkillDefinition";
import { Position } from "../models/SkillDefinition";
import { skillDefinitionToSkill } from "../utils/skillConverter";

/**
 * Hook for managing simulator state and actions
 */
export function useSimulator() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [simulatorOpen, setSimulatorOpen] = useState(false);
  const [renderProperties] = useState({
    stallDuration: 0.1,
    stallRotation: 0.1,
    kickoutDuration: 0.5,
    kickoutRotation: 0.5,
  });

  const playSkill = (definition: SkillDefinition, selectedPosition?: Position) => {
    let skillToPlay = definition;
    if (selectedPosition) {
      skillToPlay = { ...definition, position: selectedPosition };
    }
    
    const skill = skillDefinitionToSkill(skillToPlay, renderProperties);
    setSkills([skill]);
    setSimulatorOpen(true);
  };

  const playRoutine = (routine: SkillDefinition[]) => {
    if (routine.length > 0) {
      const animatedSkills = routine.map((def) =>
        skillDefinitionToSkill(def, renderProperties),
      );
      setSkills(animatedSkills);
      setSimulatorOpen(true);
    }
  };

  const closeSimulator = () => {
    setSimulatorOpen(false);
    setSkills([]);
  };

  return {
    skills,
    simulatorOpen,
    playSkill,
    playRoutine,
    closeSimulator
  };
}