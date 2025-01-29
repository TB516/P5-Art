import jsdoc from "eslint-plugin-jsdoc";

const config = [
  // configuration included in plugin
  jsdoc.configs["flat/recommended"],
  // other configuration objects...
  {
    files: ["**/*.js"],
    plugins: {
      jsdoc,
    },
    rules: {
      "jsdoc/require-description": "warn",
    },
  },
];

export default config;
