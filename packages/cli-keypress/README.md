# @putout/cli-keypress [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/cli-keypress.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/cli-keypress "npm"

`putout` keypress handler.

## Install

```
npm i @putout/cli-keypress
```

## Examples

```js
const keyPress = require('keypress');
const {isStop} = keyPress();

// do some stuff until ctrl+c pressed
async function again() {
    if (isStop())
        return;
    
    await again();
}
```

## Env Variables

`KEYPRESS=1` can be used to force enable `keypress`.

## License

MIT
