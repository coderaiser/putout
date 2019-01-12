# putout-plugin-convert-tape-to-supertape  [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-tape-to-supertape
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-tape-to-supertape

Replace `tape` with `supertape`.

## Install

```
npm i @putout/plugin-convert-tape-to-supertape
```

## Code Example

```js
const {readFileSync} = require('fs');
const source = readFileSync('./1.js', 'utf8');

const putout = require('putout');

console.log(source);
// outputs
`
const tryTo = require('try-to-tape');
const test = require('tape');
`

const result = putout(source, {
    plugins: [
        'convert-tape-to-supertape'
    ]
});
// returns
`
const test = require('supertape');
`
```

## License

MIT

