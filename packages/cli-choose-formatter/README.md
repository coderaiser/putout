# @putout/cli-choose-formatter [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/cli-choose-formatter.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/cli-choose-formatter "npm"

Show ui to choose-formatter one item from list.

## Install

```
npm i @putout/cli-choose-formatter
```

## Examples

```js
import {chooseFormatter} from '@putout/cli-choose-formatter';

await chooseFormatter('progress-bar', ['dump', 'progress-bar']);
```

## License

MIT
