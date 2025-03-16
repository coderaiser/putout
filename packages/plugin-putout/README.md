# @putout/plugin-putout [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-putout.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-putout "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin helps with plugins development.

## Install

```
npm i @putout/plugin-putout -D
```

## Rules

- ✅ [add-await-to-progress](#add-await-to-progress);
- ✅ [add-index-to-import](#add-index-to-import);
- ✅ [add-places-to-compare-places](#add-places-to-compare-places);
- ✅ [add-path-arg-to-fix](#add-path-arg-to-fix);
- ✅ [add-path-arg-to-visitors](#add-path-arg-to-visitors);
- ✅ [add-test-args](#add-test-args);
- ✅ [add-traverse-args](#add-traverse-args);
- ✅ [add-track-file](#add-track-file);
- ✅ [apply-async-formatter](#apply-async-formatter);
- ✅ [apply-create-test](#apply-create-test);
- ✅ [apply-create-nested-directory](#apply-create-nested-directory);
- ✅ [apply-declare](#apply-declare);
- ✅ [apply-for-of-to-track-file](#apply-for-of-to-track-file);
- ✅ [apply-fixture-name-to-message](#apply-fixture-name-to-message);
- ✅ [apply-insert-after](#apply-insert-after);
- ✅ [apply-insert-before](#apply-insert-before);
- ✅ [apply-vars](#apply-vars);
- ✅ [apply-lowercase-to-node-builders](#apply-lowercase-to-node-builders);
- ✅ [apply-namespace-specifier](#apply-namespace-specifier);
- ✅ [apply-report](#apply-report);
- ✅ [apply-processors-destructuring](#apply-processors-destructuring);
- ✅ [apply-remove](#apply-remove);
- ✅ [apply-rename](#apply-rename);
- ✅ [apply-parens](#apply-parens);
- ✅ [apply-short-processors](#apply-short-processors);
- ✅ [check-match](#check-match);
- ✅ [check-declare](#check-declare);
- ✅ [check-replace-code](#check-replace-code);
- ✅ [convert-add-argument-to-add-args](#convert-add-argument-to-add-test-args);
- ✅ [convert-babel-types](#convert-babel-types);
- ✅ [convert-destructuring-to-identifier](#convert-destructuring-to-identifier);
- ✅ [convert-dirname-to-url](#convert-dirname-to-url);
- ✅ [convert-find-to-traverse](#convert-find-to-traverse);
- ✅ [convert-get-rule-to-require](#convert-get-rule-to-require);
- ✅ [convert-match-to-function](#convert-match-to-function);
- ✅ [convert-method-to-property](#convert-method-to-property);
- ✅ [convert-node-to-path-in-get-template-values](#convert-node-to-path-in-get-template-values);
- ✅ [convert-number-to-numeric](#convert-number-to-numeric);
- ✅ [convert-process-to-find](#convert-process-to-find);
- ✅ [convert-progress-to-track-file](#convert-progress-to-track-file);
- ✅ [convert-putout-test-to-create-test](#convert-putout-test-to-create-test);
- ✅ [convert-replace-to-function](#convert-replace-to-function);
- ✅ [convert-replace-with](#convert-replace-with);
- ✅ [convert-replace-with-multiple](#convert-replace-with-multiple);
- ✅ [convert-report-to-function](#convert-report-to-function);
- ✅ [convert-to-no-transform-code](#convert-to-no-transform-code);
- ✅ [convert-include-to-traverse](#convert-include-to-traverse);
- ✅ [convert-traverse-to-include](#convert-traverse-to-include);
- ✅ [convert-traverse-to-replace](#convert-traverse-to-replace);
- ✅ [convert-traverse-to-scan](#convert-traverse-to-scan);
- ✅ [convert-url-to-dirname](#convert-url-to-dirname);
- ✅ [create-test](#create-test);
- ✅ [declare](#declare);
- ✅ [declare-template-variables](#declare-template-variables);
- ✅ [declare-path-variable](#declare-path-variable);
- ✅ [includer](#includer);
- ✅ [move-require-on-top-level](#move-require-on-top-level);
- ✅ [remove-empty-array-from-process](#remove-empty-array-from-process);
- ✅ [remove-unused-get-properties-argument](#remove-unused-get-properties-argument);
- ✅ [remove-useless-printer-option](#remove-useless-printer-option);
- ✅ [rename-operate-to-operator](#rename-operate-to-operator);
- ✅ [replace-operate-with-operator](#replace-operate-with-operator);
- ✅ [replace-test-message](#replace-test-message);
- ✅ [shorten-imports](#shorten-imports);
- ✅ [simplify-replace-template](#simplify-replace-template);

## Config

```json
{
    "rules": {
        "putout/add-places-to-compare-places": "on",
        "putout/add-path-arg-to-fix": "on",
        "putout/add-path-arg-to-visitors": "on",
        "putout/add-test-args": "on",
        "putout/add-traverse-args": "on",
        "putout/add-track-file": "on",
        "putout/add-await-to-progress": "on",
        "putout/add-index-to-import": "on",
        "putout/apply-create-test": "on",
        "putout/apply-create-nested-directory": "on",
        "putout/apply-async-formatter": "on",
        "putout/apply-declare": "on",
        "putout/apply-report": "on",
        "putout/apply-processors-destructuring": "on",
        "putout/apply-rename": "on",
        "putout/apply-parens": "on",
        "putout/apply-remove": "on",
        "putout/apply-insert-before": "on",
        "putout/apply-insert-after": "on",
        "putout/apply-vars": "on",
        "putout/apply-short-processors": "on",
        "putout/apply-lowercase-to-node-builders": "on",
        "putout/apply-namespace-specifier": "on",
        "putout/apply-for-of-to-track-file": "on",
        "putout/apply-fixture-name-to-message": "on",
        "putout/check-match": "on",
        "putout/check-declare": "on",
        "putout/check-replace-code": ["on", {
            "once": true
        }],
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
        "putout/convert-include-to-traverse": "on",
        "putout/convert-traverse-to-include": "on",
        "putout/convert-traverse-to-replace": "on",
        "putout/convert-traverse-to-scan": "on",
        "putout/convert-process-to-find": "on",
        "putout/convert-method-to-property": "on",
        "putout/convert-add-argument-to-add-args": "on",
        "putout/convert-dirname-to-url": "on",
        "putout/convert-url-to-dirname": "on",
        "putout/convert-report-to-function": "on",
        "putout/convert-get-rule-to-require": "on",
        "putout/convert-progress-to-track-file": "on",
        "putout/create-test": "on",
        "putout/shorten-imports": "on",
        "putout/declare": "on",
        "putout/declare-template-variables": "on",
        "putout/declare-path-variable": "on",
        "putout/includer": "on",
        "putout/move-require-on-top-level": "on",
        "putout/replace-test-message": "on",
        "putout/remove-unused-get-properties-argument": "on",
        "putout/remove-empty-array-from-process": "on",
        "putout/remove-useless-printer-option": "on",
        "putout/simplify-replace-template": "on"
    }
}
```

## apply-lowercase-to-node-builders

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/fe78f6e48998fb39fa7e53e4046f1fc0/e1e6f2387895ff2ab98b4a9bcd2e8d565f7c3f16).

### ❌ Example of incorrect code

```js
path.node = Identifier('x');
```

### ✅ Example of correct code

```js
path.node = identifier('x');
```

## apply-report

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/e9debc0b256556a632fb031be86afffc/afefbd44443f07dbb7d8f2972f2e40a9a82c214f).

### ❌ Example of incorrect code

```js
t.noReport('rename-files-full', {
    from: ['/'],
    to: [],
});

t.noReportWithOptions('rename-files-full');

t.noReport('a', 'Use b');
t.report('a');
```

### ✅ Example of correct code

```js
t.noReportWithOptions('rename-files-full', {
    from: ['/'],
    to: [],
});

t.noReport('rename-files-full');

t.report('a', 'Use b');
t.noReport('a');
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

## apply-short-processors

Apply short names of processors, for example `__json` instead of `__putout_processor_json` . Checkout out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/908151edd3ee8d6a07d589df1e863883/1bd1eeadadea40915a2079f33a3845fa4fedda8e).

### ❌ Example of incorrect code

```js
export const match = () => ({
    '__putout_processor_ignore(__a)': ({__a}) => {
        const list = __a.elements.map(getValue);
    },
    '__putout_processor_filesystem(__a)': ({__a}) => {
        const list = __a.elements.map(getValue);
    },
});
```

### ✅ Example of correct code

```js
export const match = () => ({
    [__ignore]: ({__array}) => {
        const list = __array.elements.map(getValue);
    },
    [__filesystem]: ({__object}) => {
        const list = __object.elements.map(getValue);
    },
});
```

## apply-rename

Better use [`rename(path, from, to)`](https://github.com/coderaiser/putout/tree/master/packages/operate#rename) method of `operator`.
Check out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/22716f61af86351331fc92260b7ed8e6/1435f31954764c119813e03654caa36e6a2a666b).

### ❌ Example of incorrect code

```js
export const fix = ({path, from, to}) => {
    path.scope.rename(from, to);
};
```

### ✅ Example of correct code

```js
import {operator} from 'putout';

const {rename} = operator;

export const fix = ({path, from, to}) => {
    rename(path, from, to);
};
```

## apply-parens

Better use [`addParens(path)`](https://github.com/coderaiser/putout/tree/master/packages/operate#addparenspath-path) method of `operator` instead of using `path.node.extra` to have support of both printers:

- ✅ `@putout/printer`;
- ✅ `babel`;

Check out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/d325a84e26807d46b5ec14db179c38f4/8bcd22d6dbe880c0fd70992a1a36b9c609b53b22).

### ❌ Example of incorrect code

```js
path.node.extra.parenthesized = false;
path.node.extra.parenthesized = true;

if (!path.node.extra?.parenthesized)
    return;
```

### ✅ Example of correct code

```js
removeParens(path);
addParens(path);

if (!hasParens(path))
    return;
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

## apply-insert-before

Better to use [`insertBefore(a, b)`](https://github.com/coderaiser/putout/tree/master/packages/operate#insert-before) method of `operator`.

### ❌ Example of incorrect code

```js
export const fix = (path) => {
    path.insertBefore(path.get('init'));
};
```

### ✅ Example of correct code

```js
import {operator} from 'putout';

const {insertBefore} = operator;

export const fix = (path) => {
    insertBefore(path, path.get('init'));
};
```

## apply-insert-after

Better to use [`insertAfter(a, b)`](https://github.com/coderaiser/putout/tree/master/packages/operate#insert-after) method of `operator`.
It helps to avoid duplication of comments.

### ❌ Example of incorrect code

```js
export const fix = (path) => {
    path.insertAfter(path.get('init'));
};
```

### ✅ Example of correct code

```js
import {operator} from 'putout';

const {insertAfter} = operator;

export const fix = (path) => {
    insertAfter(path, path.get('init'));
};
```

## apply-vars

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/6b1a4b5dc75f2591faf580774d23b38f/7278945371ceb76942494f7caf88375d2eaca869).

### ❌ Example of incorrect code

```js
export const replace = () => ({
    '__a(__args': ({}, path) => {
        return true;
    },
});

export const match = () => ({
    '__a(__args': ({}, path) => {
        return '';
    },
});
```

### ✅ Example of correct code

```js
export const replace = () => ({
    '__a(__args': (vars, path) => {
        return true;
    },
});

export const match = () => ({
    '__a(__args': (vars, path) => {
        return '';
    },
});
```

## apply-declare

Better to use [`Declareator`](https://github.com/coderaiser/putout/tree/master/packages/engine-runner#declarator) instead of `operator.declare()`.
Check out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/cf35de5e80e8f7aad866358a50c5eded/0af6142fc9c9e71ac2a2aa96cb85613dd95c9fbf).

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

## apply-create-nested-directory

Checkout in [**Putout Editor**](https://putout.cloudcmd.io/#/gist/d97578b334963b2f573d1980a61034de/0b876a781268916344fa0ed4c19bdbc9fd7bbc3f).

### ❌ Example of incorrect code

```js
const dirPath = createDirectory(path, '/hello/world');
const dirPath2 = createNestedDirectory(path, 'world');
```

### ✅ Example of correct code

```js
const dirPath = createNestedDirectory(path, '/hello/world');
const dirPath2 = createDirectory(path, 'world');
```

## apply-for-of-to-track-file

> The **Generator** object is returned by a `generator function` and it conforms to both the iterable protocol and the `iterator` protocol.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)

`trackFile` is generator function used to count progress that can be used in [**Scanner**](https://github.com/coderaiser/putout/tree/master/packages/engine-runner#scanner).

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/5ec6c384aa6e4471aab17efb86e185f3/e749c7d649ef2da76410a5964e7c875d10538789)

### ❌ Example of incorrect code

```js
module.exports.scan = (path, {push, trackFile}) => {
    trackFile(path, '*.swp').map(push);
};
```

### ✅ Example of correct code

```js
module.exports.scan = (path, {push, trackFile}) => {
    for (const file of trackFile(path, '*.swp')) {
        push(file);
    }
};
```

## create-test

Add properties to `createTest` options, here is exmample of `.putout.json`:

```json
{
    "rules": {
        "putout/create-test": ["on", {
            "add": [
                ["printer", "putout"]
            ]
        }]
    }
}
```

Check it out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/e2a9f02d352c064ac9a11688feadc923/2a525f0a8a2794c9d26c23914801c512f347abef).

### ❌ Example of incorrect code

```js
createTest(__dirname, {
    'putout/create-test': plugin,
});
```

### ✅ Example of correct code

```js
createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['putout/create-test', plugin],
    ],
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

Fixes results of [@putout/convert-commonjs-to-esm](https://github.com/coderaiser/putout/tree/master/packages/plugin-convert-commonjs-to-esm#readme) work.

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
    path.replaceWithMultiple([
        Identifier('hello'),
    ]);
};
```

### ✅ Example of correct code

```js
const {replaceWithMultiple} = require('putout').operator;

module.exports.fix = (path) => {
    replaceWithMultiple(path, [
        Identifier('hello'),
    ]);
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
    'const __a = __b': ({}) => {},
    'const __c = __d': ({}, path) => {},
});
```

### ✅ Example of correct code

```js
module.exports.replace = () => ({
    'const __a = __b': (vars) => {},
    'const __c = __d': (vars, path) => {},
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

## convert-include-to-traverse

Checkout in 🐊[**Putout Editor*](https://putout.cloudcmd.io/#/gist/a41b5c943a74b59a6c18f31fc6d31937/d79c6084f49b6444536840bc2fc1fba725ba83f8).

### ❌ Example of incorrect code

```js
export const include = () => ({
    ClassDeclaration(path) {},
});
```

### ✅ Example of correct code

```js
export const traverse = () => ({
    ClassDeclaration(path) {},
});
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

## convert-traverse-to-scan

Checkout in 🐊**Putout Editor**:

- [`Traverser`](https://putout.cloudcmd.io/#/gist/afe988c8e53ae70e50bf26512672f3cd/a6677d53b996e85880a4af18250c00e849322bbe);
- [`Replacer`](https://putout.cloudcmd.io/#/gist/2e89f498c88f3208beeb85dd01a9178e/ed975281c57f451fc1c3aaf187425a33499af71d);

### ❌ Example of incorrect code

```js
module.exports.traverse = ({push, options}) => ({
    [__filesystem](path) {
        const {names} = options;
        
        for (const name of names) {
            const files = findFile(path, name);
            
            for (const file of files) {
                push({
                    name,
                    path: file,
                });
            }
        }
    },
});
```

### ✅ Example of correct code

```js
module.exports.scan = (path, {push, options}) => {
    const {names} = options;
    
    for (const name of names) {
        const files = findFile(path, name);
        
        for (const file of files) {
            push(file, {
                name,
            });
        }
    }
};
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
    'module.exports.traverse = __a'({}, path) {},
});
```

### ✅ Example of correct code

```js
module.exports.match = () => ({
    'module.exports.traverse = __a': ({}, path) => {},
});
```

## check-declare

Checks that [Declarator](https://github.com/coderaiser/putout/tree/master/packages/engine-runner#declarator) transform is possible.
Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/9fccb187bb8933afff0dc0db57b3cea8/25cb812978fadb4efb5f0cb44058a61f70f8b78e):

### ❌ Example of incorrect code

```js
module.exports.declare = () => ({
    isNumber: 'const isNumber = () => {}',
    isString: 'const isNumber = () => {}',
});
```

☝️ *There is no `fix` for this rule, it used internally to be more confident about `test coverage`, because of declaration form, transforms cannon be checked by `nyc` and `c8`, and uncovered lines can find unfixable false positives when running on code.
This is additional tests, if you forget to test some case (from a big list of rules that is supported) it will be checked with this `rule` and make transforms more stable.*

## check-replace-code

Checks that [Replacer](https://github.com/coderaiser/putout/tree/master/packages/engine-runner#replacer) transform is possible.
Pass `once=false` to always fail no matter how many `fixCounts` passed.

### ❌ Example of incorrect code

```js
module.exports.replace = () => ({
    'if (__a = __b) __body': 'if (__a === "__b") __body',
});
```

☝️ *There is no `fix` for this rule, it used internally to be more confident about `test coverage`, because of declaration form, transforms cannon be checked by `nyc` and `c8`, and uncovered lines can find unfixable false positives when running on code.
This is additional tests, if you forget to test some case (from a big list of rules that is supported) it will be checked with this `rule` and make transforms more stable.*

## check-match

Checks that [Replacer](https://github.com/coderaiser/putout/tree/master/packages/engine-runner#replacer) `match()` keys exists in `replace`.
Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/c245bee6b129614b2f68c2e89fc3b101/d9f935ccd7f41ff166111cd62277f3244b1d526e).

### ❌ Example of incorrect code

```js
module.exports.match = () => ({
    '__a = __b': (vars, path) => {},
});

module.exports.replace = () => ({
    '__a = __': '__a',
});
```

☝️ *There is no `fix` for this rule, it used internally to be more confident about `test coverage`, because of declaration form, transforms cannon be checked by `nyc` and `c8`, and uncovered lines can find unfixable false positives when running on code.
This is additional tests, if you forget to test some case (from a big list of rules that is supported) it will be checked with this `rule` and make transforms more stable.*

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

## declare-template-variables

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/71ae86cc372dca8adc79bf53c49e8d5f/c9c8517ee932c18abcfda10c0515253b907ee485).

### ❌ Example of incorrect code

```js
export const match = () => ({
    '__a(__args': (vars, path) => {
        fn(x);
        
        return __args[__a];
    },
});
```

### ✅ Example of correct code

```js
export const match = () => ({
    '__a(__args': ({__args, __a}, path) => {
        fn(x);
        
        return __args[__a];
    },
});
```

## declare-path-variable

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/b485bf55785ea836408d0d45c492c3e4/2a0b465076242ebf6a0d8015a90ccf7b0b660a42).

### ❌ Example of incorrect code

```js
export const match = () => ({
    '__x __a __expr': ({__x}) => {
        if (path.isNextPunctuator(assign))
            return false;
        
        return isOneOfKeywords(__x, ['const', 'let', 'var']);
    },
});
```

### ✅ Example of correct code

```js
export const match = () => ({
    '__x __a __expr': ({__x}) => {
        if (path.isNextPunctuator(assign))
            return false;
        
        return isOneOfKeywords(__x, ['const', 'let', 'var']);
    },
});
```

## add-places-to-compare-places"

### ❌ Example of incorrect code

[`comparePlaces`](https://github.com/coderaiser/putout/tree/master/packages/test#compareplacesfilename-places-overrides) takes two or more arguments.

Checkout in 🐊[Putout Editor](https://putout.cloudcmd.io/#/gist/a83b1a6785bb01102451df4510333f42/a2439f7f44da56318d9a0e44b2602972811d9afb).

```js
comparePlaces('hello');
```

### ✅ Example of correct code

```js
comparePlaces('hello', []);
```

## add-path-arg-to-fix

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/3d3fb6b8f5e5376cdd1674c9b19e0e27/4872f77e680a2fc443618f4bf5fae3ffab11046a).

### ❌ Example of incorrect code

```js
export const fix = () => {
    path.remove();
};
```

### ✅ Example of correct code

```js
export const fix = (path) => {
    path.remove();
};
```

## add-path-arg-to-visitors

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/e20eb16668b2ebbceca1a03cde859e93/fee08d6dbb6aa4d835adacc8e9de4d994fd34848).

### ❌ Example of incorrect code

```js
export const traverse = () => ({
    TSUnionType() {
        console.log(path);
    },
});
```

### ✅ Example of correct code

```js
export const traverse = () => ({
    TSUnionType(path) {
        console.log(path);
    },
});
```

## add-test-args

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

## add-traverse-args

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/b453bd78b8e9380da8b2f33dfb38b4e2/53b14f89eb88aa10c8e00ba1f0251976592e14ee).
Supported args:

- `push`:

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

- [`store`](https://github.com/coderaiser/putout/blob/master/packages/engine-runner/README.md#store)

### ❌ Example of incorrect code

```js
module.exports.traverse = () => ({
    ImportDeclaration(path) {
        const {node} = path;
        const {name} = node.specifiers[0].local;
        
        store('name', name);
    },
});
```

### ✅ Example of correct code

```js
module.exports.traverse = ({store}) => ({
    ImportDeclaration(path) {
        const {node} = path;
        const {name} = node.specifiers[0].local;
        
        store('name', name);
    },
});
```

- [`listStore``](https://github.com/coderaiser/putout/blob/master/packages/engine-runner/README.md#liststore)

### ❌ Example of incorrect code

```js
export const traverse = () => ({
    ImportDeclaration(path) {
        listStore(path);
    },
});
```

### ✅ Example of correct code

```js
module.exports.traverse = ({listStore}) => ({
    ImportDeclaration(path) {
        listStore(path);
    },
});
```

- [`pathStore`](https://github.com/coderaiser/putout/blob/master/packages/engine-runner/README.md#pathstore)

### ❌ Example of incorrect code

```js
export const traverse = () => ({
    'module.exports.match = __object': pathStore,
});
```

### ✅ Example of correct code

```js
export const traverse = ({pathStore}) => ({
    'module.exports.match = __object': pathStore,
});
```

## add-await-to-progress

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/978d70945edfa369390ea059654ff04d/89225c04039b9c0e9057aad34852c9428264f119).

### ❌ Example of incorrect code

```js
test('', ({progress}) => {
    progress();
});
```

### ✅ Example of correct code

```js
test('', async ({progress}) => {
    await progress();
});
```

## add-track-file

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/faaba1ce41e6fd274bc82a8875a52bfa/b34a22fdf9080e6b2f06703760f629d83d69ff3d).

### ❌ Example of incorrect code

```js
export const scan = (root, {push, progress}) => {
    trackFile();
};
```

### ✅ Example of correct code

```js
export const scan = (root, {push, progress, trackFile}) => {
    trackFile();
};
```

## add-index-to-import

ESM doesn't add `index.js`, so it can be left after [`@putout/plugin-convert-esm-to-commonjs`](https://github.com/coderaiser/putout/blob/master/packages/plugin-convert-esm-to-commonjs#readme).
Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/b7c489710767efee95ecf3dd16e232a2/9f974f0a345ef4d0cb39b011097dff82e6c32b75).

### ❌ Example of incorrect code

```js
import insertRust from './insert-rust.js';
import addAction from './add-action.js';

export const rules = {};
```

### ✅ Example of correct code

```js
import insertRust from './insert-rust/index.js';
import addAction from './add-action/index.js';

export const rules = {};
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

## convert-url-to-dirname

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

## convert-progress-to-track

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/8736a0cf838a3660b0927e161e4fb06c/9f5c9f810babd4450898069d3d8dc28aceee1e2d).

### ❌ Example of incorrect code

```js
module.exports.scan = (root, {push, progress}) => {
    const files = findFile(root, ['*']);
    const n = files.length;
    
    for (const [i, file] of files.entries()) {
        push(file);
        progress({
            i,
            n,
        });
    }
};
```

### ✅ Example of correct code

```js
module.exports.scan = (root, {push, trackFile}) => {
    for (const file of trackFile(root, ['*'])) {
        push(file);
    }
};
```

## convert-get-rule-to-require

- ✅ import [Nested plugins](https://github.com/coderaiser/putout/tree/master/packages/engine-loader#nested-plugin) in [**Deno** and **Browser**](https://github.com/putoutjs/bundle/);
- ✅ easier bundle with rollup without [`dynamicRequireTargets`](https://github.com/rollup/plugins/tree/master/packages/commonjs/#dynamicrequiretargets);
- ✅ easier to migrate to **ESM**;

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/38336fcc5b5ae6e441697e098067319c/dd98578c9554b7bd5dceee0499118f7d8216e1da).

### ❌ Example of incorrect code

```js
module.exports.rules = {
    ...getRule('remove-unused-variables'),
};
```

### ✅ Example of correct code

```js
const removeUnusedVariables = require('./remove-unused-variables');

module.exports.rules = {
    'remove-unused-variables': removeUnusedVariables,
};
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
    t.transform('debugger', {
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

module.exports.include = [
    'cons __a = __b',
];

module.exports.exclude = [
    'var __a = __b',
];
```

### ✅ Example of correct code

```js
module.exports.include = () => [
    'cons __a = __b',
];

module.exports.exclude = () => [
    'var __a = __b',
];

module.exports.include = () => [
    'cons __a = __b',
];

module.exports.exclude = () => [
    'var __a = __b',
];

module.exports.include = () => [
    'cons __a = __b',
];

module.exports.exclude = () => [
    'var __a = __b',
];
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

## remove-empty-array-from-process

Check it out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/fc32ff87e91fd28f26a03f55eba0663e/3423926ba0a80d30beafe2ac66c70c517df173e1).

### ❌ Example of incorrect code

```js
await process('input', []);
```

### ✅ Example of correct code

```js
await process('input');
```

## remove-unused-get-properties-argument

Check it out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/fc32ff87e91fd28f26a03f55eba0663e/3423926ba0a80d30beafe2ac66c70c517df173e1).

### ❌ Example of incorrect code

```js
const {
    overridesPath,
    parserPath,
    rulesPath,
} = getProperties(__jsonPath, [
    'parser',
    'rules',
    'overrides',
    'extends',
]);
```

### ✅ Example of correct code

```js
const {
    overridesPath,
    parserPath,
    rulesPath,
} = getProperties(__jsonPath, ['parser', 'rules', 'extends']);
```

## remove-useless-printer-option

Check it out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/f176313cf67fd6d7138470385511319f/5b26aa45db21f250016d228b7bbabbb3c10b582b).
`putout` printer used by default, so there is no need to pass it.

### ❌ Example of incorrect code

```js
const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['remove-unchanged-zero-declarations', plugin],
    ],
});
```

### ✅ Example of correct code

```js
const test = createTest(__dirname, {
    plugins: [
        ['remove-unchanged-zero-declarations', plugin],
    ],
});
```

## simplify-replace-template

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/a012fc12f4d38038da022f7c8f379fe2/c65bf97c42650aa31c5481849bc934323df892a6).

### ❌ Example of incorrect code

```js
module.exports.replace = () => ({
    'if (__a) {__b} else {__c}': () => 'if (__a) __b; else __c',
});
```

### ✅ Example of correct code

```js
module.exports.replace = () => ({
    'if (__a) {__b} else {__c}': 'if (__a) __b; else __c',
});
```

## apply-fixture-name-to-message"

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/66eb493ee966c2465a9fc783cd3ca362/f42ec60e393181b6d6aaf6df81640e93fabe8783).

```js
test('flatlint: convert-comma-to-semicolon: no report: xxx', (t) => {
    t.noReport('array');
    t.end();
});
```

### ✅ Example of correct code

```js
test('flatlint: convert-comma-to-semicolon: no report: array', (t) => {
    t.noReport('array');
    t.end();
});
```

## License

MIT
