# putout-plugin-apply-destructuring [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]
[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-apply-destructuring.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-apply-destructuring"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-apply-destructuring
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-apply-destructuring

`putout` plugin adds ability to use destructuring on variable declaratoins.

## Install

```
npm i @putout/plugin-apply-destructuring
```

## Rule

Rule `apply-destructuring` is enabled by default, to disable add to `.putout.json`:

```json
{
    "rules": {
        "apply-destructuring/object": false,
        "apply-destructuring/array": false
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
const hello = world.hello;
const a = b[0];
`

const result = putout(source, {
    plugins: [
        'apply-destructuring'
    ]
});
// returns
`
const {hello} = world;
const [a] = b;
`
```

## License

MIT

