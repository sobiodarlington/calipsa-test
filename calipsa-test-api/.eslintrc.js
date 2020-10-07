module.exports = {
    "extends": "airbnb-base",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "script",
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true
        }
    },
    "rules": {
        // override default options
        "no-underscore-dangle": ["error", {
            "allowAfterThis": true
        }],
        "comma-dangle": ["error", {
            "arrays": "always-multiline",
            "objects": "always-multiline",
            "imports": "always-multiline",
            "exports": "always-multiline",
            "functions": "ignore"
        }],
        "no-restricted-syntax": ["error", "ForInStatement", "LabeledStatement", "WithStatement"],
        "object-shorthand": ["error", "always"],
        "newline-after-import": "off",
        "indent": ["error", 4, { "SwitchCase": 1 }],
        "max-len": ["error", {
            "code": 100,
            "ignoreUrls": true,
            "ignoreStrings": true,
            "ignoreTemplateLiterals": true
        }],
        "no-param-reassign": ["error", { "props": false }],
        // "no-console": "error",
        "curly": "off",
        "no-use-before-define": ["error", { "variables": false }],
        "consistent-return": ["error", { "treatUndefinedAsUnspecified": true }],
        "object-curly-newline": ["error", {
            "ObjectPattern": { "multiline": false },
            "ImportDeclaration": "never",
            "ExportDeclaration": { "multiline": true, "minProperties": 3 }
        }],
        "arrow-body-style": "off",
        "consistent-return": "off",
        "prefer-const": 1,
        "no-use-before-define": "off",
        "class-methods-use-this": "off",
        "no-unused-vars": 0,
        "object-curly-newline": 0,
    }
};
