# @putout/plugin-declare-undefined-variables [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-declare-undefined-variables.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-declare-undefined-variables"npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/plugin-declare-undefined-variables
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-declare-undefined-variables

`putout` plugin adds ability to transform to new [Cloud Commander](https://declare-undefined-variables.io) API.

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

You can `dismiss` variables you don't want to define.

```json
{
    "rules": {
        "declare-undefined-variables": ["on", {
            "dismiss": [
                "assert",
                "entries",
                "parse",
                "stringify",
                "isArray",
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
                "montag"
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

## License

MIT
