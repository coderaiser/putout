# @putout/plugin-convert-mock-require-to-mock-import [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-mock-require-to-mock-import.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-mock-require-to-mock-import "npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin adds ability to convert [mockRequire](https://github.com/boblauer/mock-require) to [mockImport](https://github.com/coderaiser/mock-import).

## Install

```
npm i @putout/plugin-convert-mock-require-to-mock-import -D
```

## Rule

Rule `convert-mock-require-to-mock-import` is enabled by default for `*.mjs`, to disable add to `.putout.json`:

```json
{
    "rules": {
        "convert-mock-require-to-mock-import": "off"
    }
}
```

## ❌ Example of incorrect code

```js
const mockRequire = require('mock-require');
const {reRequire, stopAll} = mockRequire;

test('', (t) => {
    mockRequire('fs/promises', {
        unlink: stub(),
    });
    
    const fn = reRequire('..');
    fn();
    
    stopAll();
    t.end();
});
```

## ✅ Example of correct code

```js
import {createMockImport} from 'mock-import';

const {
    mockImport,
    reImport,
    stopAll,
} = createMockImport(import.meta.url);

test('', async (t) => {
    mockImport('fs/promises', {
        unlink: stub(),
    });
    
    const fn = await reImport('..');
    fn();
    
    stopAll();
    t.end();
});
```

## License

MIT
