import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Typography,
  Stack,
  Paper,
  Chip,
  Box,
  IconButton,
  ButtonGroup,
  Button
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import type { SkillDefinition } from "../models/SkillDefinition";
import { Position } from "../models/SkillDefinition";
import { groupSkillsByFlips, sortFlipCategories, formatPositionDisplay } from "../utils/skillUtils";

interface SkillLibraryProps {
  skillDefinitions: SkillDefinition[];
  selectedPositions: Record<string, Position | undefined>;
  onPlaySkill: (definition: SkillDefinition) => void;
  onAddToRoutine: (definition: SkillDefinition) => void;
  onSelectPosition: (skillName: string, position: Position) => void;
}

export default function SkillLibrary({
  skillDefinitions,
  selectedPositions,
  onPlaySkill,
  onAddToRoutine,
  onSelectPosition
}: SkillLibraryProps) {
  return (
    <Card sx={{ flex: 2, minHeight: 300 }}>
      <CardHeader
        title="Skill Library"
        titleTypographyProps={{ variant: 'h6', fontWeight: 600 }}
        subheader={`${skillDefinitions.length} skills available`}
      />
      <Divider />
      <CardContent>
        {skillDefinitions.length === 0 ? (
          <Typography color="text.secondary">
            Loading skills...
          </Typography>
        ) : (
          <Stack spacing={3}>
            {sortFlipCategories(Object.entries(groupSkillsByFlips(skillDefinitions)))
              .map(([category, skills]) => (
                <Box key={category}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      mb: 2, 
                      pb: 1, 
                      borderBottom: '2px solid',
                      borderColor: 'primary.main',
                      color: 'primary.main',
                      fontWeight: 600
                    }}
                  >
                    {category} ({skills.length})
                  </Typography>
                  <Stack spacing={2}>
                    {skills.map((def, idx) => (
                      <Paper 
                        key={`${category}-${idx}`} 
                        variant="outlined" 
                        sx={{ p: 2, borderRadius: 2 }}
                      >
                        <Stack 
                          direction="row" 
                          alignItems="center" 
                          spacing={2}
                          flexWrap="wrap"
                        >
                          <Stack direction="row" spacing={1}>
                            <IconButton
                              size="small"
                              onClick={() => onPlaySkill(def)}
                              color="primary"
                              sx={{ bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' } }}
                            >
                              <PlayArrowIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => onAddToRoutine(def)}
                              color="success"
                              sx={{ bgcolor: 'success.main', color: 'white', '&:hover': { bgcolor: 'success.dark' } }}
                            >
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </Stack>
                          
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="body1" fontWeight={500}>
                              {def.name}
                            </Typography>
                            <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                              <Chip 
                                label={`${def.flips} flips`} 
                                size="small" 
                                color="secondary" 
                                variant="outlined"
                              />
                              <Chip 
                                label={`${def.twists} twists`} 
                                size="small" 
                                color="secondary" 
                                variant="outlined"
                              />
                            </Stack>
                          </Box>
                          
                          {def.possiblePositions && def.possiblePositions.length > 1 && (
                            <ButtonGroup size="small" variant="outlined">
                              {def.possiblePositions.map((pos) => {
                                const isSelected = selectedPositions[def.name] === pos;
                                return (
                                  <Button
                                    key={pos}
                                    onClick={() => onSelectPosition(def.name, pos)}
                                    variant={isSelected ? "contained" : "outlined"}
                                    color={isSelected ? "primary" : "inherit"}
                                    sx={{ minWidth: 60 }}
                                  >
                                    {formatPositionDisplay(pos)}
                                  </Button>
                                );
                              })}
                            </ButtonGroup>
                          )}
                        </Stack>
                      </Paper>
                    ))}
                  </Stack>
                </Box>
              ))
            }
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}