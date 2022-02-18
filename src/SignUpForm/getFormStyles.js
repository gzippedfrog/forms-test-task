import { StyleSheet } from "react-native";

const getFormStyles = (errors, touched, colors, width) =>
  StyleSheet.create({
    heading: {
      fontSize: 30,
      fontWeight: "bold",
      marginVertical: 50
    },
    phoneTextInput: {
      paddingLeft: 100,
      width: "100%"
    },
    phoneInputDropdownOpen: {
      width: "100%",
      position: "absolute",
      height: 15,
      top: 49,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      backgroundColor: colors.background,
      borderColor:
        touched.phoneNumber && errors.phoneNumber
          ? colors.error
          : colors.disabled
    },
    phoneInputSeparator: {
      position: "absolute",
      height: 24,
      top: 23,
      left: 100,
      borderRightWidth: 1,
      borderRightColor: "#555"
    },
    dropdownContainer: {
      width: Math.min(width, 400) - 40,
      backgroundColor: colors.background,
      borderWidth: 1,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
      paddingBottom: 15,
      top: -2,
      borderColor:
        touched.phoneNumber && errors.phoneNumber
          ? colors.error
          : colors.disabled
    },
    dropdown: {
      position: "absolute",
      width: 90,
      paddingLeft: 15,
      top: 6,
      height: 58,
      color: colors.disabled
    },
    dropdownItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 15
    },
    dropdownItemTextLeft: {
      fontSize: 16,
      width: "70%"
    },
    dropdownItemTextRight: {
      fontSize: 16
    },
    dropdownSelectedText: {
      color: colors.disabled
    },
    button: {
      borderRadius: 999,
      marginVertical: 10
    },
    buttonLabel: {
      fontSize: 20,
      lineHeight: 40
    },
    checkboxContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 15
    },
    checkbox: {
      borderRadius: 5,
      borderWidth: 1,
      marginRight: 20
    },
    text: {
      flex: 1,
      flexWrap: "wrap",
      color: colors.disabled,
      textAlignVertical: "center"
    },
    textUnderlined: {
      color: colors.disabled,
      textDecorationLine: "underline"
    }
  });

export default getFormStyles;
