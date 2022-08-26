module.exports = {
    parserOptions: {
        ecmaVersion: 7,
        sourceType: "module"
    },
    parser: "@babel/eslint-parser",
    env:{
        browser: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    rules: {
        "brace-style"       : "error",
        "jsx-quotes"        : ["error", "prefer-double"],
        "func-call-spacing" : ["error", "never"],
        "no-tabs"           : "error",
        "no-trailing-spaces": "error"
    }
}