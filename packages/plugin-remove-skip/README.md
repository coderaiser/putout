# putout-plugin-remove-skip [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-remove-skip.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-remove-skip"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-skip
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-skip

`putout` plugin adds ability to find and remove `test.skip` calls.

## Install

```
npm i @putout/plugin-remove-skip -D
```

## Rule

Rule `remove-skip` enabled by default, to disable add to `.putout.json`:

```json
{
    "rules": {
        "remove-skip": false
    }
}
```

## Usage

```js
const {readFileSync} = require('fs');
const source = readFileSync('./1.js', 'utf8');

const putout = require('putout');

console.log(source);
// outputs
`
test.skip('some test', (t) => {
    t.end();
});
`

const result = putout(source, {
    plugins: [
        'remove-skip'
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

