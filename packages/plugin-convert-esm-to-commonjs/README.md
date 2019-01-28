# putout-plugin-convert-esm-to-commonjs [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]
[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-convert-esm-to-commonjs.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-convert-esm-to-commonjs"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-esm-to-commonjs
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-esm-to-commonjs

`putout` plugin adds ability to convert `EcmaScript Modules` to `CommonJS`

## Install

```
npm i @putout/plugin-convert-esm-to-commonjs
```

## Rule

Rule `convert-esm-to-commonjs` is disabled by default, to enable add to `.putout.json`:

```json
{
    "rules": {
        "convert-esm-to-commonjs": true
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
import hello from 'world';
`

const result = putout(source, {
    plugins: [
        'convert-esm-to-commonjs'
    ]
});
// returns
`
const hello = require('world');
`
```

## License

MIT

