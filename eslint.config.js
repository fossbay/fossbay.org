const globals = require("globals");
const pluginJs = require("@eslint/js");
const stylisticJs = require("@stylistic/eslint-plugin-js");
const tseslint = require("typescript-eslint");
const nextPlugin = require("@next/eslint-plugin-next");
const reactPlugin = require("eslint-plugin-react");
const hooksPlugin = require("eslint-plugin-react-hooks");

const  myTsConfig = tseslint.configs.recommended;
myTsConfig[2].rules["@typescript-eslint/no-unused-vars"] = [
  "error", {
    "argsIgnorePattern": "^_",
    "varsIgnorePattern": "^_",
    "caughtErrorsIgnorePattern": "^_",
  }
];

module.exports = [
  {languageOptions: { globals: {...globals.browser, ...globals.node} }},
  {
    plugins: {
      "@stylistic/js": stylisticJs
    },
    rules: {
      "@stylistic/js/indent": [ "error", 2 ],
      "@stylistic/js/array-bracket-spacing": [ "error", "always" ],
      "@stylistic/js/semi": [ "error", "always" ],
      "@stylistic/js/quote-props": [ "error", "consistent-as-needed" ],
      "@stylistic/js/quotes": [ "error", "double" ],
      "@stylistic/js/jsx-quotes": [ "error", "prefer-double" ],
    }
  },
  {
    plugins: {
      react: reactPlugin,
    },
    rules: {
      ...reactPlugin.configs["jsx-runtime"].rules,
    },
    settings: {
      react: {
        version: "detect"
      },
    },
  },
  {
    plugins: {
      "react-hooks": hooksPlugin,
    },
    rules: hooksPlugin.configs.recommended.rules,
  },
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },
  {
    ignores: [ ".next/*" ],
  },
  pluginJs.configs.recommended,
  ...myTsConfig,
];