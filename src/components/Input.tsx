import {
  DownOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  LineOutlined,
} from "@ant-design/icons";
import type { ICountry } from "country-state-city";
import type { ChangeEvent } from "react";
import type { IFormError } from "../types/form";

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
}) => {
  return (
    <>
      <label className="flex-1 select-none">
        <div className="flex mb-1 items-center justify-between px-2">
          <p className="font-medium text-sm ">{label}</p>
          <p className="text-xs text-red-600">{error[name].errorMessage}</p>
        </div>

        <div className=" bg-[#F1F4F9] rounded-full px-6 py-2 flex items-center shadow-sm ">
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
            className="outline-none  w-full placeholder:text-sm"
            type={isPassword && !showPassword ? "password" : "text"}
            onChange={(e) => {
              setValue(e);
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
}: DropDownI<T>) => {
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
          if (options != null && options.length != 0)
            setShowDrop((prev) => !prev);
        }}
      >
        <p>{selected ? `${getName(selected)}` : internalLabel}</p>
        <DownOutlined
          className={` transform ${showDrop ? "" : "rotate-180"} text-sm  `}
        />
      </section>
      {showDrop && (
        <article className="  h-[200px] overflow-scroll bg-[#F1F4F9]  shadow-sm rounded-lg mt-4  ">
          {options &&
            options.length != 0 &&
            options.map((v: T, i) => {
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
