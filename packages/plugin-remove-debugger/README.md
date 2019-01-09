# putout-plugin-remove-debugger [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-remove-debugger.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-remove-debugger"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-debugger
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-debugger

`putout` plugin adds ability to find and remove `debugger` statement.

## Install

```
npm i @putout/plugin-remove-debugger
```

## Rule

Rule `remove-debugger` is enabled by default, to disable add to `.putout.json`:

```json
{
    "rules": {
        "remove-debugger": false
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
debugger;
`

const result = putout(source, {
    plugins: [
        'remove-debugger'
    ]
});
// returns
''
```

## License

MIT

