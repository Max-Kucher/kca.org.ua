const options = require("./config");

const allPlugins = {
  typography: require("@tailwindcss/typography"),
  forms: require("@tailwindcss/forms"),
  containerQueries: require("@tailwindcss/container-queries"),
};

const plugins = Object.keys(allPlugins)
  .filter((k) => options.plugins[k])
  .map((k) => {
    if (k in options.plugins && options.plugins[k]) {
      return allPlugins[k];
    }
  });

module.exports = {
  content: ["./src/**/*.{html,js,php}"],
  darkMode: "class",
  theme: {
    extend: {},
    colors: {
      primary: "#4598D6",
      white: "#FFFFFF",
      black: "#000000",
      transparent: "transparent",
    },
    screens: {
      xl: { max: "1280px" },
      lg: { max: "1024px" },
      md: { max: "768px" },
      sm: { max: "640px" },
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      gilroy: ["Gilroy", "sans-serif"],
    },
  },
  plugins: plugins,
};
