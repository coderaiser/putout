# @putout/plugin-declare-undefined-variables [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-declare-undefined-variables.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-declare-undefined-variables"npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin adds ability to declare variable that was not defined before, including:

- is types: `isFn`, `isString`, `isNumber`, `isObject`, `isBool`, `isUndefined`, `isSymbol`;
- maybe: `maybeArray`, `maybeFn`, `maybeEmptyArray`;
- wrap: `not`,`id`, `returns`;
- fresh-import: `freshImport`, `freshImportDefault`;
- `fixtures`: `readFixture(name)`,
- [wraptile](https://github.com/coderaiser/wraptile);
- [currify](https://github.com/coderaiser/currify);
- [pipe-io](https://github.com/coderaiser/pipe-io);
- [pullout](https://github.com/coderaiser/pullout);
- [simport](https://github.com/coderaiser/simport);
- [chalk](https://www.npmjs.com/package/chalk);
- [table](https://www.npmjs.com/package/table);

## Install

```
npm i putout @putout/plugin-declare-undefined-variables -D
```

Add `.putout.json` with:

```json
{
    "plugins": {
        "declare-undefined-variables": "on"
    }
}
```

## Rules

You can `dismiss` variables you don't want to define, or declare using "declarations":

```json
{
    "rules": {
        "declare-undefined-variables": ["on", {
            "declarations": {
                "hello": "import {hello} from 'world'"
            },
            "dismiss": [
                "assert",
                "entries",
                "parse",
                "stringify",
                "defineProperty",
                "isArray",
                "noop",
                "join",
                "keys",
                "values",
                "stopAll",
                "montag",
                "once",
                "putout",
                "simport"
            ]
        }]
    }
}
```

# `assign`

## ❌ Example of incorrect code

```js
const hello = 'world';
const object = {};

assign(object, {
    hello,
});
```

## ✅ Example of correct code

```js
const hello = 'world';
const object = {};
const {assign} = Object;

assign(object, {
    hello,
});
```

# `keys`

## ❌ Example of incorrect code

```js
const hello = 'world';
const object = {};

const allKeys = keys(object);
```

## ✅ Example of correct code

```js
const hello = 'world';
const object = {};
const {keys} = Object;

const allKeys = keys(object);
```

# `values`

## ❌ Example of incorrect code

```js
const object = {};
const allValues = values(object);
```

## ✅ Example of correct code

```js
const {values} = Object;

const object = {};
const allValues = values(object);
```

# `isArray`

## ❌ Example of incorrect code

```js
isArray(array);
```

## ✅ Example of correct code

```js
const {isArray} = Array;
isArray(array);
```

# `noop`

## ❌ Example of incorrect code

```js
noop();
```

## ✅ Example of correct code

```js
const noop = () => {};
noop();
```

# Types

## ❌ Example of incorrect code

```js
if (isFn(fn))
    fn();
```

## ✅ Example of correct code

```js
const isFn = (a) => typeof a === 'function';

if (isFn(fn))
    fn();
```

# Maybe

## ❌ Example of incorrect code

```js
const a = [
    ...maybeArray(b),
];
```

## ✅ Example of correct code

```js
const {isArray} = Array;
const maybeArray = (a) => isArray(a) ? a : [a];

const a = [
    ...maybeArray(b),
];
```

## License

MIT
