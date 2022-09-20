module.exports = {
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#179C67",
        secondary: "#374151",
        sideBar: "#111827",
        topBar: "#F2F4F6",
        rowColor: "#F2FFF9",
        lightBlue: "#ECF3FF",
        boxBorder: "#D1D5DB",
      },
    },
  },
  plugins: [],
};
