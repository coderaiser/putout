# putout-plugin-remove-empty-pattern [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-remove-empty-pattern.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-remove-empty-pattern"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-empty-pattern
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-empty-pattern

`putout` plugin adds ability to find and remove `empty pattern statements`.

## Install

```
npm i @putout/plugin-remove-empty-pattern
```

## Rule

Rule `remove-empty-pattern` is enabled by default, to disable add to `.putout.json`:

```json
{
    "rules": {
        "remove-empty-pattern": false
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
const {} = process;
`

const result = putout(source, {
    plugins: [
        'remove-empty-pattern'
    ]
});
// returns
''
```

## License

MIT

