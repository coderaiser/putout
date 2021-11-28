# Keep curly braces in one line when you use destructuring as function argument (`destructuring-as-function-argument`)

When `putout` removes unused variable located in function argument object pattern, it formats in in a multiple lines.

## Rule Details

This rule aims to shorten destructuring of properties.

Examples of **incorrect** code for this rule:

```js
const login = ({
    username,
    password,
}) => {
};
```

Examples of **correct** code for this rule:

```js
const login = ({username, password}) => {
};
```
