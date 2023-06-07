# @putout/traverse [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/traverse.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/traverse "npm"

traverse AST-nodes

## Install

```
npm i @putout/traverse
```

## API

### traverse

```js
const {template} = require('@putout/engine-parser');
const {traverse} = require('@putout/traverse');

const node = template.ast('const a = b');

traverse(node, {
    'Identifier'(path) {
        console.log('found identifier');
    },
    
    'throw __a'(path, {__a}) {
        console.log(__a);
    },
    
    'await __'(path) {
        console.log('found await');
    },
    'for await (__ of __) __'(path) {
        console.log('found for-of');
    },
});
```

### contains

```js
const {template} = require('@putout/engine-parser');
const {contains} = require('@putout/traverse');

const node = template.ast('async () => await x');

contains(node, [
    'return __',
    'throw __',
    'await __',
    'for await (__ of __) __',
]);

// returns
true;
```

## License

MIT
