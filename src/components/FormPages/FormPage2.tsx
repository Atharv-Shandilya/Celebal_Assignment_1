import { type ICountry, Country, type ICity, City } from "country-state-city";
import { DropDown, TextInput } from "../Input";
import InputContainer from "../InputContainer";
import type { IForm, IFormError } from "../../types/form";

export default ({
  form,
  setForm,
  showCountry,
  setShowCountry,
  showCity,
  setShowCity,
  formError,
  setFormError,
}: {
  form: IForm;
  setForm: React.Dispatch<React.SetStateAction<IForm>>;
  showCountry: boolean;
  setShowCountry: React.Dispatch<React.SetStateAction<boolean>>;
  showCity: boolean;
  setShowCity: React.Dispatch<React.SetStateAction<boolean>>;
  formError: IFormError;
  setFormError: React.Dispatch<React.SetStateAction<IFormError>>;
}) => {
  return (
    <>
      <InputContainer>
        <DropDown<ICountry>
          options={Country.getAllCountries()}
          selected={form.country}
          internalLabel="Select Country"
          setSelected={(e) => {
            setForm((prev) => {
              return { ...prev, country: e };
            });

            setForm((prev) => {
              return { ...prev, city: null };
            });

            setShowCity(false);
          }}
          getName={(item) => {
            return item.name;
          }}
          getKey={(Item) => Item.isoCode}
          showDrop={showCountry}
          setShowDrop={setShowCountry}
          label="Country"
          name="country"
          error={formError}
          setError={setFormError}
        />

        <DropDown<ICity>
          options={
            form.country
              ? (City.getCitiesOfCountry(form.country.isoCode) as ICity[])
              : null
          }
          selected={form.city}
          setSelected={(e) => {
            setForm((prev) => {
              return { ...prev, city: e };
            });
          }}
          name="city"
          error={formError}
          getName={(item) => {
            return item.name;
          }}
          setError={setFormError}
          showDrop={showCity}
          setShowDrop={setShowCity}
          label="City"
          internalLabel="Select City"
          getKey={(Item) =>
            Item.name + (Item.latitude as string) + (Item.longitude as string)
          }
        />
      </InputContainer>
      <InputContainer>
        <TextInput
          label="Phone number"
          placeholder="Eg. 92156XXXXX"
          isPhone
          country={form.country ? form.country : undefined}
          value={form.phone}
          setValue={(e) => {
            setForm((prev) => ({ ...prev, phone: e.target.value }));
          }}
          name="phone"
          error={formError}
          setError={setFormError}
          form={form}
        />
      </InputContainer>
      <InputContainer>
        <TextInput
          label="Addhar No."
          placeholder="1234-5678-9123"
          value={form.aadhar}
          setValue={(e) => {
            setForm((prev) => ({ ...prev, aadhar: e.target.value }));
          }}
          name="aadhar"
          error={formError}
          setError={setFormError}
          form={form}
        />
        <TextInput
          label="Pan No."
          placeholder="ABCDE1234F"
          value={form.pan}
          setValue={(e) => {
            setForm((prev) => ({ ...prev, pan: e.target.value }));
          }}
          name="pan"
          error={formError}
          setError={setFormError}
          form={form}
        />
      </InputContainer>
    </>
  );
};
