import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Typography,
  Stack,
  Paper,
  Chip,
  Button,
  IconButton
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DeleteIcon from "@mui/icons-material/Delete";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import type { SkillDefinition } from "../models/SkillDefinition";
import { formatPositionDisplay } from "../utils/skillUtils";

interface RoutineBuilderProps {
  routine: SkillDefinition[];
  onPlayRoutine: () => void;
  onClearRoutine: () => void;
  onRandomizeRoutine: () => void;
  skillDefinitionsLength: number;
}

export default function RoutineBuilder({
  routine,
  onPlayRoutine,
  onClearRoutine,
  onRandomizeRoutine,
  skillDefinitionsLength
}: RoutineBuilderProps) {
  return (
    <Card sx={{ flex: 1, minHeight: 300 }}>
      <CardHeader
        title="Routine Builder"
        titleTypographyProps={{ variant: 'h6', fontWeight: 600 }}
        action={
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<ShuffleIcon />}
              onClick={onRandomizeRoutine}
              disabled={skillDefinitionsLength === 0}
            >
              Randomize
            </Button>
            {routine.length > 0 && (
              <>
                <IconButton 
                  onClick={onPlayRoutine} 
                  color="primary"
                  size="large"
                >
                  <PlayArrowIcon />
                </IconButton>
                <IconButton 
                  onClick={onClearRoutine} 
                  color="error"
                  size="large"
                >
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </Stack>
        }
      />
      <Divider />
      <CardContent>
        {routine.length === 0 ? (
          <Typography color="text.secondary" sx={{ fontStyle: 'italic' }}>
            No skills in routine. Add skills from the library below.
          </Typography>
        ) : (
          <Stack spacing={1}>
            {routine.map((def, idx) => (
              <Paper 
                key={idx} 
                variant="outlined" 
                sx={{ p: 2, borderRadius: 1 }}
              >
                <Typography variant="body1">
                  <strong>{idx + 1}.</strong> {def.name}
                </Typography>
                <Chip 
                  label={formatPositionDisplay(def.position)} 
                  size="small" 
                  color="primary" 
                  variant="outlined"
                  sx={{ mt: 1 }}
                />
              </Paper>
            ))}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}