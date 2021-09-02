# @putout/cli-ruler [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/cli-ruler.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/cli-ruler "npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/cli-ruler
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/putout.svg?path=packages/cli-ruler

Ruler toggler for `.putout.json`.

## Install

```
npm i @putout/cli-ruler
```

## API

To create new file `.putout.json` and disable all rules defined by `places` use:

### disableAll

```js
import {
    readFile,
    writeFile,
} from 'fs/promises';

import ruler from '@putout/cli-ruler';

const places = [{
    rule: 'remove-unused-variables',
    message: '"a" is defined but never used',
    position: {line: 3, column: 6},
}];

const options = {
    disableAll: true,
    readFile,
    writeFile,
};

await ruler(options, places);
```

It will produce `.putout.json`:

```json
{
    "rules": {
        "remove-unused-variables": "off"
    }
}
```

Same with `enableAll`

### enable

To enable one rule with a name `remove-unused-variables` use:

```js
import {
    readFile,
    writeFile,
} from 'fs/promises';

import ruler from '@putout/cli-ruler';

const places = [];
const options = {
    enable: 'remove-unused-variables',
    readFile,
    writeFile,
};

await ruler(options, places);
```

It will produce `.putout.json`:

```json
{
    "rules": {
        "remove-unused-variables": "on"
    }
}
```

Same with `disable`

## License

MIT
