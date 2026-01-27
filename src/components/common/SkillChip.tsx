import { Chip, type ChipProps } from "@mui/material";
import { commonStyles, designTokens } from "../../theme/theme";

interface SkillChipProps extends Omit<ChipProps, "size" | "variant"> {
  variant?:
    | "flips"
    | "twists"
    | "back"
    | "difficulty"
    | "selected"
    | "unselected";
  size?: "small" | "medium";
}

export const SkillChip = ({
  variant = "difficulty",
  size = "small",
  sx,
  ...props
}: SkillChipProps) => {
  const getVariantStyles = () => {
    const baseStyles = {
      ...commonStyles.chip[size],
      border: "1px solid",
    };

    switch (variant) {
      case "flips":
        return {
          ...baseStyles,
          bgcolor: "primary.light",
          color: "primary.contrastText",
          borderColor: "primary.main",
        };
      case "twists":
        return {
          ...baseStyles,
          bgcolor: "secondary.light",
          color: "secondary.contrastText",
          borderColor: "secondary.main",
        };
      case "back":
        return {
          ...baseStyles,
          bgcolor: "warning.light",
          color: "warning.contrastText",
          borderColor: "warning.main",
        };
      case "selected":
        return {
          ...baseStyles,
          bgcolor: designTokens.chipColors.selected.background,
          color: designTokens.chipColors.selected.text,
          borderColor: designTokens.chipColors.selected.border,
          fontWeight: 600,
          boxShadow: `0 0 0 2px ${designTokens.chipColors.selected.glow}`,
          transform: "scale(1.05)",
        };
      case "unselected":
        return {
          ...baseStyles,
          bgcolor: designTokens.chipColors.unselected.background,
          color: designTokens.chipColors.unselected.text,
          borderColor: designTokens.chipColors.unselected.border,
          "&:hover": {
            bgcolor: designTokens.chipColors.unselected.hover.background,
            color: designTokens.chipColors.unselected.hover.text,
          },
        };
      case "difficulty":
      default:
        return {
          ...baseStyles,
          bgcolor: "primary.main",
          color: "primary.contrastText",
          borderColor: "primary.dark",
          fontWeight: 600,
        };
    }
  };

  return (
    <Chip
      size="small"
      sx={{
        ...getVariantStyles(),
        ...sx,
      }}
      {...props}
    />
  );
};
