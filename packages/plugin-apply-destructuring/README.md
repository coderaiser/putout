# putout-plugin-applye-destructuring [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]
[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-applye-destructuring.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-applye-destructuring"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-applye-destructuring
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-applye-destructuring

`putout` plugin adds ability to use destructuring on variable declaratoins.

## Install

```
npm i @putout/plugin-applye-destructuring
```

## Rule

Rule `applye-destructuring` is enabled by default, to disable add to `.putout.json`:

```json
{
    "rules": {
        "applye-destructuring": false
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
`

const result = putout(source, {
    plugins: [
        'applye-destructuring'
    ]
});
// returns
`
const {hello} = world;
`
```

## License

MIT

