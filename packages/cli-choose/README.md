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
import {choose} from '@putout/cli-choose';

choose('hello?', [
    'one',
    'two',
    'three',
    'four',
]);

// returns
'one';
```

When you need to set focus use `autofocus`:

```js
import {choose} from './lib/choose.js';

const choices = [
    'one',
    'two',
    'three',
    'four',
];

choose('hello?', items, {
    autofocus: 3,
});

// show ui with focus on item 'three'.
```

## License

MIT
