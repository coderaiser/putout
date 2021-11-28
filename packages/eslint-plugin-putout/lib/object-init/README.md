# Keep each property on separate line when initializing an object(`object-init`)

In the same way as eslint [object-property-newline](https://github.com/coderaiser/putout/tree/master/packages/eslint-plugin-putout/lib/multiple-properties-destructuring) but for initializing variables with `object expression`.

## Rule Details

Examples of **incorrect** code for this rule:

```js
const user = {name};

module.exports = {lint: 'putout lint'};
```

Examples of **correct** code for this rule:

```js
const user = {
    name,
};

module.exports = {
    lint: 'putout lint',
};
```
