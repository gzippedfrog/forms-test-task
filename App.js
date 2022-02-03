import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { MyForm } from "./components/MyForm";
import { Provider as PaperProvider, DarkTheme } from "react-native-paper";

const theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#0063FF",
    error: "#DE494A",
    background: "#1F1F1F",
  },
};
export default function App() {
  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <StatusBar style="light" />
        <Text style={styles.heading}>Создать аккаунт</Text>
        <MyForm />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 10,
    backgroundColor: theme.colors.background,
  },
  heading: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 40,
    color: theme.colors.text,
  },
});
