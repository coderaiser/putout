# @putout/cli-choose [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/cli-choose.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/cli-choose "npm"

Show ui to choose one item from list.

## Install

```
npm i @putout/cli-choose
```

## Examples

```js
import {choose} from './lib/choose.js';

choose('hello?', [
    'one',
    'two',
    'three',
    'four',
]);
// returns
'one';
```

## License

MIT
