# @putout/cli-cache [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/cli-cache.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/cli-cache "npm"

Store to `cache` information about files processed by 🐊[Putout](https://github.com/coderaiser/putout) to nearest `node_modules/.cache` directory.

## Install

```
npm i @putout/cli-cache
```

## Example

```js
import {createCache} from '@putout/cli-cache';

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
