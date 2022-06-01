# @putout/cli-cache [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/cli-cache.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/cli-cache "npm"

Create `cache` of places found by [putout](https://github.com/coderaiser/putout).

## Install

```
npm i @putout/cli-cache
```

## Example

```js
const {createCache} = require('@putout/cli-cache');

const fileCache = await createCache({
    version,
    cache,
    fresh,
});

const places = fileCache.getPlaces(name);

fileCache.canUseCache(name, options);
fileCache.removeEntry(name);
fileCache.setInfo(name, places, options);
fileCache.reconcile();
```

## License

MIT
