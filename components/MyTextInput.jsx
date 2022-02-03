import { useState } from "react";
import { HelperText, TextInput } from "react-native-paper";

const MyTextInput = () => {
  const [text, setText] = useState("");

  const hasErrors = () => {
    return !text.includes("@");
  };

  return (
    <>
      <TextInput
        label="Имя"
        onChangeText={handleChange("email")}
        onBlur={handleBlur("email")}
        value={values.email}
        mode="outlined"
        style={styles.TextInput}
      />
      <HelperText type="error" visible={hasErrors()}>
        Email address is invalid!
      </HelperText>
    </>
  );
};

export default MyTextInput;
