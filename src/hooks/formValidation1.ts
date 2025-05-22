import type { IForm, IFormError } from "../types/form";

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
  } else {
    newErrors.userName = {
      errorStatus: false,
      errorMessage: "",
    };
  }

  // Password
  if (form.password === "") {
    newErrors.password = {
      errorStatus: true,
      errorMessage: "Field is required",
    };
  } else if (!/[A-Z]/.test(form.password)) {
    newErrors.password = {
      errorStatus: true,
      errorMessage: "Add uppercase.",
    };
  } else if (!/[a-z]/.test(form.password)) {
    newErrors.password = {
      errorStatus: true,
      errorMessage: "Add lowercase",
    };
  } else if (!/[0-9]/.test(form.password)) {
    newErrors.password = {
      errorStatus: true,
      errorMessage: "Add digit.",
    };
  } else if (/\s/.test(form.password)) {
    newErrors.password = {
      errorStatus: true,
      errorMessage: "no spaces.",
    };
  } else if (!/[!@#$%^&*()_+\[\]{};:'"<>,.?~\\/-]/.test(form.password)) {
    newErrors.password = {
      errorStatus: true,
      errorMessage: "Add symbol.",
    };
  } else if (form.password.length <= 7) {
    newErrors.password = {
      errorStatus: true,
      errorMessage: "min 8 chars.",
    };
  } else {
    newErrors.password = {
      errorStatus: false,
      errorMessage: "",
    };
  }

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
