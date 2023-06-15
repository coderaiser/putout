# @putout/cli-staged [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/cli-staged.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/cli-staged "npm"

🐊**Putout** get list of staged by `git` files.

## Install

```
npm i @putout/cli-staged
```

## Examples

```js
import {
    get,
    set,
} from '@putout/cli-staged';
import {findUp} from 'find-up';
import tryToCatch from 'try-to-catch';

const [error, names] = await tryToCatch(get, {
    findUp,
    isSupported: Boolean,
});

const stagedNames = await set({
    findUp,
});
```

## License

MIT
