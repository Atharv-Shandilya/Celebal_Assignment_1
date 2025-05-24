import type { IForm, IFormError } from "../types/form";

export default (form: IForm, newErrors: IFormError) => {
  newErrors.password.checks.upper = !/[A-Z]/.test(form.password);

  newErrors.password.checks.lower = !/[a-z]/.test(form.password);

  newErrors.password.checks.digit = !/[0-9]/.test(form.password);

  newErrors.password.checks["no-space"] = /\s/.test(form.password);

  newErrors.password.checks.special =
    !/[!@#$%^&*()_+\[\]{};:'"<>,.?~\\/-]/.test(form.password);

  newErrors.password.checks.length = form.password.length < 8;
  console.log(newErrors.password.checks);
  const passwordHasError = Object.values(newErrors.password.checks).some(
    (curr) => curr
  );

  console.log(passwordHasError);

  if (passwordHasError) {
    newErrors.password.errorStatus = true;
    newErrors.password.errorMessage = "Invalid Password";
  } else {
    newErrors.password.errorStatus = false;
    newErrors.password.errorMessage = "";
  }
};
