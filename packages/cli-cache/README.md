# @putout/cli-cache [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/cli-cache.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/cli-cache "npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/cli-cache
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/putout.svg?path=packages/cli-cache

Read `.putout.json` and convert `rules`  into `cache`;

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

fileCache.canUseCache(name, options);
fileCache.removeEntry(name);
fileCache.setInfo(name, places, options);
fileCache.reconcile();

const places = fileCache.getPlaces(name);
```

## License

MIT
