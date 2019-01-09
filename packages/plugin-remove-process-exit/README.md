# putout-plugin-remove-process-exit [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-remove-process-exit.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-remove-process-exit"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-process-exit
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-process-exit

`putout` plugin adds ability to find and remove `process.exit` calls.

## Install

```
npm i @putout/plugin-remove-process-exit
```

## Rule

Rule `remove-process-exit` is disabled by default, to enable add to `.putout.json`:

```json
{
    "rules": {
        "remove-process-exit": true
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
process.exit();
`

const result = putout(source, {
    plugins: [
        'remove-process-exit'
    ]
});
// returns
''
```

## License

MIT

