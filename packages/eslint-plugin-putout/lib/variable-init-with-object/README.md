# keep each property on separate line when using multiple destructuring properties (variable-init-with-object)

In the same way as eslint [object-property-newline](https://github.com/coderaiser/putout/tree/master/packages/eslint-plugin-putout/lib/multiple-properties-destructuring) but for initializing variables with `object expression`.

## Rule Details

Examples of **incorrect** code for this rule:

```js
const user = {name};
```

Examples of **correct** code for this rule:

```js
const user = {
    name,
};
```

