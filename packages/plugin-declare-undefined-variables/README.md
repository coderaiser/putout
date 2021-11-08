# @putout/plugin-declare-undefined-variables [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-declare-undefined-variables.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-declare-undefined-variables"npm"

`putout` plugin adds ability to declare variable that was not defined before, including:

- [fs/promises](https://nodejs.org/dist/latest-v16.x/docs/api/fs.html);
- [path](https://nodejs.org/dist/latest-v16.x/docs/api/path.html);
- [module](https://nodejs.org/dist/latest-v16.x/docs/api/module.html);
- [stream](https://nodejs.org/dist/latest-v16.x/docs/api/stream.html);
- [os](https://nodejs.org/dist/latest-v16.x/docs/api/os.html);
- [child_process](https://nodejs.org/dist/latest-v16.x/docs/api/child_process.html);
- types: `isFn`, `isString`, `isNumber`, `isObject` `isUndefined`;
- maybe: `maybeArray`, `maybeFn`;
- [wraptile](https://github.com/coderaiser/wraptile);
- [currify](https://github.com/coderaiser/currify);
- [pipe-io](https://github.com/coderaiser/pipe-io);
- [pullout](https://github.com/coderaiser/pullout);

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
                "basename",
                "dirname",
                "extname",
                "join",
                "keys",
                "values",
                "Readable.from",
                "tryCatch",
                "tryToCatch",
                "readFile",
                "readFileSync",
                "writeFile",
                "writeFileSync",
                "mockImport",
                "createMockImport",
                "reImport",
                "stopAll",
                "montag",
                "once",
                "putout"
            ]
        }]
    }
}
```

# `assign`

## ❌ Incorrect code example

```js
const hello = 'world';
const object = {
};

assign(object, {
    hello,
});
```

## ✅ Correct code Example

```js
const hello = 'world';
const object = {
};
const {assign} = Object;

assign(object, {
    hello,
});
```

# `keys`

## ❌ Incorrect code example

```js
const hello = 'world';
const object = {
};

const allKeys = keys(object);
```

## ✅ Correct code Example

```js
const hello = 'world';
const object = {
};
const {keys} = Object;

const allKeys = keys(object);
```

# `values`

## ❌ Incorrect code example

```js
const object = {};
const allValues = values(object);
```

## ✅ Correct code Example

```js
const {values} = Object;

const object = {};
const allValues = values(object);
```

# `readFile`

## ❌ Incorrect code example

```js
await readFile('./README.md', 'utf8');
```

## ✅ Correct code Example

```js
import {readFile} from 'fs/promises';

await readFile('./README.md', 'utf8');
```

# `mockImport`

## ❌ Incorrect code example

```js
import {stub} from 'supertape';

mockImport('fs/promises', {
    readFile: stub().resolves(''),
});
```

## ✅ Correct code Example

```js
import {stub} from 'supertape';
import {createMockImport} from 'mock-import';

const {
    mockImport,
    stopAll,
    reImport,
} = createMockImport(import.meta.url);

mockImport('fs/promises', {
    readFile: stub().resolves(''),
});
```

# `isArray`

## ❌ Incorrect code example

```js
isArray(array);
```

## ✅ Correct code Example

```js
const {isArray} = Array;
isArray(array);
```

# `noop`

## ❌ Incorrect code example

```js
noop();
```

## ✅ Correct code Example

```js
const noop = () => {};
noop();
```

# Types

## ❌ Incorrect code example

```js
if (isFn(fn))
    fn();
```

## ✅ Correct code Example

```js
const isFn = (a) => typeof a === 'function';

if (isFn(fn))
    fn();
```

# Maybe

## ❌ Incorrect code example

```js
const a = [
    ...maybeArray(b),
];
```

## ✅ Correct code Example

```js
const {isArray} = Array;
const maybeArray = (a) => isArray(a) ? a : [a];

const a = [
    ...maybeArray(b),
];
```

## License

MIT
