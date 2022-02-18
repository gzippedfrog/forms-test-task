// React
import React, { useState } from "react";
import { useWindowDimensions, View } from "react-native";
// UI
import {
  TextInput,
  Button,
  Text,
  HelperText,
  useTheme
} from "react-native-paper";
import { Checkbox } from "react-native-ui-lib";
import { Dropdown } from "react-native-element-dropdown";
// Form
import { Formik } from "formik";
import validationSchema from "./validationSchema";
import getFormStyles from "./getFormStyles";
// Other
import { MaskedTextInput } from "react-native-mask-text";
import { openComposer } from "react-native-email-link";
import data from "./countryCodes";

const DB_URL =
  "https://form-test-task-rn-default-rtdb.europe-west1.firebasedatabase.app/users.json";

async function handleSubmit({ name, email, countryCode, phoneNumber }) {
  const phoneWithCountryCode = countryCode + " " + phoneNumber;

  try {
    let response = await fetch(DB_URL, {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        phone: phoneWithCountryCode
      })
    });

    response = await response.json();

    openComposer({
      to: "support@domen.ru",
      subject: "Новая заявка",
      body:
        `Имя — ${name}\n` +
        `Емэйл — ${email}\n` +
        `Телефон — ${phoneWithCountryCode}\n`
    });

    console.log("Success:", response);
  } catch (error) {
    console.error("Error:", error);
  }
}

const SignUpForm = () => (
  <Formik
    initialValues={{
      name: "",
      email: "",
      phoneNumber: "",
      countryCode: "+7"
    }}
    validationSchema={validationSchema}
    onSubmit={handleSubmit}
    validateOnMount
  >
    {({
      handleChange,
      handleBlur,
      handleSubmit,
      values,
      errors,
      touched,
      isValid
    }) => {
      const [checked, setChecked] = useState(true);
      const [dropdownOpen, setDropdownOpen] = useState(false);
      const { colors } = useTheme();
      const { width } = useWindowDimensions();
      const styles = getFormStyles(errors, touched, colors, width);

      function handleNameChange(name) {
        /[^а-яА-Я]+/.test(name) || handleChange("name")(name);
      }

      const renderPhoneMask = (props) => (
        <MaskedTextInput
          {...props}
          defaultValue={props.value}
          mask="999 999 99 99 99 9"
        />
      );

      const renderDropdownItem = ({ country, code }) => (
        <View style={styles.dropdownItem}>
          <Text style={styles.dropdownItemTextLeft}>{country}</Text>
          <Text style={styles.dropdownItemTextRight}>{code}</Text>
        </View>
      );

      return (
        <View>
          <Text style={styles.heading}>Создать аккаунт</Text>
          <TextInput
            label="Имя"
            value={values.name}
            error={touched.name && errors.name}
            onChangeText={handleNameChange}
            onFocus={handleBlur("name")}
            mode="outlined"
          />
          <HelperText type="error">{touched.name && errors.name}</HelperText>

          <TextInput
            label="E-mail"
            value={values.email}
            error={touched.email && errors.email}
            onChangeText={handleChange("email")}
            onFocus={handleBlur("email")}
            mode="outlined"
            keyboardType="email-address"
          />
          <HelperText type="error">{touched.email && errors.email}</HelperText>

          <View>
            <TextInput
              label="Телефон"
              value={values.phoneNumber}
              error={touched.phoneNumber && errors.phoneNumber}
              onChangeText={handleChange("phoneNumber")}
              onFocus={handleBlur("phoneNumber")}
              mode="outlined"
              keyboardType="phone-pad"
              style={styles.phoneTextInput}
              render={renderPhoneMask}
            />
            <HelperText type="error">
              {touched.phoneNumber && errors.phoneNumber}
            </HelperText>

            <Dropdown
              labelField="code"
              valueField="code"
              data={data}
              renderItem={renderDropdownItem}
              maxHeight={220}
              dropdownPosition="bottom"
              autoScroll={false}
              activeColor="#333"
              style={styles.dropdown}
              selectedTextStyle={styles.dropdownSelectedText}
              containerStyle={styles.dropdownContainer}
              value={values.countryCode}
              onFocus={() => setDropdownOpen(true)}
              onBlur={() => setDropdownOpen(false)}
              onChange={({ code }) => handleChange("countryCode")(code)}
            />

            <View style={styles.phoneInputSeparator} />

            {dropdownOpen && <View style={styles.phoneInputDropdownOpen} />}
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
      );
    }}
  </Formik>
);

export default SignUpForm;
