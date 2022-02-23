# @putout/plugin-declare-undefined-variables [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-declare-undefined-variables.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-declare-undefined-variables"npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin adds ability to declare variable that was not defined before, including:

- [child_process](https://nodejs.org/dist/latest-v16.x/docs/api/child_process.html);
- [fs](https://nodejs.org/dist/latest-v16.x/docs/api/fs.html);
- [path](https://nodejs.org/dist/latest-v16.x/docs/api/path.html);
- [process](https://nodejs.org/dist/latest-v16.x/docs/api/process.html);
- [module](https://nodejs.org/dist/latest-v16.x/docs/api/module.html);
- [stream](https://nodejs.org/dist/latest-v16.x/docs/api/stream.html);
- [os](https://nodejs.org/dist/latest-v16.x/docs/api/os.html);
- [url](https://nodejs.org/dist/latest-v16.x/docs/api/url.html);
- [util](https://nodejs.org/dist/latest-v16.x/docs/api/util.html);
- [zlib](https://nodejs.org/dist/latest-v16.x/docs/api/zlib.html);
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
                "basename",
                "dirname",
                "extname",
                "join",
                "keys",
                "values",
                "Readable.from",
                "readFile",
                "readFileSync",
                "writeFile",
                "writeFileSync",
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

# `readFile`

## ❌ Example of incorrect code

```js
await readFile('./README.md', 'utf8');
```

## ✅ Example of correct code

```js
import {readFile} from 'fs/promises';

await readFile('./README.md', 'utf8');
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
