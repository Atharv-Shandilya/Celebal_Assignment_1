import {
  CheckCircleOutlined,
  DownOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  LineOutlined,
} from "@ant-design/icons";
import type { ICity, ICountry } from "country-state-city";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import type { IForm, IFormError } from "../types/form";
import passwordCheck from "../hooks/passwordCheck";

export const PasswordError = ({
  error,
  isMobile,
}: {
  error: IFormError;
  isMobile?: boolean;
}) => {
  return (
    <ul
      className={`text-xs px-3 my-3 ${
        isMobile
          ? "md:hidden"
          : "absolute top-[80px] right-[0px] w-[250px] bg-white shadow-sm  py-4 px-6 rounded-lg [&>li]:mb-2 hidden md:block  "
      } `}
    >
      <li
        className={
          !error.password.checks.upper ? "text-green-600" : " text-red-600"
        }
      >
        <CheckCircleOutlined /> An upper case character
      </li>
      <li
        className={
          !error.password.checks.lower ? "text-green-600" : " text-red-600"
        }
      >
        <CheckCircleOutlined /> A lower case character
      </li>
      <li
        className={
          !error.password.checks.special ? "text-green-600" : " text-red-600"
        }
      >
        <CheckCircleOutlined /> A special character
      </li>
      <li
        className={
          !error.password.checks.digit ? "text-green-600" : " text-red-600"
        }
      >
        <CheckCircleOutlined /> A digit character
      </li>
      <li
        className={
          !error.password.checks["no-space"]
            ? "text-green-600"
            : " text-red-600"
        }
      >
        <CheckCircleOutlined /> No spaces
      </li>
      <li
        className={
          !error.password.checks.length ? "text-green-600" : " text-red-600"
        }
      >
        <CheckCircleOutlined /> min lenght of 8 Character
      </li>
    </ul>
  );
};

export const TextInput = ({
  label,
  placeholder,
  isPassword = false,
  showPassword = false,
  setShowPassword,
  country,
  isPhone = false,
  value,
  setValue,
  error,
  name,
  setError,
  form,
}: {
  label: string;
  placeholder: string;
  isPassword?: boolean;
  showPassword?: boolean;
  setShowPassword?: React.Dispatch<React.SetStateAction<boolean>>;
  country?: ICountry;
  isPhone?: boolean;
  value: string;
  setValue: (e: ChangeEvent<HTMLInputElement>) => void;
  error: IFormError;
  name: keyof IFormError;
  setError: React.Dispatch<React.SetStateAction<IFormError>>;
  form: IForm;
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <>
      <label className="flex-1 select-none ">
        <div className="flex mb-1 items-center justify-between px-3">
          <p className="font-medium text-sm mr-2"> {label}</p>

          <div className="flex">
            <p className="mr-2 text-red-600 text-xs">
              {error[name].errorMessage}
            </p>
            {isPassword && error[name].errorStatus && (
              <div className="relative ">
                {isFocused && <PasswordError error={error} />}
              </div>
            )}
          </div>
        </div>
        {isPassword && error[name].errorStatus && (
          <PasswordError error={error} isMobile />
        )}

        <div className="bg-[#F1F4F9] rounded-full px-6 py-2 flex items-center shadow-sm ">
          {isPhone && (
            <div className="flex items-center border-r mr-2">
              +
              {country ? (
                <p className="mr-2"> {country.phonecode}</p>
              ) : (
                <div className="flex items-center mr-2 font-bo ">
                  <LineOutlined className="text-[10px]" />
                  <LineOutlined className=" text-[10px]" />
                </div>
              )}
            </div>
          )}
          <input
            className="outline-none  w-full placeholder:text-sm "
            type={isPassword && !showPassword ? "password" : "text"}
            onChange={(e) => {
              setValue(e);

              if (!isPassword)
                setError((prev) => ({
                  ...prev,
                  [name]: { errorStatus: false, errorMessage: "" },
                }));

              if (isPassword && error[name].errorStatus) {
                const newErrors = { ...error };
                const updatedForm = { ...form, password: e.target.value };
                passwordCheck(updatedForm, newErrors);
                setError(newErrors);
              }
            }}
            onFocus={() => {
              setIsFocused(true);
            }}
            onBlur={() => {
              setIsFocused(false);
            }}
            placeholder={placeholder}
            value={value}
          />

          {isPassword && (
            <div
              className="cursor-pointer"
              onClick={() => {
                if (setShowPassword) setShowPassword((prev) => !prev);
              }}
            >
              {!showPassword && <EyeOutlined />}
              {showPassword && <EyeInvisibleOutlined />}
            </div>
          )}
        </div>
      </label>
    </>
  );
};

interface DropDownI<T> {
  options: T[] | null;
  selected: T | null;
  setSelected: (item: T) => void;
  getName: (item: T) => string;
  showDrop: boolean;
  setShowDrop: React.Dispatch<React.SetStateAction<boolean>>;
  label: string;
  internalLabel: string;
  getKey: (item: T) => string;
  name: keyof IFormError;
  error: IFormError;
  setError: React.Dispatch<React.SetStateAction<IFormError>>;
}

export const DropDown = <T,>({
  options,
  selected,
  setSelected,
  getName,
  getKey,
  showDrop,
  setShowDrop,
  internalLabel,
  label,
  name,
  error,
  setError,
}: DropDownI<T>) => {
  const [search, setSearch] = useState("");
  const [inputActive, setInputActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && inputActive) {
      inputRef.current.focus();
    }
  }, [inputActive]);
  return (
    <article className=" flex-1">
      <div className="flex mb-1 items-center justify-between px-2">
        <p className="font-medium text-sm ">{label}</p>
        <p className="text-xs text-red-600">{error[name].errorMessage}</p>
      </div>
      <section
        className={`flex justify-between  px-6 py-2 items-center rounded-full ${
          !options || options.length == 0
            ? " bg-gray-200 opacity-30"
            : "bg-[#F1F4F9] shadow-sm cursor-pointer "
        }`}
        onClick={() => {
          setError((prev) => ({
            ...prev,
            [name]: { errorStatus: false, errorMessage: "" },
          }));
          if (options != null && options.length != 0)
            setShowDrop((prev) => !prev);
          setInputActive(true);
        }}
      >
        {inputActive && (
          <input
            className="outline-none"
            ref={inputRef}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        )}
        <p className={`${inputActive ? "hidden" : ""} `}>
          {selected ? `${getName(selected)}` : internalLabel}
        </p>
        <DownOutlined
          className={` transform ${showDrop ? "" : "rotate-180"} text-sm  `}
        />
      </section>
      {showDrop && (
        <article className="  h-[200px] overflow-scroll bg-[#F1F4F9]  shadow-sm rounded-lg mt-4  ">
          {options &&
            options.length != 0 &&
            options
              .filter((v) => (v as ICountry | ICity).name.startsWith(search))
              .map((v: T, i) => {
                return (
                  <section
                    key={getKey(v)}
                    className={`${
                      i == options.length - 1 ? "" : "border-b border-gray-300"
                    }  px-4 py-2 cursor-pointer hover:bg-[#e9eff8] ${
                      selected && getName(selected) == getName(v)
                        ? "bg-[#e9eff8]"
                        : ""
                    } `}
                    onClick={() => {
                      setSelected(v);
                      setShowDrop(false);
                      setInputActive(false);
                      setSearch("");
                    }}
                  >
                    {getName(v)}
                  </section>
                );
              })}
        </article>
      )}
    </article>
  );
};
