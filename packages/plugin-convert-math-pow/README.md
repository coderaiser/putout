# putout-plugin-convert-math-pow [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-convert-math-pow.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-convert-math-pow "npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-math-pow
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-math-pow

`putout` plugin adds ability to convert `Math.pow` to `exponentiation operator`.
## Install

```
npm i @putout/plugin-convert-math-pow -D
```

## Rule

Rule `convert-math-pow` is enabled by default, to disable add to `.putout.json`:

```json
{
    "rules": {
        "convert-math-pow": false
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
Math.pow(2, 4);
`

const result = putout(source, {
    plugins: [
        'convert-math-pow'
    ]
});
// returns
`
2 ** 4;
`
```

## License

MIT

