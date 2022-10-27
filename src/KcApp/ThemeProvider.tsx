
import {
  createTheme,
  ThemeOptions,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import { ReactNode } from "react";
import { palette } from "./styles/pallete";
import { typography } from "./styles/typography";

type Props = {
  children: ReactNode;
};

const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
};

export function ThemeContextProvider({ children }: Props) {
  

  const themeOptions: ThemeOptions = {
    palette: palette.light,
    typography: typography,
    breakpoints,
    shape: {
      borderRadius: 8,
    },
  };

  const theme = createTheme(themeOptions);

  return <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>;
}