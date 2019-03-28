# putout-plugin-remove-empty [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-remove-empty.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-remove-empty"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-empty
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-empty

`putout` plugin adds ability to find and remove:
- `empty block statements`;
- `empty patterns`;
- `empty imports`;

## Install

```
npm i @putout/plugin-remove-empty
```

## Rule

Rules `remove-empty` is enabled by default, to disable add to `.putout.json`:

```json
{
    "rules": {
        "remove-empty/block": false,
        "remove-empty/pattern": false
        "remove-empty/import": false
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
if (2 > 3) {
}
`

const result = putout(source, {
    plugins: [
        'remove-empty'
    ]
});
// returns
''
```

## License

MIT

