// eslint.config.js

const { FlatCompat } = require("@eslint/eslintrc");
const globals = require("globals");
const js = require("@eslint/js");
const tseslint = require("typescript-eslint");

const compat = new FlatCompat();

module.exports = tseslint.config(
  // デフォルト設定
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Expoの推奨設定
  ...compat.extends("eslint-config-expo/base"),

  // ここからがカスタム設定
  {
    // この rules セクションに設定を追加します
    rules: {
      // 1. JavaScriptの古い未使用変数チェックを無効にする
      //    理由: TypeScriptの構文を正しく認識できず、誤ったエラーを出すことがあるため。
      "no-unused-vars": "off",

      // 2. TypeScript専用の未使用変数チェックを有効にする
      //    こちらがTypeScriptの型定義などを正しく解釈してくれます。
      "@typescript-eslint/no-unused-vars": [
        "error", // "error"にすると、未使用変数が見つかった場合にエラーとして報告します
        {
          "args": "after-used",
          "ignoreRestSiblings": true,
          "caughtErrors": "none",
        },
      ],
    },
    // グローバル変数の設定
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  }
);
