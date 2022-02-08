import { useState } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import {
  TextInput,
  Button,
  Text,
  HelperText,
  useTheme,
} from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import { MaskedTextInput } from "react-native-mask-text";
import axios from "axios";
import { Dropdown } from "react-native-element-dropdown";
import data from "../countryCodes";
import { composeAsync } from "expo-mail-composer";
import Checkbox from "react-native-ui-lib/checkbox";

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
    .test(
      "test",
      "Введите корректный емэйл",
      (val) => typeof val === "string" && /@\w+\.\w+$/.test(val)
    ),

  phoneNumber: Yup.string()
    .required("Введите корректный номер телефона")
    .min(8, "Введите корректный номер телефона")
    .max(18, "Введите корректный номер телефона"),
});

export const MyForm = () => {
  const [checked, setChecked] = useState(true);
  const [isFocus, setIsFocus] = useState(false);

  const theme = useTheme();
  const { width } = useWindowDimensions();

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        countryCode: "+7",
        phoneNumber: "",

        // name: "юзер",
        // email: "user@mail.com",
        // countryCode: "+7",
        // phoneNumber: "123 456 78 90",
      }}
      onSubmit={async ({ name, email, countryCode, phoneNumber }) => {
        const phoneWithCountryCode = countryCode + " " + phoneNumber;

        await axios.post(`${DB_URL}/users.json`, {
          name,
          email,
          phone: phoneWithCountryCode,
        });

        composeAsync({
          subject: "Новая заявка",
          recipients: ["support@domen.ru"],
          body:
            "Имя - " +
            name +
            "\nТелефон - " +
            phoneWithCountryCode +
            "\nЕмэйл - " +
            email,
        });
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
              onChangeText={handleChange("phoneNumber")}
              onFocus={handleBlur("phoneNumber")}
              value={values.phoneNumber}
              theme={{ roundness: 15 }}
              mode="outlined"
              error={touched.phoneNumber && errors.phoneNumber ? true : false}
              keyboardType="phone-pad"
              style={{
                paddingLeft: 100,
              }}
              render={(props) => (
                <MaskedTextInput
                  {...props}
                  mask="999 999 99 99 99 9"
                  defaultValue={initialValues.phoneNumber}
                />
              )}
            />

            <Dropdown
              data={data}
              maxHeight={250}
              renderItem={({ value, country }) => {
                return (
                  <View style={styles.dropdownItem}>
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
              style={styles.dropdown}
              selectedTextStyle={{
                color: theme.colors.disabled,
              }}
              containerStyle={{
                width: Math.min(width, 500) - 40,
                backgroundColor: theme.colors.background,
                elevation: 0,
                borderWidth: 1,
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
                paddingBottom: 12,
                top: -35,
                borderColor:
                  errors.phoneNumber && touched.phoneNumber
                    ? theme.colors.error
                    : theme.colors.disabled,
              }}
              value={values.countryCode}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={({ value }) => {
                handleChange("countryCode")(value);
                setIsFocus(false);
              }}
            />

            {/* Separator */}
            <View
              style={[
                styles.separator,
                {
                  borderRightColor: theme.colors.disabled,
                },
              ]}
            />
          </View>

          <HelperText type="error">
            {touched.phoneNumber && errors.phoneNumber}
          </HelperText>

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
              value={checked}
              onValueChange={setChecked}
              color={theme.colors.disabled}
              iconColor={theme.colors.disabled}
              style={{ borderRadius: 5, top: 5, borderWidth: 1 }}
              outline={true}
            />

            <Text style={[styles.text]}>
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
    marginLeft: 15,
  },
  textUnderlined: {
    color: "#8F8F8F",
    textDecorationLine: "underline",
  },
  separator: {
    position: "absolute",
    width: 10,
    height: 15,
    top: 29,
    left: 90,
    borderRightWidth: 1,
  },
  dropdown: {
    width: 90,
    position: "absolute",
    paddingLeft: 15,
    top: 17,
  },
  dropdownItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
});
