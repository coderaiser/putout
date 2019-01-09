# putout-plugin-remove-unused-variables [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-remove-unused-variables.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-remove-unused-variables"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-unused-variables
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-unused-variables

`putout` plugin adds ability to find and remove unused variables.

## Install

```
npm i @putout/plugin-remove-unused-variables
```

## Rule

Rule `remove-unused-variables` is enabled by default, to disable add to `.putout.json`:

```json
{
    "rules": {
        "remove-unused-variables": false
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
const t = 'hello';
const a = t;
`

const result = putout(source, {
    plugins: [
        'remove-unused-variables'
    ]
});
// returns
`
const t = 'hello';
`
```

## License

MIT

