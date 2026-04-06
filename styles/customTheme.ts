import { MD3LightTheme as DefaultTheme, useTheme } from "react-native-paper";
export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
  container: {
    // Paletas de colores del funcionalismo aleman https://www.presentandcorrect.com/blogs/blog/rams-palette
    primary: "#af2e1b",
    secondary: "#cc6324",
    tertiary: "#3b4b59",
    deep: "#bfa07a",
  },
};

export type AppTheme = typeof theme;

export const useAppTheme = () => useTheme<AppTheme>();
