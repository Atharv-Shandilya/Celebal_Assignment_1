import type { IForm, IFormError } from "../types/form";
import passwordCheck from "./passwordCheck";

export default (
  formError: IFormError,
  form: IForm,
  setFormError: React.Dispatch<React.SetStateAction<IFormError>>
) => {
  const newErrors = { ...formError };

  // First Name
  if (form.firstName === "") {
    newErrors.firstName = {
      errorStatus: true,
      errorMessage: "This field is required",
    };
  } else if (!/^[A-Za-z]+$/.test(form.firstName)) {
    newErrors.firstName = {
      errorStatus: true,
      errorMessage: "only alphabets are valid",
    };
  } else {
    newErrors.firstName = {
      errorStatus: false,
      errorMessage: "",
    };
  }

  // Last Name
  if (form.lastName === "") {
    newErrors.lastName = {
      errorStatus: true,
      errorMessage: "This field is required",
    };
  } else if (!/^[A-Za-z]+$/.test(form.lastName)) {
    newErrors.lastName = {
      errorStatus: true,
      errorMessage: "only alphabets are valid",
    };
  } else {
    newErrors.lastName = {
      errorStatus: false,
      errorMessage: "",
    };
  }

  // User Name
  if (form.userName === "") {
    newErrors.userName = {
      errorStatus: true,
      errorMessage: "This field is required",
    };
  } else if (!/^[A-Za-z]+$/.test(form.userName)) {
    newErrors.userName = {
      errorStatus: true,
      errorMessage: "only alphabets are valid",
    };
  } else {
    newErrors.userName = {
      errorStatus: false,
      errorMessage: "",
    };
  }

  // Password
  passwordCheck(form, newErrors);

  // Email
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email)) {
    newErrors.email = {
      errorStatus: true,
      errorMessage: "Enter a proper email",
    };
  } else {
    newErrors.email = {
      errorStatus: false,
      errorMessage: "",
    };
  }
  const hasError = Object.values(newErrors).some((field) => field.errorStatus);
  setFormError(newErrors);

  return hasError;
};
