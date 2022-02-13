module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-blue": {
          100: "#D1FDFE",
          200: "#B4DFE5",
          300: "#007979",
          400: "#303C6C",
        },
      },
      fontFamily: {
        roboto: "Roboto",
      },
      height: {
        128: "32rem",
      },
      width: {
        128: "32rem",
      },
    },
  },
  plugins: [],
};
