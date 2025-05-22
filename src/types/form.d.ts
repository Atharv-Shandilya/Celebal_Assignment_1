export interface IFormError {
  firstName: IError;
  lastName: IError;
  userName: IError;
  password: IError;
  email: IError;
  phone: IError;
  country: IError;
  city: IError;
  aadhar: IError;
  pan: IError;
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
