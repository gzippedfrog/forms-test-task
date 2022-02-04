import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
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
      <StatusBar style="light" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          // flex: 1,
          // alignItems: "stretch",
          // justifyContent: "center",
          // alignContent: "center",
          // alignSelf: "stretch",
          // maxWidth: 500,
          paddingTop: 50,
          paddingHorizontal: 20,
          // backgroundColor: "purple",
        }}
      >
        <Text style={styles.heading}>Создать аккаунт</Text>
        <MyForm />
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  heading: {
    // paddingTop: 100,
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 50,
    color: theme.colors.text,
  },
});
