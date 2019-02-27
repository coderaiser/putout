# putout-plugin-convert-apply-to-spread [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-convert-apply-to-spread.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-convert-apply-to-spread "npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-apply-to-spread
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-apply-to-spread

`putout` plugin adds ability to convert `apply` to `spread`.
## Install

```
npm i @putout/plugin-convert-apply-to-spread -D
```

## Rule

Rule `convert-apply-to-spread` is enabled by default, to disable add to `.putout.json`:

```json
{
    "rules": {
        "convert-apply-to-spread": false
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
console.log.apply(console, arguments);
`

const result = putout(source, {
    plugins: [
        'convert-apply-to-spread'
    ]
});
// returns
`
console.log(...arguments);
`
```

## License

MIT

