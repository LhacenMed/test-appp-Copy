// Define a base palette for shared colors
const palette = {
  white: "#FFFFFF",
  black: "#000000",
  gray: {
    100: "#F5F5F5",
    200: "#E0E0E0",
    300: "#AEB5BB",
    400: "#757575",
    500: "#4A4A4A",
  },
  blue: "#1E88E5",
  red: "#E53935",
};

// Define light and dark themes using semantic tokens
export const lightTheme = {
  background: palette.white,
  text: palette.black,
  primary: "#45484A",
  secondary: palette.gray[300],
  surface: palette.gray[100],
  border: palette.gray[200],
  success: "#4CAF50",
  error: palette.red,
  link: palette.blue,
};

export const darkTheme = {
  background: "#121212",
  text: palette.white,
  primary: "#E0E0E0",
  secondary: palette.gray[400],
  surface: palette.gray[500],
  border: palette.gray[400],
  success: "#66BB6A",
  error: palette.red,
  link: palette.blue,
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};
