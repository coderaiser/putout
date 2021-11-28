# Remove newlines between parens in function declaration (`function-declaration-paren-newline`)

Similar to `eslint` [function-paren-newline](https://eslint.org/docs/rules/function-declaration-paren-newline), but forbids new lines in function declarations and expressions arguments.

## Rule Details

This rule aims to add spaces around `catch`

Examples of **incorrect** code for this rule:

```js
function f(
    {a, b, c},
) {}

const fn = (
    {a, b, c},
) => {};
```

Examples of **correct** code for this rule:

```js
function f({a, b, c}) {}

const fn = ({a, b, c}) => {};

const fnWithCall = ({a, b, c}) => {
    return x(
        a,
        b,
    );
};
```
