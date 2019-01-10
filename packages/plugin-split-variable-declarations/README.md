# putout-plugin-split-variable-declarations [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-split-variable-declarations.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-split-variable-declarations"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-split-variable-declarations
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-split-variable-declarations

`putout` plugin adds ability to find and split variable declarations.

## Install

```
npm i @putout/plugin-split-variable-declarations
```

## Rule

Rule `split-variable-declarations` is enabled by default, to disable add to `.putout.json`:

```json
{
    "rules": {
        "split-variable-declarations": false
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
let a, b;
`

const result = putout(source, {
    plugins: [
        'split-variable-declarations'
    ]
});
// returns
`
let a;
let b;
`
```

## License

MIT

