import { useState } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import {
  TextInput,
  Button,
  Text,
  HelperText,
  Checkbox,
  useTheme,
} from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import { MaskedTextInput } from "react-native-mask-text";
import email from "react-native-email";
import axios from "axios";
import { Dropdown } from "react-native-element-dropdown";
import data from "../countryCodes";

const DB_URL =
  "https://form-test-task-rn-default-rtdb.europe-west1.firebasedatabase.app";

const signupSchema = Yup.object().shape({
  name: Yup.string()
    .required("Введите нормальное имя")
    .min(3, "Введите нормальное имя")
    .max(10, "Введите нормальное имя"),

  email: Yup.string()
    .required("Введите корректный емэйл")
    .min(10, "Введите корректный емэйл")
    .max(30, "Введите корректный емэйл")
    .test("test", "Введите корректный емэйл", (val) => {
      if (typeof val === "string") {
        return val.match(/@\w+\.\w+$/);
      }
    }),

  phone: Yup.string()
    .required("Введите корректный номер телефона")
    .min(8, "Введите корректный номер телефона")
    .max(18, "Введите корректный номер телефона"),
});

export const MyForm = () => {
  const theme = useTheme();
  const [checked, setChecked] = useState(true);
  const [countryCode, setCountryCode] = useState("+7");
  const [isFocus, setIsFocus] = useState(false);
  const { width } = useWindowDimensions();

  return (
    <Formik
      initialValues={{
        name: "",
        // name: "юзер",

        email: "",
        // email: "user@mail.com",

        phone: "",
        // phone: "123 456 78 90",

        countryCode,
      }}
      onSubmit={async ({ name, phone, email, countryCode }) => {
        let phoneNumber = countryCode + " " + phone;

        await axios.post(`${DB_URL}/users.json`, {
          name,
          email,
          phone: phoneNumber,
        });
        sendEmail(name, email, phoneNumber);
      }}
      validationSchema={signupSchema}
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
        initialValues,
      }) => (
        <View>
          <TextInput
            label="Имя"
            onChangeText={(val) =>
              /^[а-яА-Я]*$/.test(val) && setFieldValue("name", val)
            }
            onFocus={handleBlur("name")}
            value={values.name}
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
            mode="outlined"
            theme={{ roundness: 15 }}
            error={touched.email && errors.email ? true : false}
            keyboardType="email-address"
          />
          <HelperText type="error">{touched.email && errors.email}</HelperText>

          <View>
            <TextInput
              label="Телефон"
              onChangeText={handleChange("phone")}
              onFocus={handleBlur("phone")}
              value={values.phone}
              theme={{ roundness: 15 }}
              mode="outlined"
              error={touched.phone && errors.phone ? true : false}
              keyboardType="phone-pad"
              style={{
                paddingLeft: 100,
              }}
              render={(props) => (
                <MaskedTextInput
                  {...props}
                  mask="999 999 99 99 99 9"
                  defaultValue={initialValues.phone}
                />
              )}
            />

            <Dropdown
              data={data}
              maxHeight={250}
              renderItem={({ value, country }) => {
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingHorizontal: 10,
                      paddingVertical: 20,
                    }}
                  >
                    <Text style={{ fontSize: 16, width: "50%" }}>
                      {country}
                    </Text>
                    <Text style={{ fontSize: 16 }}>{value}</Text>
                  </View>
                );
              }}
              labelField="value"
              valueField="value"
              dropdownPosition="bottom"
              selectedTextProps={{
                numberOfLines: 1,
              }}
              autoScroll={false}
              activeColor="#333"
              style={{
                width: 90,
                position: "absolute",
                paddingLeft: 15,
                top: 17,
              }}
              selectedTextStyle={{
                color: theme.colors.disabled,
              }}
              containerStyle={{
                width: Math.min(width, 500) - 40,
                backgroundColor: theme.colors.background,
                elevation: 0,
                borderWidth: 1,
                borderColor:
                  errors.phone && touched.phone
                    ? theme.colors.error
                    : theme.colors.disabled,
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
                paddingBottom: 12,
                top: -35,
              }}
              value={countryCode}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={({ value }) => {
                setCountryCode(value);
                handleChange("countryCode")(value);
                setIsFocus(false);
              }}
            />

            <View //  Separator
              style={{
                position: "absolute",
                width: 10,
                height: 15,
                top: 29,
                left: 90,
                borderRightWidth: 1,
                borderRightColor: theme.colors.disabled,
              }}
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
            <Text style={[styles.text, { marginLeft: 20 }]}>
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

function sendEmail(name: string, mail: string, phone: string) {
  const to = "support@domen.ru";
  const body = "Имя - " + name + "\nТелефон - " + phone + "\nЕмэйл - " + mail;

  email(to, { subject: "Новая заявка", body });
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    marginTop: 10,
    marginHorizontal: 1,
  },
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
