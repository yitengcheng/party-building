module.exports = {
  root: true,
  env: {
    node: true,
  },

  extends: [
    "eslint-config-react-app",
    "plugin:eslint-plugin-react/recommended",
    "eslint:recommended",
    "plugin:prettier/recommended",
  ],

  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },

  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "linebreak-style": ["error", "unix"],
  },
};
