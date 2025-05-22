import { City, type ICountry } from "country-state-city";
import type { IForm, IFormError } from "../types/form";
import { isValidPhoneNumber } from "libphonenumber-js";

export default (
  formError: IFormError,
  form: IForm,
  setFormError: React.Dispatch<React.SetStateAction<IFormError>>
) => {
  const newError = { ...formError };
  if (!form.country) {
    newError.country = {
      errorStatus: true,
      errorMessage: "This Field is required",
    };

    newError.city = {
      errorStatus: true,
      errorMessage: "This Field is required",
    };
  } else {
    newError.country = {
      errorStatus: false,
      errorMessage: "",
    };

    if (
      City.getCitiesOfCountry((form.country as ICountry).isoCode)?.length !=
        0 &&
      !form.city
    ) {
      newError.city = {
        errorStatus: true,
        errorMessage: "This Field is required",
      };
    } else {
      newError.city = {
        errorStatus: false,
        errorMessage: "",
      };
    }
  }

  if (form.phone != "") {
    if (!isValidPhoneNumber(form.phone, form.country.isoCode)) {
      newError.phone = {
        errorStatus: true,
        errorMessage: "Not a valid phone number",
      };
    } else {
      newError.phone = {
        errorStatus: false,
        errorMessage: "",
      };
    }
  } else {
    newError.phone = {
      errorStatus: true,
      errorMessage: "This Field is required",
    };
  }

  if (form.pan == "") {
    newError.pan = {
      errorStatus: true,
      errorMessage: "This Field is requried",
    };
  } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(form.pan)) {
    newError.pan = {
      errorStatus: true,
      errorMessage: "Not valid",
    };
  } else {
    newError.pan = {
      errorStatus: false,
      errorMessage: "",
    };
  }

  if (form.aadhar == "") {
    newError.aadhar = {
      errorStatus: true,
      errorMessage: "This Field is requried",
    };
  } else if (!/^[2-9]{1}[0-9]{11}$/.test(form.aadhar)) {
    newError.aadhar = {
      errorStatus: true,
      errorMessage: "Not valid",
    };
  } else {
    newError.aadhar = {
      errorStatus: false,
      errorMessage: "",
    };
  }
  let hasError = Object.values(newError).some((prev) => {
    return prev.errorStatus;
  });

  setFormError(newError);

  return hasError;
};
