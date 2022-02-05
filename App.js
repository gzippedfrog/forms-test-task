import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
} from "react-native";
import { MyForm } from "./components/MyForm";
import {
  Provider as PaperProvider,
  DarkTheme,
  Appbar,
} from "react-native-paper";

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
  const { width } = useWindowDimensions();

  return (
    <PaperProvider theme={theme}>
      <StatusBar style="light" />
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction />
      </Appbar.Header>
      <ScrollView
        style={{
          backgroundColor: theme.colors.background,
        }}
        contentContainerStyle={[
          styles.container,
          { width: Math.min(500, width) },
        ]}
      >
        <Text style={styles.heading}>Создать аккаунт</Text>
        <MyForm />
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignSelf: "center",
  },
  header: {
    backgroundColor: theme.colors.background,
    elevation: 0,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 50,
    color: theme.colors.text,
  },
});
