import { useState } from "react";

import "./App.css";
import FormProgress from "./components/FormPrgress/FormProgress";
import type { IForm, IFormError } from "./types/form";
import FormPage1 from "./components/FormPages/FormPage1";
import formValidation1 from "./hooks/formValidation1";
import FormPage2 from "./components/FormPages/FormPage2";
import BackgroundSvg from "./components/BackgroundSvg";
import formValidation2 from "./hooks/formValidation2";

function App() {
  const [formPage, setFormPage] = useState(1);

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState<IForm>({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    email: "",
    phone: "",
    country: null,
    city: null,
    aadhar: "",
    pan: "",
  });

  const [formError, setFormError] = useState<IFormError>({
    firstName: { errorStatus: false, errorMessage: "" },
    lastName: { errorStatus: false, errorMessage: "" },
    userName: { errorStatus: false, errorMessage: "" },
    password: { errorStatus: false, errorMessage: "" },
    email: { errorStatus: false, errorMessage: "" },
    phone: { errorStatus: false, errorMessage: "" },
    country: { errorStatus: false, errorMessage: "" },
    city: { errorStatus: false, errorMessage: "" },
    aadhar: { errorStatus: false, errorMessage: "" },
    pan: { errorStatus: false, errorMessage: "" },
  });

  const [showCountry, setShowCountry] = useState(false);
  const [showCity, setShowCity] = useState(false);

  return (
    <main className="  font-primary relative h-screen ">
      <BackgroundSvg />
      <article className="shadow-lg rounded-2xl bg-white p-9 w-[95%] sm:w-[75%] absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:w-[65%]">
        <h2 className="text-center mb-4 font-bold text-xl">Sign up</h2>

        <div className="">
          <FormProgress pageNumber={formPage} />
        </div>
        {formPage == 1 && (
          <FormPage1
            setForm={setForm}
            form={form}
            formError={formError}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        )}

        {formPage == 2 && (
          <FormPage2
            form={form}
            setForm={setForm}
            showCountry={showCountry}
            setShowCountry={setShowCountry}
            showCity={showCity}
            setShowCity={setShowCity}
            formError={formError}
          />
        )}

        {formPage == 3 && (
          <section className=" [&>div]:mb-4 [&_h2]:font-bold [&_h2]:text-lg md:[&_h2]:text-base [&>div]:last-of-type:mb-0 [&_h2]:mb-1 [&_h3]:text-gray-400 text-left xs:text-center shadow-sm px-4 py-8 rounded-2xl bg-[#F1F4F9]/40 [&>div>div]:mb-[2px] flex flex-col lg:flex-row md:justify-around">
            <div>
              <h2>User Info</h2>
              <div>
                <h3>Full Name</h3>
                <p>
                  {form.firstName} {form.lastName}
                </p>
              </div>
              <div>
                <h3>UserName</h3>
                <p>{form.userName}</p>
              </div>
            </div>
            <div>
              <h2>Contact Information</h2>

              <div>
                <h3>Email Address</h3>
                <p>{form.email}</p>
              </div>

              <div>
                <h3>phone number</h3>
                <p>
                  +{form.country.phonecode} {form.phone}
                </p>
              </div>
            </div>
            <div>
              <h2>Address</h2>
              <p>
                {form.city.name}, {form.country.name}
              </p>
            </div>
            <div>
              <h2>Identity Proofs</h2>
              <div>
                <h3>Aadhar Number</h3>
                <p>{form.aadhar}</p>
              </div>
              <div>
                <h3>Pan Number</h3>
                <p>{form.pan}</p>
              </div>
            </div>
          </section>
        )}

        <div className="flex justify-center mt-[50px]">
          {formPage == 2 && (
            <button
              className=" rounded-4xl px-6 py-2 cursor-pointer mr-5 bg-[#ff9100c1] hover:bg-[#FF9000] shadow-sm text-[#f5f5f5]"
              onClick={() => {
                setFormPage((prev) => prev - 1);
              }}
            >
              go back
            </button>
          )}
          {formPage != 3 && (
            <button
              className="text-[#f5f5f5] font-bold rounded-4xl px-6 py-2 cursor-pointer bg-[#ff9100c1] hover:bg-[#FF9000] shadow-sm"
              onClick={() => {
                if (formPage === 1) {
                  let hasError = formValidation1(formError, form, setFormError);

                  if (hasError) return;
                }
                if (formPage == 2) {
                  let hasError = formValidation2(formError, form, setFormError);
                  if (hasError) return;
                }

                setFormPage((prev) => prev + 1);
              }}
            >
              {!(formPage > 1) ? "save & continue" : "submit"}
            </button>
          )}
        </div>
      </article>
    </main>
  );
}

export default App;
