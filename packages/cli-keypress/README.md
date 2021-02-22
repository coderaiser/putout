# @putout/cli-keypress [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/cli-keypress.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/cli-keypress "npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/cli-keypress
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/putout.svg?path=packages/cli-keypress

`putout` keypress handler.

## Install

```
npm i @putout/cli-keypress
```

## Examples

```js
const keyPress = require('keypress');
const {isStop} = keyPress();

// do some stuf antil ctrl+c pressed
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
