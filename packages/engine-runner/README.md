# putout-engine-runner [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/engine-runner.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/engine-runner"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/engine-runner
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/engine-runner

Run putout plugins.

## Install

```
npm i @putout/engine-runner
```

## Supported Plugin Types

### Replacer

`Replacer` converts code in declarative way. Simplest possible form, no need to use `fix`. Just `from` and `to` parts.

Simplest replace example:

```js
module.exports.report = () => 'any message here';

module.exports.replace = () => {
    'const a = 1': 'const b = 1',
};

// optional
module.exports.filter = (path) => {
    return true;
};

// optional
module.exports.match = () => ({
    'const __a = 1': ({__a}) {
        return true;
    }
})

// optional
module.exports.exclude = () => [
    `const hello = 'world'`,
];
```

Simplest remove example:

```js
module.exports.report = () => 'debugger should not be used';

module.exports.replace = () => {
    'debugger': '',
};
```

Templates:

```js
module.exports.report = () => 'any message here';

module.exports.replace = () => {
    'var __a = 1': 'const __a = 1',
};
```

A couple variables example:

```js
module.exports.report = () => 'any message here';

module.exports.replace = () => {
    'const __a = __b': 'const __b = __a',
};
```


### Includer

`includer` is the most prefarable format of a plugin, simplest to use (after `replacer`)

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

module.exports.fix = (path) => {
    path.remove();
};

module.exports.traverse = ({push}) => {
    return {
        'debugger'(path) {
            push(path);
        }
    }
};
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
        }
    }
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
    plugin:
        include: () => ['debugger'],
        fix: (path) => path.remove(),
        report: () => `debugger should not be used`,
}];

const ast = parse('const m = "hi"; debugger');
const places = runPlugins({
    ast,
    shebang: false,     // default
    fix: true,          // default
    fixCount: 1         // default
    plugins,
    parser: 'babel',    // default
});
```

## Logs

To see logs, use:

```sh
DEBUG=putout:runner:*
DEBUG=putout:runner:fix
DEBUG=putout:runner:find
DEBUG=putout:runner:template
```

## License

MIT

