import React from "react";
import { ScrollView, StatusBar, StyleSheet } from "react-native";
import { Provider as PaperProvider, Appbar } from "react-native-paper";
import SignUpForm from "./SignUpForm";
import theme from "./theme";

export default () => (
  <PaperProvider theme={theme}>
    <StatusBar backgroundColor={theme.colors.background} />
    <Appbar.Header style={styles.header}>
      <Appbar.BackAction />
    </Appbar.Header>
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={styles.container}
    >
      <SignUpForm />
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
    minHeight: 600
  },
  header: {
    backgroundColor: theme.colors.background
  }
});
