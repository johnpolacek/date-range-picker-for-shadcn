module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "standard-with-typescript",
        "plugin:react/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "./tsconfig.json"
    },
    "plugins": [
        "@typescript-eslint",
        "react"
    ],
    "rules": {
        "@typescript-eslint/dot-notation": "error",
        "@typescript-eslint/prefer-optional-chain": "off",
        "@typescript-eslint/strict-boolean-expressions": "off",
        "react/prop-types": "off"
    }
}
