import React, { useState } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import {
  TextInput,
  Button,
  Text,
  HelperText,
  useTheme,
} from "react-native-paper";
import { Checkbox } from "react-native-ui-lib";
import { Dropdown } from "react-native-element-dropdown";
import { MaskedTextInput, MaskedTextInputProps } from "react-native-mask-text";
import { openComposer } from "react-native-email-link";
import { Formik } from "formik";
import * as Yup from "yup";
import data from "./countryCodes";

const DB_URL =
  "https://form-test-task-rn-default-rtdb.europe-west1.firebasedatabase.app/users.json";

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
      (val) => !!val && /@\w+\.\w+$/.test(val)
    ),

  phoneNumber: Yup.string()
    .required("Введите корректный номер телефона")
    .min(8, "Введите корректный номер телефона")
    .max(18, "Введите корректный номер телефона"),
});

export default () => {
  const [checked, setChecked] = useState(true);
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  const { colors } = useTheme();
  const { width } = useWindowDimensions();

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        phoneNumber: "",

        // name: "юзер",
        // email: "user@mail.com",
        // phoneNumber: "123 456 78 90",
        countryCode: "+7",
      }}
      onSubmit={async ({ name, email, countryCode, phoneNumber }) => {
        const phoneWithCountryCode = countryCode + " " + phoneNumber;

        await fetch(DB_URL, {
          method: "POST",
          body: JSON.stringify({
            name,
            email,
            phone: phoneWithCountryCode,
          }),
        });

        openComposer({
          to: "support@domen.ru",
          subject: "Новая заявка",
          body:
            `Имя - ${name}\n` +
            `Телефон - ${phoneWithCountryCode}\n` +
            `Емэйл - ${email}`,
        });
      }}
      validationSchema={signupSchema}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        initialValues,
        values,
        errors,
        touched,
        isValid,
      }) => (
        <View>
          <Text style={styles.heading}>Создать аккаунт</Text>
          <TextInput
            label="Имя"
            value={values.name}
            error={!!(touched.name && errors.name)}
            onChangeText={(val) =>
              /[^а-яА-Я]+/.test(val) || setFieldValue("name", val)
            }
            onFocus={handleBlur("name")}
            mode="outlined"
            theme={{ roundness: 15 }}
          />
          <HelperText type="error">{touched.name && errors.name}</HelperText>

          <TextInput
            label="E-mail"
            value={values.email}
            error={!!(touched.email && errors.email)}
            onChangeText={handleChange("email")}
            onFocus={handleBlur("email")}
            mode="outlined"
            theme={{ roundness: 15 }}
            keyboardType="email-address"
          />
          <HelperText type="error">{touched.email && errors.email}</HelperText>

          <View>
            <TextInput
              label="Телефон"
              value={values.phoneNumber}
              error={!!(touched.phoneNumber && errors.phoneNumber)}
              onChangeText={handleChange("phoneNumber")}
              onFocus={handleBlur("phoneNumber")}
              theme={{ roundness: 15 }}
              mode="outlined"
              keyboardType="phone-pad"
              style={{ paddingLeft: 100 }}
              render={(props) => (
                <MaskedTextInput
                  {...(props as MaskedTextInputProps)}
                  mask="999 999 99 99 99 9"
                  defaultValue={initialValues.phoneNumber}
                />
              )}
            />
            <HelperText type="error">
              {touched.phoneNumber && errors.phoneNumber}
            </HelperText>

            <Dropdown
              data={data}
              maxHeight={220}
              renderItem={({ value, country }) => {
                return (
                  <View style={styles.dropdownItem}>
                    <Text style={styles.dropdownItemTextLeft}>{country}</Text>
                    <Text style={styles.dropdownItemTextRight}>{value}</Text>
                  </View>
                );
              }}
              labelField="value"
              valueField="value"
              dropdownPosition="bottom"
              selectedTextProps={{ numberOfLines: 1 }}
              autoScroll={false}
              activeColor="#333"
              style={styles.dropdown}
              selectedTextStyle={{
                color: colors.disabled,
              }}
              containerStyle={{
                width: Math.min(width, 400) - 40,
                backgroundColor: colors.background,
                elevation: 0,
                borderWidth: 1,
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
                paddingBottom: 12,
                top: 10.5,
                borderColor:
                  touched.phoneNumber && errors.phoneNumber
                    ? colors.error
                    : colors.disabled,
              }}
              value={values.countryCode}
              onFocus={() => setIsDropdownOpened(true)}
              onBlur={() => setIsDropdownOpened(false)}
              onChange={({ value }) => {
                handleChange("countryCode")(value);
                setIsDropdownOpened(false);
              }}
            />

            <View style={[styles.separator, { borderRightColor: "#555" }]} />

            {isDropdownOpened && (
              <View
                style={{
                  width: "100%",
                  position: "absolute",
                  height: 15,
                  bottom: 0,
                  borderWidth: 1,
                  borderTopWidth: 0,
                  backgroundColor: colors.background,
                  borderColor:
                    touched.phoneNumber && errors.phoneNumber
                      ? colors.error
                      : colors.disabled,
                }}
              />
            )}
          </View>

          <Button
            onPress={handleSubmit}
            mode="contained"
            uppercase={false}
            style={styles.button}
            labelStyle={styles.buttonLabel}
            disabled={!checked || !isValid}
          >
            Далее
          </Button>

          <View style={styles.checkboxContainer}>
            <Checkbox
              value={checked}
              onValueChange={setChecked}
              color={colors.disabled}
              iconColor={colors.disabled}
              style={styles.checkbox}
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
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 50,
  },
  button: {
    borderRadius: 30,
    marginTop: 10,
    marginHorizontal: 1,
  },
  buttonLabel: {
    fontSize: 20,
    lineHeight: 40,
  },
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
    height: 24,
    top: 23,
    left: 100,
    borderRightWidth: 1,
  },
  dropdown: {
    position: "absolute",
    width: 90,
    paddingLeft: 15,
    top: 17,
  },
  dropdownItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  dropdownItemTextLeft: {
    fontSize: 16,
    width: "70%",
  },
  dropdownItemTextRight: {
    fontSize: 16,
  },
  phoneInputFocused: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  checkbox: {
    borderRadius: 5,
    top: 5,
    borderWidth: 1,
  },
});
