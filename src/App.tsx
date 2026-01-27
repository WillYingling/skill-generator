import {
  Stack,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
} from "@mui/material";
import SportsGymnasticsIcon from "@mui/icons-material/SportsGymnastics";
import RoutineBuilder from "./components/RoutineBuilder";
import SkillLibrary from "./components/SkillLibrary";
import SimulatorModal from "./components/SimulatorModal";
import type { SkillDefinition } from "./models/SkillDefinition";
import { useSkillDefinitions, useRoutine } from "./hooks/useSkills";
import { useSimulator } from "./hooks/useSimulator";

function App() {
  const { skillDefinitions, selectedPositions, selectPosition } =
    useSkillDefinitions();
  const {
    routine,
    addToRoutine,
    clearRoutine,
    randomizeRoutine,
    removeSkill,
    moveSkill,
  } = useRoutine(skillDefinitions);
  const { skills, simulatorOpen, playSkill, playRoutine, closeSimulator } =
    useSimulator();

  const handlePlaySkill = (definition: SkillDefinition) => {
    const selectedPos = selectedPositions[definition.name];
    playSkill(definition, selectedPos);
  };

  const handleAddToRoutine = (definition: SkillDefinition) => {
    const selectedPos = selectedPositions[definition.name];
    addToRoutine(definition, selectedPos);
  };

  const handlePlayRoutine = () => {
    playRoutine(routine);
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: "100vh", bgcolor: "grey.50" }}>
      <AppBar position="static" elevation={1} sx={{ bgcolor: "primary.main" }}>
        <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
          <SportsGymnasticsIcon sx={{ mr: 2 }} />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 600 }}
          >
            Trampoline Skill Generator
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 3, px: { xs: 2, sm: 3 } }}>
        <Stack spacing={4} alignItems="center">
          <Box sx={{ width: "100%", maxWidth: 1400 }}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={3}
              sx={{ width: "100%" }}
            >
              <RoutineBuilder
                routine={routine}
                onPlayRoutine={handlePlayRoutine}
                onClearRoutine={clearRoutine}
                onRandomizeRoutine={randomizeRoutine}
                onRemoveSkill={removeSkill}
                onMoveSkill={moveSkill}
                skillDefinitionsLength={skillDefinitions.length}
              />

              <SkillLibrary
                skillDefinitions={skillDefinitions}
                selectedPositions={selectedPositions}
                onPlaySkill={handlePlaySkill}
                onAddToRoutine={handleAddToRoutine}
                onSelectPosition={selectPosition}
              />
            </Stack>
          </Box>
        </Stack>
      </Container>

      <SimulatorModal
        open={simulatorOpen}
        skills={skills}
        onClose={closeSimulator}
      />
    </Box>
  );
}

export default App;
