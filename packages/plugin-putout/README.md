# @putout/plugin-putout [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-putout.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-putout"npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin helps with 🐊`Putout` plugins development.

## Install

```
npm i @putout/plugin-putout -D
```

## Rules

```json
{
    "rules": {
        "putout/apply-processors-destructuring": "on",
        "putout/apply-async-formatter": "on",
        "putout/add-args": "on",
        "putout/convert-putout-test-to-create-test": "on",
        "putout/convert-to-no-transform-code": "on",
        "putout/convert-replace-with": "on",
        "putout/convert-replace-with-multiple": "on",
        "putout/convert-babel-types": "on",
        "putout/convert-destructuring-to-identifier": "on",
        "putout/convert-node-to-path-in-get-template-values": "on",
        "putout/convert-traverse-to-include": "on",
        "putout/convert-traverse-to-replace": "on",
        "putout/convert-process-to-find": "on",
        "putout/convert-method-to-property": "on",
        "putout/convert-add-argument-to-add-args": "on",
        "putout/shorten-imports": "on",
        "putout/check-replace-code": "on",
        "putout/declare": "on"
    }
}
```

## apply-processors-destructuring

### ❌ Incorrect code example

```js
test('', async (t) => {
    await t.process({});
});

```

### ✅ Correct code Example

```js
test('', async ({process}) => {
    await process({});
});
```

## apply-async-formatter

### ❌ Incorrect code example

```js
test('formatter: codeframea', (t) => {
    t.format(codeframe, 1);
    t.end();
});
```

### ✅ Correct code example

```js
test('formatter: codeframea', async ({format}) => {
    await format(codeframe, 1);
});
```

## convert-putout-test-to-create-test"

Fixes results of [@putout/convert-commonjs-to-esm](https://github.com/coderaiser/putout/tree/master/packages/plugin-convert-commonjs-to-esm) work.

### ❌ Incorrect code example

```js
import putoutTest from '@putout/test';

const test = putoutTest(__dirname, {
    'remove-unused-variables': rmVars,
});
```

### ✅ Correct code Example

```js
import createTest from '@putout/test';

const test = createTest(__dirname, {
    'remove-unused-variables': rmVars,
});
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

## convert-traverse-to-replace

### ❌ Incorrect code example

```js
module.exports.traverse = () => ({
    'async (__a) => __b': 'async ({process}) => __b',
});
```

### ✅ Correct code Example

```js
module.exports.replace = () => ({
    'async (__a) => __b': 'async ({process}) => __b',
});
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
- support of `convert-destructuring-to-identifier` which is `Replacer`, while `convert-method-to-property` is `Includer` (searches for `ObjectMethod` node);

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

## check-replace-code

Checks that [Replacer](https://github.com/coderaiser/putout/tree/master/packages/engine-runner#replacer) transform is possible.

### ❌ Incorrect code example

```js
module.exports.replace = () => ({
    'if (__a = __b) __body': 'if (__a === "__b") __body',
});
```

There is no `fix` for this rule, it used internally to be more confident about `test coverage`, because of declaration form, transforms cannon be checked by `nyc` and `c8`, and uncovered lines can find unfixable false possitives when running on code.
This is additional tests, if you forget to test some case (from a big list of rules that is supported) it will be checked with this `rule` and make transforms more stable.

## declare

Depend on [@putout/convert-esm-to-commonjs](https://github.com/coderaiser/putout/tree/master/packages/plugin-convert-esm-to-commonjs) and
[@putout/declare-undefined-variables](https://github.com/coderaiser/putout/tree/master/packages/plugin-declare-undefined-variables)

### ❌ Incorrect code example

```js
compare(a, 'const __a = __b');
isIdentifier(a);
```

### ✅ Correct code Example

```js
const {operator, types} = require('putout');
const {compare} = operator;
const {isIdentifier} = types;

compare(a, 'const __a = __b');
isIdentifier(a);
```

## add-args

### ❌ Incorrect code example

```js
test('', () => {
    comparePlaces();
});
```

### ✅ Correct code Example

```js
test('', ({comparePlaces}) => {
    comparePlaces();
});
```

## convert-add-argument-to-add-args

```js
const {operator} = require('putout');
const {addArgument} = operator;

module.exports = addArgument({
    t: ['t', 'test("__a", (__args) => __body)'],
});
```

### ✅ Correct code Example

```js
const {operator} = require('putout');
const {addArgs} = operator;

module.exports = addArgs({
    t: ['t', 'test("__a", (__args) => __body)'],
});
```

## License

MIT
