# putout-plugin-remove-console [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-remove-console.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-remove-console"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-console
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-console

`putout` plugin adds ability to find and add/remove `use strict` directive.

## Install

```
npm i @putout/plugin-remove-console
```

## Rule

Rule `strict-mode` is enabled by default, to disable add to `.putout.json`:

```json
{
    "rules": {
        "strict-mode/add": false,
        "strict-mode/remove": false,
    }
}
```

## Code Example

```js
const {readFileSync} = require('fs');
const source = readFileSync('./1.js', 'utf8');

const putout = require('putout');

console.log(source);
// outputs
`
console.log('hello');
`

const result = putout(source, {
    plugins: [
        'remove-console'
    ]
});
// returns
`
'use strict';
console.log('hello');
`
```

## License

MIT

