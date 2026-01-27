import { IconButton, type IconButtonProps } from "@mui/material";
import type { ReactNode } from "react";
import { commonStyles } from "../../theme/theme";

interface ActionIconButtonProps extends Omit<IconButtonProps, "size"> {
  variant?: "primary" | "success" | "error" | "warning";
  size?: "small" | "medium";
  children: ReactNode;
}

export const ActionIconButton = ({
  variant = "primary",
  size = "small",
  children,
  sx,
  ...props
}: ActionIconButtonProps) => {
  const getVariantStyles = () => {
    const baseStyles = {
      color: "white",
      ...commonStyles.iconButton[size],
    };

    switch (variant) {
      case "success":
        return {
          ...baseStyles,
          bgcolor: "success.main",
          "&:hover": { bgcolor: "success.dark" },
        };
      case "error":
        return {
          ...baseStyles,
          bgcolor: "error.main",
          "&:hover": { bgcolor: "error.dark" },
        };
      case "warning":
        return {
          ...baseStyles,
          bgcolor: "warning.main",
          "&:hover": { bgcolor: "warning.dark" },
        };
      default:
        return {
          ...baseStyles,
          bgcolor: "primary.main",
          "&:hover": { bgcolor: "primary.dark" },
        };
    }
  };

  return (
    <IconButton
      sx={{
        ...getVariantStyles(),
        ...sx,
      }}
      {...props}
    >
      {children}
    </IconButton>
  );
};
