# putout-plugin-remove-unused-private-fields [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-remove-unused-private-fields.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-remove-unused-private-fields"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-unused-private-fields
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-unused-private-fields

`putout` plugin adds ability to remove unused private fields.

## Install

```
npm i @putout/plugin-remove-unused-private-fields
```

## Rule

Rule `remove-unused-private-fields` is enabled by default, to disable add to `.putout.json`:

```json
{
    "rules": {
        "remove-unused-private-fields": false
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
class Hello {
    #a = 5;
    #b = 3;
    get() {
        return this.#a;
    };
}
`

const result = putout(source, {
    plugins: [
        'remove-unused-private-fields'
    ]
});
// returns
`
class Hello {
    #a = 5;
    get() {
        return this.#a;
    };
}
`
```

## License

MIT

