# @putout/plugin-extract-object-properties [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-extract-object-properties.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-extract-object-properties"npm"

`putout` plugin adds ability to convert Commonjs to ESM.

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

### ❌ Incorrect code example

```js
const {replaceWith} = a.operate;
const {isIdentifier} = a.types;
```

### ✅ Correct code Example

```js
const {
    operator,
    types,
} = a;

const {replaceWith} = operator;
const {isIdentifier} = types;
```

## Not Equal Deep

### ❌ Incorrect code example

```js
const {replaceWith} = a;
const {isIdentifier} = a.types;
```

### ✅ Correct code Example

```js
const {replaceWith, types} = a;
const {isIdentifier} = types;
```

## License

MIT
