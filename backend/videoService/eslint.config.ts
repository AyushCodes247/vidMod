import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "coverage/**",
      "*.config.js",
      "*.config.ts",
    ],
  },

  {
    files: ["src/**/*.{ts,js}"],

    extends: [js.configs.recommended, ...tseslint.configs.recommended],

    languageOptions: {
      parser: tseslint.parser,

      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },

      globals: {
        ...globals.node,
      },
    },

    rules: {
      // Possible Errors
      "no-console": "warn",
      "no-debugger": "error",
      "no-unreachable": "error",
      "no-duplicate-imports": "error",

      // Variables
      "no-var": "error",
      "prefer-const": "error",

      // Style
      "object-shorthand": "error",
      "prefer-template": "error",
      "prefer-arrow-callback": "error",

      // TypeScript
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-inferrable-types": "off",
    },
  },
]);
