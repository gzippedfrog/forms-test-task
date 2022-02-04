import { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  TextInput,
  Button,
  Text,
  HelperText,
  Checkbox,
  useTheme,
} from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import { Formik } from "formik";
import * as Yup from "yup";
import { MaskedTextInput } from "react-native-mask-text";
import email from "react-native-email";

const signupSchema = Yup.object().shape({
  name: Yup.string()
    .required("Введите нормальное имя")
    .min(3, "Введите нормальное имя")
    .max(10, "Введите нормальное имя"),

  email: Yup.string()
    .required("Введите корректный емэйл")
    .min(10, "Введите корректный емэйл")
    .max(30, "Введите корректный емэйл")
    .test(
      "test",
      "Введите корректный емэйл",
      (val) => typeof val === "string" && val.match(/@\w+\.\w+$/)
    ),

  phone: Yup.string()
    .required("Введите корректный номер телефона")
    .min(7, "Введите корректный номер телефона")
    .max(13, "Введите корректный номер телефона"),
});

export const MyForm = () => {
  const theme = useTheme();
  const [showDropDown, setShowDropDown] = useState(false);
  const [checked, setChecked] = useState(true);
  const [countryCode, setCountryCode] = useState("+7");
  const countryCodes = [
    {
      label: "+1",
      value: "+1",
    },
    {
      label: "+7",
      value: "+7",
    },
    {
      label: "+42",
      value: "+42",
    },
  ];

  return (
    <Formik
      initialValues={{
        name: "юзер",
        email: "user@mail.com",
        phone: "1234567",
        countryCode,
      }}
      onSubmit={({ name, phone, email, countryCode }) => {
        sendEmail(name, email, countryCode + " " + phone);
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
        setFieldValue,
      }) => (
        <View style={styles.container}>
          <TextInput
            label="Имя"
            onChangeText={(val) =>
              /^[а-яА-Я]*$/.test(val) && setFieldValue("name", val)
            }
            onFocus={handleBlur("name")}
            value={values.name}
            style={styles.textInput}
            mode="outlined"
            theme={{ roundness: 15 }}
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
            theme={{ roundness: 15 }}
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
              theme={{ ...theme, roundness: 15 }}
            />
            <TextInput
              onChangeText={handleChange("phone")}
              onFocus={handleBlur("phone")}
              value={values.phone}
              theme={{ roundness: 15 }}
              mode="outlined"
              error={touched.phone && errors.phone ? true : false}
              keyboardType="phone-pad"
              render={(props) => (
                <MaskedTextInput {...props} mask="999 999 99 99" />
              )}
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

function sendEmail(name, mail, phone) {
  const to = "support@domen.ru";
  const body = "Имя - " + name + "\nТелефон - " + phone + "\nЕмэйл - " + mail;

  email(to, { subject: "Новая заявка", body });
}

const styles = StyleSheet.create({
  button: { borderRadius: 30, marginTop: 20 },
  buttonLabel: { fontSize: 20, lineHeight: 40 },
  text: {
    flex: 1,
    flexWrap: "wrap",
    color: "#8F8F8F",
    textAlignVertical: "center",
  },
  textUnderlined: {
    color: "#8F8F8F",
    textDecorationLine: "underline",
  },
});
