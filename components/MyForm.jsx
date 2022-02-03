import { View, StyleSheet } from "react-native";
import {
  TextInput,
  Button,
  Text,
  HelperText,
  Checkbox,
} from "react-native-paper";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DropDown from "react-native-paper-dropdown";
import { useState } from "react";

const signupSchema = Yup.object().shape({
  name: Yup.string()
    .required("Введите нормальное имя")
    .test(
      "test",
      "Введите нормальное имя",
      (val) => typeof val === "string" && val.match(/^[а-яА-Я]{3,10}$/)
    ),

  email: Yup.string()
    .required("Введите корректный емэйл")
    .test(
      "test",
      "Введите корректный емэйл",
      (val) => typeof val === "string" && val.match(/@\w+\.\w+$/)
    ),

  phone: Yup.string()
    .required("Введите корректный номер телефона")
    .test(
      "test",
      "Введите корректный номер телефона",
      (val) => typeof val === "string" && val.match(/^\d{7,13}$/)
    ),
});

export const MyForm = () => {
  const [checked, setChecked] = useState(true);
  const [showDropDown, setShowDropDown] = useState(false);
  const [countryCode, setCountryCode] = useState("+7");
  const countryCodes = [
    {
      label: "+1 USA",
      value: "+1",
    },
    {
      label: "+7 Russia",
      value: "+7",
    },
    {
      label: "+42",
      value: "+42",
    },
  ];

  return (
    <Formik
      initialValues={{ name: "семен", email: "svalov@a.com", phone: "1234567" }}
      onSubmit={(values) => {
        console.log(values);
      }}
      validationSchema={signupSchema}
      validateOnMount
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
      }) => (
        <View>
          <TextInput
            label="Имя"
            onChangeText={handleChange("name")}
            onFocus={handleBlur("name")}
            value={values.name}
            style={styles.textInput}
            mode="outlined"
            error={touched.name && errors.name ? true : false}
          />
          <HelperText type="error">{touched.name && errors.name}</HelperText>

          <TextInput
            label="E-mail"
            onChangeText={handleChange("email")}
            onFocus={handleBlur("email")}
            value={values.email}
            style={styles.textInput}
            mode="outlined"
            error={touched.email && errors.email ? true : false}
            keyboardType="email-address"
          />
          <HelperText type="error">{touched.email && errors.email}</HelperText>

          <View style={styles.phoneInput}>
            <DropDown
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={countryCode}
              setValue={setCountryCode}
              list={countryCodes}
              mode={"outlined"}
              // dropDownStyle={{ width: "100%" }}
            />
            <TextInput
              onChangeText={handleChange("phone")}
              onFocus={handleBlur("phone")}
              value={values.phone}
              style={styles.textInput}
              mode="outlined"
              error={touched.phone && errors.phone ? true : false}
              keyboardType="phone-pad"
            />
          </View>
          <HelperText type="error">{touched.phone && errors.phone}</HelperText>

          <Button
            onPress={handleSubmit}
            mode="contained"
            uppercase={false}
            style={styles.button}
            labelStyle={styles.buttonLabel}
            disabled={checked && isValid ? false : true}
          >
            Далее
          </Button>

          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <Checkbox
              status={checked ? "checked" : "unchecked"}
              onPress={() => {
                setChecked(!checked);
              }}
            />
            <Text style={styles.text}>
              {"Регистрируясь, вы соглашаетесь с нашими "}
              <Text style={styles.textUnderlined}>Условиями использования</Text>
              {" и "}
              <Text style={styles.textUnderlined}>
                Политикой конфиденциальности
              </Text>
            </Text>
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  button: { borderRadius: 30, marginTop: 20 },
  buttonLabel: { fontSize: 20, lineHeight: 40 },
  phoneInput: {
    // flex: 1,
    // flexDirection: "row",
  },
  text: { color: "#8F8F8F" },
  textUnderlined: {
    color: "#8F8F8F",
    textDecorationLine: "underline",
  },
});
