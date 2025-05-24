import { fontFamily } from "tailwindcss/defaultTheme";

export const theme = {
  extend: {
    fontFamily: {
      poppins: ["Poppins", ...fontFamily.sans],
    },
  },
};
