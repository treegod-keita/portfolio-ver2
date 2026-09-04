module.exports = {
  trailingComma: "all",
  printWidth: 100,
  tabWidth: 4,
  semi: true,
  singleQuote: false,
  jsxSingleQuote: false,
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
