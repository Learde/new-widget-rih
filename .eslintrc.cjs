/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
    root: true,
    extends: [
        "plugin:vue/vue3-essential",
        "eslint:recommended",
        "@vue/eslint-config-prettier",
    ],
    parserOptions: {
        ecmaVersion: "latest",
    },
    "env": {
        "es6": true
    },
    rules: {
        indent: ["error", 4],
        "prettier/prettier": [
            "warn",
            {
                tabWidth: 4,
                endOfLine: "auto",
            },
        ],
    },
};
