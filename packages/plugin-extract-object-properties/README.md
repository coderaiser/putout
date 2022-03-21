# @putout/plugin-extract-object-properties [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-extract-object-properties.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-extract-object-properties "npm"

> The **destructuring assignment** makes possible to unpack values from objects into distinct variables.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to apply destructuring to extract object properties.

## Install

```
npm i @putout/plugin-extract-object-properties -D
```

## Rule

```json
{
    "rules": {
        "extract-object-properties/equal-deep": "on",
        "extract-object-properties/not-equal-deep": "on"
    }
}
```

## Equal Deep

### ❌ Example of incorrect code

```js
const {replaceWith} = a.operate;
const {isIdentifier} = a.types;
```

### ✅ Example of correct code

```js
const {
    operator,
    types,
} = a;

const {replaceWith} = operator;
const {isIdentifier} = types;
```

## Not Equal Deep

### ❌ Example of incorrect code

```js
const {replaceWith} = a;
const {isIdentifier} = a.types;
```

### ✅ Example of correct code

```js
const {replaceWith, types} = a;
const {isIdentifier} = types;
```

## License

MIT
