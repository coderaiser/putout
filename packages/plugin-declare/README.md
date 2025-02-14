# @putout/plugin-declare [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-declare.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-declare "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to declare variable that was not defined before, including:

- [maybe](https://github.com/coderaiser/putout/tree/master/packages/plugin-maybe#readme): `maybeArray`, `maybeFn`, `maybeEmptyArray`;
- wrap: `not`,`id`, `returns`;
- fresh-import: `freshImport`, `freshImportDefault`;
- `fixtures`: `readFixture`;
- properties of `Object`;
- [wraptile](https://github.com/coderaiser/wraptile);
- [fullstore](https://github.com/coderaiser/fullstore);
- [currify](https://github.com/coderaiser/currify);
- [pipe-io](https://github.com/coderaiser/pipe-io);
- [pullout](https://github.com/coderaiser/pullout);
- [wait](https://github.com/iocmd/wait);
- [simport](https://github.com/coderaiser/simport);
- [chalk](https://www.npmjs.com/package/chalk);
- [table](https://www.npmjs.com/package/table);

## Install

```
npm i putout @putout/plugin-declare -D
```

Add `.putout.json` with:

```json
{
    "plugins": {
        "declare": "on"
    }
}
```

## Rules

Use options:

- ✅ `dismiss` for variables you don't want to declare;
- ✅ `declarations` to declare variables;

```json
{
    "rules": {
        "declare": ["on", {
            "declarations": {
                "hello": "import {hello} from 'world'"
            },
            "dismiss": [
                "assert",
                "entries",
                "parse",
                "stringify",
                "defineProperty",
                "noop",
                "join",
                "keys",
                "values",
                "stopAll",
                "once",
                "putout",
                "simport"
            ]
        }]
    }
}
```

## `assign`

### ❌ Example of incorrect code

```js
const hello = 'world';
const object = {};

assign(object, {
    hello,
});
```

### ✅ Example of correct code

```js
const hello = 'world';
const object = {};
const {assign} = Object;

assign(object, {
    hello,
});
```

## `keys`

### ❌ Example of incorrect code

```js
const hello = 'world';
const object = {};

const allKeys = keys(object);
```

### ✅ Example of correct code

```js
const hello = 'world';
const object = {};
const {keys} = Object;

const allKeys = keys(object);
```

## `values`

### ❌ Example of incorrect code

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

## `noop`

### ❌ Example of incorrect code

```js
noop();
```

### ✅ Example of correct code

```js
const noop = () => {};
noop();
```

## Types

### ❌ Example of incorrect code

```js
const isFn = (a) => typeof a === 'function';

if (isFn(fn))
    fn();
```

### ✅ Example of correct code

```js
const isFn = (a) => typeof a === 'function';

if (isFn(fn))
    fn();
```

## Maybe

### ❌ Example of incorrect code

```js
const a = [...maybeArray(b)];
```

### ✅ Example of correct code

```js
const {isArray} = Array;
const maybeArray = (a) => isArray(a) ? a : [a];

const a = [...maybeArray(b)];
```

## `entries`

### ❌ Example of incorrect code

```js
entries([1, 2, 3]);
```

### ✅ Example of correct code

```js
const {isArray} = Array;
const entries = (a) => isArray(a) ? a.entries() : Object.entries();

entries([1, 2, 3]);
```

## `fromEntries`

### ❌ Example of incorrect code

```js
fromEntries(['hello', 'world']);
```

### ✅ Example of correct code

```js
const {fromEntries} = Object;

fromEntries(['hello', 'world']);
```

## License

MIT
