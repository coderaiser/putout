# putout-plugin-remove-only [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-remove-only.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-remove-only"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-only
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-only

`putout` plugin adds ability to find and remove `test.only` calls.

## Install

```
npm i @putout/plugin-remove-only
```

## Rule

Rule `remove-only` is enabled by default, to disable add to `.putout.json`:

```json
{
    "rules": {
        "remove-only": false
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
test.only('some test', (t) => {
    t.end();
});
`

const result = putout(source, {
    plugins: [
        'remove-only'
    ]
});
// returns
`
test('some test', (t) => {
    t.end();
});
`
```

## License

MIT

