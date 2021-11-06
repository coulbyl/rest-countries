module.exports = {
  mode: "jit",
  purge: ["./src/**/*.html", "./src/**/*.ts"],
  darkMode: "class", // or 'media' or false
  theme: {
    extend: {
      colors: {
        headerdark: "#2B3743",
        bodydark: "#202D36",
        bodylight: "#FAFAFA",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
    },
  },
  plugins: [],
};
