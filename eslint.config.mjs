import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"]},
    {
      ignores: [
        "src/**/*.d.ts",
        "src/lib/**/*.ts",
        "**/config.*  "
      ]
    },
    {
      rules: {
        "no-unused-vars": "warn",
        "no-undef": "warn",
		"deprecation/deprecation": "warn"
      }
    },
  {
    languageOptions: { 
      globals: globals.browser 
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];