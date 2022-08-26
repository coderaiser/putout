# @putout/plugin-remove-empty [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-empty.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-empty"npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to find and remove:

- `empty block statements`;
- `empty patterns`;
- `empty imports`;
- `empty arguments`;
- `empty exports`;

## Install

```
npm i @putout/plugin-remove-empty
```

## Rules

```json
{
    "rules": {
        "remove-empty/block": "on",
        "remove-empty/pattern": "on",
        "remove-empty/nested-pattern": "on",
        "remove-empty/argument": "on",
        "remove-empty/export": "on",
        "remove-empty/import": ["on", {
            "ignore": []
        }]
    }
}
```

## block

```diff
-if (2 > 3) {}
```

## pattern

```diff
-const [] = array;
-const {} = object;
```

## nested-pattern

### ❌ Example of incorrect code

```js
export const func = (param) => {
    const {a: {}, c} = param;
    return c;
};
```

### ✅ Example of correct code

```js
export const func = (param) => {
    const {c} = param;
    return c;
};
```

## export

```diff
-export {};
```

## import

```diff
-import 'abc';
```

## arguments

### ❌ Example of incorrect code

```js
module.exports = ({rule, plugin, msg, options}, {}) => {
};
```

### ✅ Example of correct code

```js
module.exports = ({rule, plugin, msg, options}) => {
};
```

## License

MIT
