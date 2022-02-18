import * as Yup from "yup";

export default Yup.object().shape({
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
    .max(18, "Введите корректный номер телефона")
});
