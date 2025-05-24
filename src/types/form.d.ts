export interface IFormError {
  firstName: IError;
  lastName: IError;
  userName: IError;
  password: IPasswordError;
  email: IError;
  phone: IError;
  country: IError;
  city: IError;
  aadhar: IError;
  pan: IError;
}

interface IPasswordError extends IError {
  checks: {
    upper: boolean;
    lower: boolean;
    special: boolean;
    "no-space": boolean;
    length: boolean;
    digit: boolean;
  };
}

interface IError {
  errorStatus: boolean;
  errorMessage: string;
}

export interface IForm {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  email: string;
  phone: string;
  country: ICountry | null;
  city: ICity | null;
  aadhar: string;
  pan: string;
}
