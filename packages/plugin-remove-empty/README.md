# @putout/plugin-remove-empty [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-empty.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-empty"npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to find and remove:

- `empty blocks`;
- `empty static blocks`;
- `empty patterns`;
- `empty arguments`;

## Install

```
npm i @putout/plugin-remove-empty
```

## Rules

- ✅ [block](#block);
- ✅ [static-block](#static-block);
- ✅ [pattern](#pattern);
- ✅ [nested-pattern](#nested-pattern);
- ✅ [argument](#argument);

## Config

```json
{
    "rules": {
        "remove-empty/block": "on",
        "remove-empty/static-block": "on",
        "remove-empty/pattern": "on",
        "remove-empty/nested-pattern": "on",
        "remove-empty/argument": "on"
    }
}
```

## block

```diff
-if (2 > 3) {}
```

## static-block

Check it out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/8d55df306ea7a3c74b494d37bd45f320/634cc2cf40fe7b691d969bb2bbfceecd1668b004).

```diff
class Hello {
-    static {
-    }
}
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
    const {
        a: {
        },
        c,
    } = param;
    
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

## arguments

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/2e19524f26b2fb412dd04228cc4a42e1/71b0034c61c33d2f8957b84b4e83d3844aba4f34).

### ❌ Example of incorrect code

```js
const create = ({} = {}) => 'hello';

module.exports = ({rule, plugin, msg, options}, {}) => {};

const a = {
    EmptyStatement({}) {},
};
```

### ✅ Example of correct code

```js
const create = () => 'hello';

module.exports = ({rule, plugin, msg, options}) => {};

const a = {
    EmptyStatement() {},
};
```

## License

MIT
