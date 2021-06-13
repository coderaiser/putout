# @putout/plugin-putout [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-putout.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-putout"npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/plugin-putout
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-putout

`putout` plugin helps with `putout` plugins development.

## Install

```
npm i @putout/plugin-putout -D
```

## Rules

```json
{
    "rules": {
        "putout/convert-to-no-transform-code": "on",
        "putout/convert-replace-with": "on",
        "putout/convert-replace-with-multiple": "on",
        "putout/convert-babel-types": "on",
        "putout/convert-destructuring-to-identifier": "on",
        "putout/convert-node-to-path-in-get-template-values": "on",
        "putout/convert-traverse-to-include": "on",
        "putout/convert-process-to-find": "on",
        "putout/convert-method-to-property": "on",
        "putout/shorten-imports": "on"
    }
}
```

## convert-to-no-transform-code

### ❌ Incorrect code example

```js
test('plugin-apply-destructuring: transform: array: destructuring', (t) => {
    const code = 'const {name} = array[0]';
    
    t.transform(code, '');
    t.end();
});
```

### ✅ Correct code Example

```js
test('plugin-apply-destructuring: transform: array: destructuring', (t) => {
    const code = 'const {name} = array[0]';
    
    t.noTransformCode(code);
    t.end();
});
```

## convert-replace-with

### ❌ Incorrect code example

```js
module.exports.fix = (path) => {
    path.replaceWith(Identifier('hello'));
};
```

### ✅ Correct code Example

```js
const {replaceWith} = require('putout').operator;

module.exports.fix = (path) => {
    replaceWith(path, Identifier('hello'));
};
```

## convert-replace-with-multiple

### ❌ Incorrect code example

```js
module.exports.fix = (path) => {
    path.replaceWithMultiple([Identifier('hello')]);
};
```

### ✅ Correct code Example

```js
const {replaceWithMultiple} = require('putout').operator;

module.exports.fix = (path) => {
    replaceWithMultiple(path, [Identifier('hello')]);
};
```

## convert-babel-types

### ❌ Incorrect code example

```js
const {
    ObjectExpression,
    SpreadElement,
    isObjectExpression,
    isIdentifier,
} = require('@babel/types');
```

### ✅ Correct code Example

```js
const {
    ObjectExpression,
    SpreadElement,
    isObjectExpression,
    isIdentifier,
} = require('putout').types;
```

## convert-to-no-transform-code

### ❌ Incorrect code example

```js
module.exports.replace = () => ({
    'const __a = __b': ({}) => {
    },
    'const __c = __d': ({}, path) => {
    
    },
});
```

### ✅ Correct code Example

```js
module.exports.replace = () => ({
    'const __a = __b': (vars) => {
    },
    'const __c = __d': (vars, path) => {
    },
});
```

## convert-node-to-path-in-get-template-values

### ❌ Incorrect code example

```js
const {__a, __b} = getTemplateValues(path.node, 'const __a = __b');
```

### ✅ Correct code Example

```js
const {__a, __b} = getTemplateValues(path, 'const __a = __b');
```

## shorten-imports

### ❌ Incorrect code example

```js
const parseOptions = require('putout/lib/parse-options');
```

### ✅ Correct code Example

```js
const parseOptions = require('putout/parse-options');
```

## convert-traverse-to-include

### ❌ Incorrect code example

```js
module.exports.traverse = ({push}) => ({
    TSTypeAssertion(path) {
        push(path);
    },
});
```

### ✅ Correct code Example

```js
module.exports.include = () => [
    'TSTypeAssertion',
];
```

## convert-process-to-find

### ❌ Incorrect code example

```js
module.exports.preProcess = () => {};
module.exports.postProcess = () => {};
```

### ✅ Correct code Example

```js
module.exports.branch = (rawSource) => [];
module.exports.merge = (processedSource, list) => '';
```

## convert-method-to-property

- property simpler to work with;
- support of `convert-destructuring-to-identifier` which is `Replacer`, while `convert-method-to-property` is `Traverser` (searches for `Method` node);

### ❌ Incorrect code example

```js
module.exports.match = () => ({
    'module.exports.traverse = __a'({}, path) {
    },
});
```

### ✅ Correct code Example

```js
module.exports.match = () => ({
    'module.exports.traverse = __a': ({}, path) => {
    },
});
```

## License

MIT
