# @putout/engine-runner [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/engine-runner.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/engine-runner "npm"

Run 🐊[**Putout**](https://github.com/coderaiser/putout) plugins.

## Install

```
npm i @putout/engine-runner
```

## Supported Plugin Types

There is a couple plugin types available in 🐊**Putout**:

- ✅ [**Declarator**](#Declarator)
- ✅ [**Replacer**](#replacer)
- ✅ [**Includer**](#includer)
- ✅ [**Traverser**](#traverser)
- ✅ [**Scanner**](#scanner)
- ✅ [**Finder**](#finder)

All of them supports subset of **JavaScript** 🦎[**PutoutScript**](https://github.com/coderaiser/putout/blob/master/docs/putout-script.md#-putoutscript) described in [`@putout/compare`](https://github.com/coderaiser/putout/tree/master/packages/compare#readme).

They goes from simplest to hardest. Let's start from **Declarator**.

### Declarator

The simplest possible type of plugin, even simpler then [`Replacer`](#replacer):

```js
module.exports.declare = () => ({
    isString: `const isString = (a) => typeof a === 'string'`,
});
```

Based on [`@putout/operator-declare`](https://github.com/coderaiser/putout/tree/master/packages/operator-declare#readme), helps to add declaration to any referenced `Identifier`.

### Replacer

**Replacer** converts code in declarative way. Simplest possible form of 🐊**Putout Plugin**, no need to use `fix`. Just `from` and `to` parts
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
    debugger: '',
});

// debugger; alert(); -> alert();
```

Templates:

```js
module.exports.report = () => 'any message here';

module.exports.replace = () => ({
    'var __a = 1': 'const __a = 1',
});

// var x = 1; -> const x = 1;
```

A couple variables example:

```js
module.exports.report = () => 'any message here';

module.exports.replace = () => ({
    'const __a = __b': 'const __b = __a',
});

// const hello = world; -> const world = hello;
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

// for (a of b) {}; alert(); -> alert();
```

Update node:

```js
module.exports.report = () => 'any message here';

module.exports.replace = () => ({
    'for (const __a of __array) __c': ({__a, __array, __c}, path) => {
        // update __array elements
        path.node.right.elements = [];
        return path;
    },
});

// for (const a of [1, 2, 3]) {}; -> for (const a of []) {};
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

// for (const item of array) {}; -> for (const x of y) z;
```

### Includer

**Includer** is the most preferable format of a plugin, simplest to use (after [`Replacer`](#replacer)):

```js
module.exports.report = () => 'debugger statement should not be used';

module.exports.fix = (path) => {
    path.remove();
};

module.exports.include = () => ['debugger'];
// optional
module.exports.exclude = () => {};
// optional
module.exports.filter = (path) => {
    return true;
};
```

`include` and `exclude` returns an array of [@babel/types](https://babeljs.io/docs/en/babel-types), or code blocks:

```js
const __ = 'hello';
```

Where `__` can be any node. All this possible with help of [@putout/compare](https://github.com/coderaiser/putout/tree/master/packages/compare#readme). Templates format supported in `traverse` and `find` plugins as well.

### Traverser

**Traverser** gives you more power to `filter` and `fix` nodes you need.

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

#### Stores

Stores is preferred way of keeping 🐊**Putout** data, `traverse` init function called only once, and any other way
of handling variables will most likely will lead to bugs. There is a couple store types:

- ✅ [`listStore`](#liststore);
- ✅ [`pathStore`](#pathstore);
- ✅ [`store`](#store);
- ✅ [`upstore`](#upstore);
- ✅ [`uplist`](#uplist);

Let's talk about each of them.

##### `listStore`

To save things as a list without duplicates use `listStore`.
Let's suppose you have such code:

```js
debugger;
const hello = '';
debugger;
const world = '';
```

Let's process it!

```js
module.exports.traverse = ({listStore}) => ({
    'debugger'(path) {
        listStore(path);
    },
    
    Program: {
        exit() {
            console.log(listStore());
            // returns
            [{
                type: 'DebuggerStatement',
            }, {
                type: 'DebuggerStatement',
            }];
            
            // for code
            'debugger; debugger';
        },
    },
});
```

##### `pathStore`

When you want additional check that `path` not removed.

```js
debugger;
const hello = '';
```

Let's process it!

```js
module.exports.traverse = ({pathStore}) => ({
    'debugger'(path) {
        pathStore(path);
        path.remove();
    },
    
    Program: {
        exit() {
            console.log(pathStore());
            // returns
            [];
        },
    },
});
```

##### `store`

When you need `key-value` use `store`:

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

##### `upstore`

When you need to update already saved values, use `upstore`:

```js
module.exports.traverse = ({push, upstore}) => ({
    TSTypeAliasDeclaration(path) {
        if (path.parentPath.isExportNamedDeclaration())
            return;
        
        upstore(path.node.id.name, {
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
            for (const {path, used} of upstore()) {
                if (used)
                    continue;
                
                push(path);
            }
        },
    },
});
```

##### `uplist`

When you need to update named arrays:

```js
module.exports.traverse = ({uplist, push}) => ({
    'const __object = __a.__b': (fullPath) => {
        const {__a, __b} = getTemplateValues(fullPath, 'const __object = __a.__b');
        const initPath = fullPath.get('declarations.0.init');
        const {uid} = initPath.scope;
        
        if (isIdentifier(__a) || isCallExpression(__a)) {
            const {code} = generate(__a);
            const id = `${uid}-${code}`;
            
            return uplist(id, initPath);
        }
    },
    'Program': {
        exit: () => {
            for (const items of uplist()) {
                if (items.length < 2)
                    continue;
                
                const index = items.length - 1;
                const path = items[index];
                
                push({
                    path,
                    items,
                });
            }
        },
    },
});
```

### Scanner

**Scanner** gives you all ability to work with files.

```js
module.exports.report = () => 'Create file hello.txt';

module.exports.fix = (rootPath) => {
    createFile(rootPath, 'hello.txt', 'hello world');
};

module.exports.scan = (rootPath, {push}) => {
    const [filePath] = findFile(rootPath, 'hello.txt');
    
    if (filePath)
        return null;
    
    push(rootPath);
};
```

You can also subscribe to `progress` events:

- `start`;
- `end`;
- `push`;

And one more: `file` if your plugin uses `progress` function:

```js
export const report = () => 'Create file hello.txt';

export const fix = (rootPath) => {
    createFile(rootPath, 'hello.txt', 'hello world');
};

export const scan = (rootPath, {progress}) => {
    const [filePath] = findFile(rootPath, 'hello.txt');
    
    if (filePath)
        return null;
    
    progress({
        i: 0,
        n: 1,
    });
    
    push(filePath);
};
```

Or better `trackFile`, which does the same, but also count `progress`:

```js
export const report = () => 'Add file';
export const fix = (file) => {
    writeFileContent(file, 'hello');
};

export const scan = (rootPath, {push, trackFile}) => {
    for (const file of trackFile(rootPath, 'hello.txt')) {
        push(file);
    }
};
```

☝️ *When you use `trackFile` use [`progress()`](https://github.com/coderaiser/putout/tree/master/packages/test#progressfilename-expected) for testing*

### Finder

**Finder** gives you all the control over traversing, but it's the slowest format.
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
const {parse} = require('@putout/engine-parser');

const plugins = [{
    rule: 'remove-debugger',
    msg: '', // optional
    options: {}, // optional
    plugin: {
        include: () => ['debugger'],
        fix: (path) => path.remove(),
        report: () => `debugger should not be used`,
    },
}];

const ast = parse('const m = "hi"; debugger');

const places = runPlugins({
    ast,
    shebang: false, // default
    fix: false, // default
    fixCount: 2, // default
    plugins,
    parser: 'babel', // default
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
