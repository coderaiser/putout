# @putout/plugin-putout [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-putout.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-putout"npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin helps with plugins development.

## Install

```
npm i @putout/plugin-putout -D
```

## Rules

```json
{
    "rules": {
        "putout/apply-create-test": "on",
        "putout/apply-processors-destructuring": "on",
        "putout/apply-async-formatter": "on",
        "putout/apply-remove": "on",
        "putout/apply-declare": "on",
        "putout/add-args": "on",
        "putout/add-push": "on",
        "putout/convert-putout-test-to-create-test": "on",
        "putout/convert-to-no-transform-code": "on",
        "putout/convert-number-to-numeric": "on",
        "putout/convert-replace-with": "on",
        "putout/convert-replace-with-multiple": "on",
        "putout/convert-replace-to-function": "on",
        "putout/convert-match-to-function": "on",
        "putout/convert-babel-types": "on",
        "putout/convert-destructuring-to-identifier": "on",
        "putout/convert-node-to-path-in-get-template-values": "on",
        "putout/convert-traverse-to-include": "on",
        "putout/convert-traverse-to-replace": "on",
        "putout/convert-process-to-find": "on",
        "putout/convert-method-to-property": "on",
        "putout/convert-add-argument-to-add-args": "on",
        "putout/convert-dirname-to-url": "on",
        "putout/convert-url-to-dirname": "on",
        "putout/convert-report-to-function": "on",
        "putout/shorten-imports": "on",
        "putout/check-replace-code": "on",
        "putout/declare": "on",
        "putout/includer": "on",
        "putout/move-require-on-top-level": "on",
        "putout/replace-test-message": "on"
    }
}
```

## apply-processors-destructuring

### ❌ Example of incorrect code

```js
test('', async (t) => {
    await t.process({});
});

```

### ✅ Example of correct code

```js
test('', async ({process}) => {
    await process({});
});
```

## apply-remove

