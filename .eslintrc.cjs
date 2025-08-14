// ESLint の設定
// en: ESLint configuration
module.exports = {
  extends: [
    "next/core-web-vitals",
    "plugin:storybook/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:jsx-a11y/recommended",
  ],
  plugins: ["import", "jsx-a11y"],
  rules: {
    "import/first": "warn",
    "import/no-duplicates": "warn",
    "import/order": [
      "warn",
      {
        groups: [
          "builtin",
          ["external", "internal"],
          "parent",
          ["sibling", "index"],
        ],
      },
    ],
  },
};
