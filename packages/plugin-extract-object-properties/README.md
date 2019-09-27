# putout-plugin-extract-object-properties [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-extract-object-properties.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-extract-object-properties"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-extract-object-properties
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-extract-object-properties

`putout` plugin adds ability to convert Commonjs to ESM.

## Install

```
npm i @putout/plugin-extract-object-properties -D
```

## Rule

```json
{
    "rules": {
        "extract-object-properties/equal-deep": true,
        "extract-object-properties/not-equal-deep": true
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
    operate,
    types
} = a;

const {replaceWith} = operate;
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

