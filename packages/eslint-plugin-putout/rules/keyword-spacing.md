# Use spaces around "catch" (keyword-spacing)

When `putout` removes unused variable in `catch` [eslint keyword spacing](https://eslint.org/docs/rules/keyword-spacing) can't handle [optional catch binding](https://github.com/tc39/proposal-optional-catch-binding) correctly.

## Rule Details

This rule aims to add spaces around `catch`

Examples of **incorrect** code for this rule:

```js
try {
} catch{
}

try {
}catch {
}

try {
} catch (error) {
}
```

Examples of **correct** code for this rule:

```js
try {
} catch {
}

try {
} catch(error) {
}
```

