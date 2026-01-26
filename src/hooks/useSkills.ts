import { useState, useEffect } from "react";
import type { SkillDefinition } from "../models/SkillDefinition";
import { Position } from "../models/SkillDefinition";

/**
 * Hook for managing skill definitions loaded from JSON
 */
export function useSkillDefinitions() {
  const [skillDefinitions, setSkillDefinitions] = useState<SkillDefinition[]>([]);
  const [selectedPositions, setSelectedPositions] = useState<Record<string, Position | undefined>>({});

  // Load skill definitions from JSON file
  useEffect(() => {
    fetch("/skills.json")
      .then((response) => response.json())
      .then((data: SkillDefinition[]) => {
        setSkillDefinitions(data);
        
        // Initialize selected positions with default positions
        const defaultPositions: Record<string, Position> = {};
        data.forEach((skill) => {
          defaultPositions[skill.name] = skill.position;
        });
        setSelectedPositions(defaultPositions);
        
        console.log("Loaded skill definitions:", data);
      })
      .catch((error) => console.error("Error loading skills:", error));
  }, []);

  const selectPosition = (skillName: string, position: Position) => {
    setSelectedPositions(prev => ({
      ...prev,
      [skillName]: prev[skillName] === position ? undefined : position
    }));
  };

  return {
    skillDefinitions,
    selectedPositions,
    selectPosition
  };
}

/**
 * Hook for managing routine state
 */
export function useRoutine(skillDefinitions: SkillDefinition[]) {
  const [routine, setRoutine] = useState<SkillDefinition[]>([]);

  const addToRoutine = (definition: SkillDefinition, selectedPosition?: Position) => {
    if (selectedPosition) {
      const modifiedDef = { ...definition, position: selectedPosition };
      setRoutine([...routine, modifiedDef]);
    } else {
      setRoutine([...routine, definition]);
    }
  };

  const clearRoutine = () => {
    setRoutine([]);
  };

  const randomizeRoutine = () => {
    if (skillDefinitions.length === 0) return;
    
    const shuffled = [...skillDefinitions].sort(() => Math.random() - 0.5);
    const selectedSkills = shuffled.slice(0, Math.min(10, skillDefinitions.length));
    
    // Create skills with random positions from their possible positions
    const randomSkills = selectedSkills.map((skill) => {
      if (skill.possiblePositions && skill.possiblePositions.length > 0) {
        // Randomly select from possible positions
        const randomPosition = skill.possiblePositions[
          Math.floor(Math.random() * skill.possiblePositions.length)
        ];
        return { ...skill, position: randomPosition };
      } else {
        // Use default position if no possible positions available
        return skill;
      }
    });
    
    setRoutine(randomSkills);
  };

  return {
    routine,
    addToRoutine,
    clearRoutine,
    randomizeRoutine
  };
}