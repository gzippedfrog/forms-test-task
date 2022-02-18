import { DarkTheme } from "react-native-paper";

const theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#0063FF",
    error: "#DE494A",
    background: "#1F1F1F",
    disabled: "#8F8F8F",
  },
  roundness: 15,
};

export default theme;
