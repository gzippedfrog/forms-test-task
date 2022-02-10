import React from "react";
import { ScrollView, StatusBar, StyleSheet, Text } from "react-native";
import {
  Provider as PaperProvider,
  DarkTheme,
  Appbar,
} from "react-native-paper";
import MyForm from "./components/MyForm";

let theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#0063FF",
    error: "#DE494A",
    background: "#1F1F1F",
    disabled: "#8F8F8F",
  },
};

export default () => (
  <PaperProvider theme={theme}>
    <StatusBar backgroundColor={theme.colors.background} />
    <Appbar.Header style={styles.header}>
      <Appbar.BackAction />
    </Appbar.Header>
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={[styles.container]}
    >
      <Text style={styles.heading}>Создать аккаунт</Text>
      <MyForm />
    </ScrollView>
  </PaperProvider>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignSelf: "center",
    width: "100%",
    maxWidth: 400,
    minHeight: 600,
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