Better to use [`remove(path)`](https://github.com/coderaiser/putout/tree/master/packages/operate#removepath) method of `operator`.
It helps to preserve comments.

### ❌ Example of incorrect code

```js
export const fix = (path) => {
    path.remove();
};
```

### ✅ Example of correct code

```js
import {operator} from 'putout';
const {remove} = operator;

export const fix = (path) => {
    remove(path);
};
```

## apply-declare

Better to use [`Declareator`](https://github.com/coderaiser/putout/tree/master/packages/engine-runner#declarator) instead of `operator.declare()`.

### ❌ Example of incorrect code

```js
const {operator} = require('putout');
const {declare} = operator;

module.exports = declare({
    tryCatch: `import tryCatch from 'try-catch'`,
    tryToCatch: `import tryToCatch from 'try-to-catch'`,
});
```

### ✅ Example of correct code

```js
module.exports.declare = () => ({
    tryCatch: `import tryCatch from 'try-catch'`,
    tryToCatch: `import tryToCatch from 'try-to-catch'`,
});
```

## apply-async-formatter

### ❌ Example of incorrect code

```js
test('formatter: codeframea', (t) => {
    t.format(codeframe, 1);
    t.end();
});
```

### ✅ Example of correct code

```js
test('formatter: codeframea', async ({format}) => {
    await format(codeframe, 1);
});
```

## apply-create-test

### ❌ Example of incorrect code

```js
const test = require('@putout/test')({
    'remove-debugger': plugin,
});
```

### ✅ Example of correct code

```js
const {createTest} = require('@putout/test');
const test = createTest({
    'remove-debugger': plugin,
});
```

## convert-number-to-numeric

Prevent `Babel` warning: `The node type NumberLiteral has been renamed to NumericLiteral`.

### ❌ Example of incorrect code

```js
const {isNumberLiteral} = types;
isNumberLiteral(node);
```

### ✅ Example of correct code

```js
const {isNumericLiteral} = types;
isNumericLiteral(node);
```

## convert-putout-test-to-create-test

Fixes results of [@putout/convert-commonjs-to-esm](https://github.com/coderaiser/putout/tree/master/packages/plugin-convert-commonjs-to-esm) work.

### ❌ Example of incorrect code

```js
import putoutTest from '@putout/test';

const test = putoutTest(__dirname, {
    'remove-unused-variables': rmVars,
});
```

### ✅ Example of correct code

```js
import {createTest} from '@putout/test';

const test = createTest(__dirname, {
    'remove-unused-variables': rmVars,
});
```

## convert-to-no-transform-code

### ❌ Example of incorrect code

```js
test('plugin-apply-destructuring: transform: array: destructuring', (t) => {
    const code = 'const {name} = array[0]';
    
    t.transform(code, '');
    t.end();
});
```

### ✅ Example of correct code

```js
test('plugin-apply-destructuring: transform: array: destructuring', (t) => {
    const code = 'const {name} = array[0]';
    
    t.noTransformCode(code);
    t.end();
});
```

## convert-replace-with

### ❌ Example of incorrect code

```js
module.exports.fix = (path) => {
    path.replaceWith(Identifier('hello'));
};
```

### ✅ Example of correct code

```js
const {replaceWith} = require('putout').operator;

module.exports.fix = (path) => {
    replaceWith(path, Identifier('hello'));
};
```

## convert-replace-with-multiple

### ❌ Example of incorrect code

```js
module.exports.fix = (path) => {
    path.replaceWithMultiple([Identifier('hello')]);
};
```

### ✅ Example of correct code

```js
const {replaceWithMultiple} = require('putout').operator;

module.exports.fix = (path) => {
    replaceWithMultiple(path, [Identifier('hello')]);
};
```

## convert-replace-to-function

### ❌ Example of incorrect code

```js
module.exports.replace = {
    'let __a = __b': 'const __b = __a',
};
```

### ✅ Example of correct code

```js
module.exports.replace = () => ({
    'let __a = __b': 'const __b = __a',
});
```

## convert-match-to-function

### ❌ Example of incorrect code

```js
module.exports.match = {
    'let __a = __b': () => false,
};
```

### ✅ Example of correct code

```js
module.exports.match = () => ({
    'let __a = __b': () => false,
});
```

## convert-babel-types

### ❌ Example of incorrect code

```js
const {
    ObjectExpression,
    SpreadElement,
    isObjectExpression,
    isIdentifier,
} = require('@babel/types');
```

### ✅ Example of correct code

```js
const {
    ObjectExpression,
    SpreadElement,
    isObjectExpression,
    isIdentifier,
} = require('putout').types;
```

## convert-destructuring-to-identifier

### ❌ Example of incorrect code

```js
module.exports.replace = () => ({
    'const __a = __b': ({}) => {
    },
    'const __c = __d': ({}, path) => {
    },
});
```

### ✅ Example of correct code

```js
module.exports.replace = () => ({
    'const __a = __b': (vars) => {
    },
    'const __c = __d': (vars, path) => {
    },
});
```

## convert-node-to-path-in-get-template-values

### ❌ Example of incorrect code

```js
const {__a, __b} = getTemplateValues(path.node, 'const __a = __b');
```

### ✅ Example of correct code

```js
const {__a, __b} = getTemplateValues(path, 'const __a = __b');
```

## shorten-imports

### ❌ Example of incorrect code

```js
const parseOptions = require('putout/lib/parse-options');
```

### ✅ Example of correct code

```js
const parseOptions = require('putout/parse-options');
```

## convert-traverse-to-include

### ❌ Example of incorrect code

```js
module.exports.traverse = ({push}) => ({
    TSTypeAssertion(path) {
        push(path);
    },
});
```

### ✅ Example of correct code

```js
module.exports.include = () => [
    'TSTypeAssertion',
];
```

## convert-traverse-to-replace

### ❌ Example of incorrect code

```js
module.exports.traverse = () => ({
    'async (__a) => __b': 'async ({process}) => __b',
});
```

### ✅ Example of correct code

```js
module.exports.replace = () => ({
    'async (__a) => __b': 'async ({process}) => __b',
});
```

## convert-process-to-find

### ❌ Example of incorrect code

```js
module.exports.preProcess = () => {};
module.exports.postProcess = () => {};
```

### ✅ Example of correct code

```js
module.exports.branch = (rawSource) => [];
module.exports.merge = (processedSource, list) => '';
```

## convert-method-to-property

- property simpler to work with;
- support of [`convert-destructuring-to-identifier`](#convert-destructuring-to-identifier) which is `Replacer`, while `convert-method-to-property` is `Includer` (searches for `ObjectMethod` node);

### ❌ Example of incorrect code

```js
module.exports.match = () => ({
    'module.exports.traverse = __a'({}, path) {
    },
});
```

### ✅ Example of correct code

```js
module.exports.match = () => ({
    'module.exports.traverse = __a': ({}, path) => {
    },
});
```

## check-replace-code

Checks that [Replacer](https://github.com/coderaiser/putout/tree/master/packages/engine-runner#replacer) transform is possible.

### ❌ Example of incorrect code

```js
module.exports.replace = () => ({
    'if (__a = __b) __body': 'if (__a === "__b") __body',
});
```

There is no `fix` for this rule, it used internally to be more confident about `test coverage`, because of declaration form, transforms cannon be checked by `nyc` and `c8`, and uncovered lines can find unfixable false positives when running on code.
This is additional tests, if you forget to test some case (from a big list of rules that is supported) it will be checked with this `rule` and make transforms more stable.

## declare

Depends on [@putout/convert-esm-to-commonjs](https://github.com/coderaiser/putout/tree/master/packages/plugin-convert-esm-to-commonjs#readme) and
[@putout/declare](https://github.com/coderaiser/putout/tree/master/packages/plugin-declare#readme).

### ❌ Example of incorrect code

```js
compare(a, 'const __a = __b');
isIdentifier(a);
```

### ✅ Example of correct code

```js
const {operator, types} = require('putout');
const {compare} = operator;
const {isIdentifier} = types;

compare(a, 'const __a = __b');
isIdentifier(a);
```

## add-args

### ❌ Example of incorrect code

```js
test('', () => {
    comparePlaces();
});
```

### ✅ Example of correct code

```js
test('', ({comparePlaces}) => {
    comparePlaces();
});
```

## add-push

### ❌ Example of incorrect code

```js
module.exports.traverse = () => ({
    '__a.replace(/__b/g, __c)': (path) => {
        push(path);
    },
});
```

### ✅ Example of correct code

```js
module.exports.traverse = ({push}) => ({
    '__a.replace(/__b/g, __c)': (path) => {
        push(path);
    },
});
```

## convert-add-argument-to-add-args

### ❌ Example of incorrect code

```js
const {operator} = require('putout');
const {addArgument} = operator;

module.exports = addArgument({
    t: ['t', 'test("__a", (__args) => __body)'],
});
```

### ✅ Example of correct code

```js
const {operator} = require('putout');
const {addArgs} = operator;

module.exports = addArgs({
    t: ['t', 'test("__a", (__args) => __body)'],
});
```

## convert-dirname-to-url

### ❌ Example of incorrect code

```js
import {createTest} from '@putout/test';
import plugin from '@putout/plugin-debugger';
import {createSimport} from 'simport';
const {__dirname} = createSimport(import.meta.url);

const test = createTest(__dirname, {
    'remove-debugger': plugin,
});
```

### ✅ Example of correct code

```js
import {createTest} from '@putout/test';
import plugin from '@putout/plugin-debugger';

const test = createTest(import.meta.url, {
    'remove-debugger': plugin,
});
```

## convert-url-to-dirname-

### ❌ Example of incorrect code

```js
const {createTest} = require('@putout/test');
const plugin = require('@putout/plugin-debugger');

const test = createTest(__dirname, {
    'remove-debugger': plugin,
});
```

### ✅ Example of correct code

```js
const {createTest} = require('@putout/test');
const plugin = require('@putout/plugin-debugger');

const test = createTest(import.meta.url, {
    'remove-debugger': plugin,
});
```

## convert-report-to-function

### ❌ Example of incorrect code

```js
module.exports.report = `'report' should be a 'function'`;
```

### ✅ Example of correct code

```js
module.exports.report = () => `'report' should be a 'function'`;
```

## move-require-on-top-level

### ❌ Example of incorrect code

```js
const test = require('@putout/test')(__dirname, {
    'remove-debugger': require('..'),
});

test('remove debugger: report', (t) => {
    t.transform('debugger', {
        'remove-debugger': require('..'),
    });
    t.end();
});
```

### ✅ Example of correct code

```js
const removeDebugger = require('..');
const test = require('@putout/test')(__dirname, {
    'remove-debugger': removeDebugger,
});

test('remove debugger: report', (t) => {
    const test = require('@putout/test')(__dirname, {
        'remove-debugger': removeDebugger,
    });
    t.end();
});
```

## includer

### ❌ Example of incorrect code

```js
module.exports.include = () => 'cons __a = __b';
module.exports.exclude = () => 'var __a = __b';

module.exports.include = 'cons __a = __b';
module.exports.exclude = 'var __a = __b';

module.exports.include = ['cons __a = __b'];
module.exports.exclude = ['var __a = __b'];
```

### ✅ Example of correct code

```js
module.exports.include = () => ['cons __a = __b'];
module.exports.exclude = () => ['var __a = __b'];

module.exports.include = () => ['cons __a = __b'];
module.exports.exclude = () => ['var __a = __b'];

module.exports.include = () => ['cons __a = __b'];
module.exports.exclude = () => ['var __a = __b'];
```

## replace-test-message

Checks that `test message` and used `operator` are synchronized.
Check it out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/d9c6972ea848ba8e7e745d2479727b65/199c30b986ce7d544397c344ebfc5031c4b53181).

### ❌ Example of incorrect code

```js
test('plugin-putout: rename-operate-to-operator: transform: operator exist', (t) => {
    t.noTransform('operator');
    t.end();
});

test('plugin-putout: rename-operate-to-operator: report: operator exist', (t) => {
    t.noReport('operator');
    t.end();
});
```

### ✅ Example of correct code

```js
test('plugin-putout: rename-operate-to-operator: no transform: operator exist', (t) => {
    t.noTransform('operator');
    t.end();
});

test('plugin-putout: rename-operate-to-operator: no report: operator exist', (t) => {
    t.noReport('operator');
    t.end();
});
```

## License

MIT
