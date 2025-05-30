import type { IForm, IFormError } from "../../types/form";
import { TextInput } from "../Input";
import InputContainer from "../InputContainer";

export default ({
  form,
  setForm,
  formError,
  setFormError,
  showPassword,
  setShowPassword,
}: {
  form: IForm;
  setForm: React.Dispatch<React.SetStateAction<IForm>>;
  formError: IFormError;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  setFormError: React.Dispatch<React.SetStateAction<IFormError>>;
}) => {
  return (
    <>
      <InputContainer>
        <TextInput
          label="First Name"
          placeholder="Eg. John"
          value={form.firstName}
          setValue={(e) => {
            setForm((prev) => ({ ...prev, firstName: e.target.value }));
          }}
          name="firstName"
          error={formError}
          setError={setFormError}
          form={form}
        />
        <TextInput
          label="Last Name"
          placeholder="Eg. Doe"
          value={form.lastName}
          setValue={(e) => {
            setForm((prev) => ({ ...prev, lastName: e.target.value }));
          }}
          name="lastName"
          error={formError}
          setError={setFormError}
          form={form}
        />
      </InputContainer>

      <InputContainer>
        <TextInput
          label="Username"
          placeholder="Eg. Kryptic"
          value={form.userName}
          setValue={(e) => {
            setForm((prev) => ({ ...prev, userName: e.target.value }));
          }}
          name="userName"
          error={formError}
          setError={setFormError}
          form={form}
        />
        <TextInput
          label="Password"
          placeholder="password"
          isPassword
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          value={form.password}
          setValue={(e) => {
            setForm((prev) => ({ ...prev, password: e.target.value }));
          }}
          name="password"
          error={formError}
          setError={setFormError}
          form={form}
        />
      </InputContainer>

      <InputContainer>
        <TextInput
          label="Email"
          placeholder="Eg. xyz@gamil.com"
          value={form.email}
          setValue={(e) => {
            setForm((prev) => ({ ...prev, email: e.target.value }));
          }}
          name="email"
          error={formError}
          setError={setFormError}
          form={form}
        />
      </InputContainer>
    </>
  );
};
