# @putout/engine-runner [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/engine-runner.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/engine-runner"npm"

Run 🐊[`Putout`](https://github.com/coderaiser/putout) plugins.

## Install

```
npm i @putout/engine-runner
```

## Supported Plugin Types

### Replacer

`Replacer` converts code in declarative way. Simplest possible form, no need to use `fix`. Just `from` and `to` parts
according to [`template variables syntax`](https://github.com/coderaiser/putout/tree/master/packages/compare#supported-template-variables).

Simplest replace example:

```js
module.exports.report = () => 'any message here';

module.exports.replace = () => ({
    'const a = 1': 'const b = 1',
});

// optional
module.exports.filter = (path) => {
    return true;
};

// optional
module.exports.match = () => ({
    'const __a = 1': ({__a}) => {
        return true;
    },
});

// optional
module.exports.exclude = () => [
    `const hello = 'world'`,
    'ArrowFunctionExpression',
];
```

Simplest remove example:

```js
module.exports.report = () => 'debugger should not be used';

module.exports.replace = () => ({
    'debugger': '',
});
```

Templates:

```js
module.exports.report = () => 'any message here';

module.exports.replace = () => ({
    'var __a = 1': 'const __a = 1',
});
```

A couple variables example:

```js
module.exports.report = () => 'any message here';

module.exports.replace = () => ({
    'const __a = __b': 'const __b = __a',
});
```

#### Processing of node using functions

You can pass a function as object value for more soficticated processing.

Remove node:

```js
module.exports.report = () => 'any message here';

module.exports.replace = () => ({
    'for (const __a of __b) __c': ({__a, __b, __c}, path) => {
        // remove node
        return '';
    },
});
```

Update node:

```js
module.exports.report = () => 'any message here';

module.exports.replace = () => ({
    'for (const __a of __array) __c': ({__a, __array, __c}, path) => {
        // update __array elements count
        path.node.right.elements = [];
        return path;
    },
});
```

Update node using template variables:

```js
module.exports.report = () => 'any message here';

module.exports.replace = () => ({
    'for (const __a of __array) __c': ({__a, __array, __c}, path) => {
        // update the whole node using template string
        return 'for (const x of y) z';
    },
});
```

### Includer

`includer` is the most preferable format of a plugin, simplest to use (after `replacer`)

```js
module.exports.report = () => 'debugger statement should not be used';

module.exports.fix = (path) => {
    path.remove();
};

module.exports.include = () => [
    'debugger',
];

// optional
module.exports.exclude = () => {
};

// optional
module.exports.filter = (path) => {
    return true;
};
```

`include` and `exclude` returns an array of [@babel/types](https://babeljs.io/docs/en/babel-types), or code blocks:

```js
const __ = 'hello';
```

Where `__` can be any node. All this possible with help of [@putout/compare](https://github.com/coderaiser/putout/tree/master/packages/compare). Templates format supported in `traverse` and `find` plugins as well.

### Traverser

`Traverse plugins` gives you more power to `filter` and `fix` nodes you need.

```js
module.exports.report = () => 'debugger statement should not be used';

module.exports.fix = (path, {options}) => {
    path.remove();
};

module.exports.traverse = ({push}) => ({
    'debugger'(path) {
        push(path);
    },
});
```

#### Storages

Storages is preferred way of keeping data 🐊`Putout`, `traverse` init function called only once, and any other way
of handling variables will most likely will lead to bugs.

##### listStore

To keep things and save them as a list during traverse in a safe way `listStore` can be used for code:

```js
debugger;
const hello = '';
debugger;
const world = '';
```

```js
module.exports.traverse = ({listStore}) => ({
    'debugger'(path) {
        listStore('x');
    },
    
    Program: {
        exit() {
            console.log(listStore());
            // returns
            ['x', 'x'];
            // for code
            'debugger; debugger';
        },
    },
});
```

When you need `key-value` storage `store` can be used.

```js
module.exports.traverse = ({push, store}) => ({
    'debugger'(path) {
        store('hello', 'world');
        push(path);
    },
    
    Program: {
        exit() {
            store();
            // returns
            ['world'];
            
            store.entries();
            // returns
            [['hello', 'world']];
            
            store('hello');
            // returns
            'world';
        },
    },
});
```

#### Upstore

When you need to update already saved values, use `upstore`

```js
module.exports.traverse = ({push, store}) => ({
    TSTypeAliasDeclaration(path) {
        if (path.parentPath.isExportNamedDeclaration())
            return;
        
        store(path.node.id.name, {
            path,
        });
    },
    
    ObjectProperty(path) {
        const {value} = path.node;
        const {name} = value;
        
        store(name, {
            used: true,
        });
    },
    
    Program: {
        exit() {
            for (const {path, used} of store()) {
                if (used)
                    continue;
                
                push(path);
            }
        },
    },
});
```

### Finder

`Find plugins` gives you all the control over traversing, but it's the slowest format.
Because `traversers` not merged in contrast with other plugin formats.

```js
module.exports.report = () => 'debugger statement should not be used';

module.exports.fix = (path) => {
    path.remove();
};

module.exports.find = (ast, {push, traverse}) => {
    traverse(ast, {
        'debugger'(path) {
            push(path);
        },
    });
};
```

## Example

```js
const {runPlugins} = require('@putout/engine-runner');
const {parse} = require('@putout/engin-parser');

const plugins = [{
    rule: "remove-debugger",
    msg: "",        // optional
    options: {},    // optional
    plugin: {
        include: () => ['debugger'],
        fix: (path) => path.remove(),
        report: () => `debugger should not be used`,
    },
}];

const ast = parse('const m = "hi"; debugger');
const places = runPlugins({
    ast,
    shebang: false,     // default
    fix: true,          // default
    fixCount: 1,        // default
    plugins,
    parser: 'babel',    // default
});
```

## Logs

To see logs, use:

- ✅ `DEBUG=putout:runner:*`
- ✅ `DEBUG=putout:runner:fix`
- ✅ `DEBUG=putout:runner:find`
- ✅ `DEBUG=putout:runner:template`
- ✅ `DEBUG=putout:runner:replace`

## License

MIT
