# @putout/plugin-printer [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-printer.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-printer "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) adds support of transformations for [`@putout/printer`](https://github.com/putoutjs/printer).

## Install

```
npm i @putout/plugin-printer -D
```

## Rules

- ✅ [add-args](#add-args);
- ✅ [add-missing-spaces-to-type-checker](#add-missing-spaces-to-type-checker);
- ✅ [add-missing-tuples-to-type-checker](#add-missing-tuples-to-type-checker);
- ✅ [apply-breakline](#apply-breakline);
- ✅ [apply-computed-print](#apply-computed-print);
- ✅ [apply-create-test-url](#apply-create-test-url);
- ✅ [apply-linebreak](#apply-linebreak);
- ✅ [apply-types](#apply-types);
- ✅ [check-type-passed-to-type-checker](#check-type-passed-to-type-checker);
- ✅ [declare](#declare);
- ✅ [remove-args](#remove-args);
- ✅ [remove-useless-maybe](#remove-useless-maybe);
- ✅ [remove-legacy-test-declaration](#remove-legacy-test-declaration);
- ✅ [remove-trailing-spaces-from-type-checker](#remove-trailing-spaces-from-type-checker)
- ✅ [remove-useless-spaces-from-type-checker](#remove-useless-spaces-from-type-checker)
- ✅ [remove-useless-tuples-from-type-checker](#remove-useless-tuples-from-type-checker)

## Config

```json
{
    "rules": {
        "printer/add-args": "on",
        "printer/add-missing-tuples-to-type-checker": "on",
        "printer/apply-breakline": "on",
        "printer/apply-linebreak": "on",
        "printer/apply-computed-print": "on",
        "printer/apply-create-test-url": "on",
        "printer/apply-types": "on",
        "printer/check-type-passed-to-type-checker": "on",
        "printer/declare": "on",
        "printer/remove-args": "on",
        "printer/remove-useless-maybe": "on",
        "printer/remove-trailing-spaces-from-type-checker": "on",
        "printer/remove-useless-spaces-from-type-checker": "on",
        "printer/remove-useless-tuples-from-type-checker": "on"
    }
}
```

## apply-breakline

```diff
-print.newline();
-indent();
print.breakline();
```

## apply-linebreak;

```diff
-indent();
-print.newline();
print.linebreak();
```

## apply-types

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/8a88fec812a52e302cf7b191eca2f49e/474ca87860d2eab755373ba9dc8b12efc4a80252).

```diff
-const {isIdentifier} = require('@babel/types');
+const {types} = require('@babel/types');
+const {isIdentifier} = types;
```

## add-args

### ❌ Example of incorrect code

```js
module.exports = {
    TSPropertySignature(path) {
        const {optional} = path.node;
        print('__key');
        maybe.print(optional, '?');
    },
};
```

### ✅ Example of correct code

```js
module.exports = {
    TSPropertySignature(path, {print, maybe}) {
        const {optional} = path.node;
        print('__key');
        maybe.print(optional, '?');
    },
};
```

## add-missing-spaces-to-type-checker

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/2451cd51ebd3dfd20c32b6d22ca176b7/bd593860ff4bb2d66e06cf95bbe103cb1203129d).

### ❌ Example of incorrect code

```js
export const beforeIf = createTypeChecker([
    ['-:->!', isInsideArray],
    ['-:parentPath->', isCoupleLines],
]);
```

### ✅ Example of correct code

```js
export const beforeIf = createTypeChecker([
    ['-: -> !', isInsideArray],
    ['-: parentPath ->', isCoupleLines],
]);
```

## add-missing-tuple-to-type-checker

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/9fdfda423df3af9b0f08541710706299/0259bba117997861fe7573bad5477282f4df8554).

### ❌ Example of incorrect code

```js
export const beforeIf = createTypeChecker([
    '- : -> !StringLiteral',
    '- : -> BlockStatement',
    '- : -> WrongType',
    ['- : ->', isBlockStatement],
    ['-', isBlockStatement],
]);
```

### ✅ Example of correct code

```js
export const beforeIf = createTypeChecker([
    ['- : -> !StringLiteral'],
    ['- : -> BlockStatement'],
    ['- : -> WrongType'],
    ['- : ->', isBlockStatement],
    ['-', isBlockStatement],
]);
```

## apply-computed-print

### ❌ Example of incorrect code

```js
print(path.get('block'));
```

### ✅ Example of correct code

```js
print('__block');
```

## apply-create-test-url

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/ddf1425ace2a53e9010b82ded1dd1012/3e56365b58d01ebe8abba46caf04ed5e51043feb).

### ❌ Example of incorrect code

```js
import {createTest} from '#test';

const {test, fixture} = createTest(__dirname);
```

### ✅ Example of correct code

```js
import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);
```

## remove-args

### ❌ Example of incorrect code

```js
print.indent(is);
```

### ✅ Example of correct code

```js
print.indent();
```

## remove-useless-maybe

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/d448a928400ff37043ae03510ce7c85c/db1a758809e8759f591533f9ef92bef1188d32b0).

### ❌ Example of incorrect code

```js
maybe.print.linebreak(wasNewline);
maybe.print.newline(!wasNewline);
```

### ✅ Example of correct code

```js
maybe.indent(wasNewline);
print.newline();
```

## remove-useless-spaces-from-type-checker

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/2e90aa74898a496b488f9c369801b47a/fbd700d965952e80588ec61054b3ed7aee4d17a2).

### ❌ Example of incorrect code

```js
export const beforeIf = createTypeChecker([
    ['- : -> !', isInsideArray],
]);
```

### ✅ Example of correct code

```js
export const beforeIf = createTypeChecker([
    ['-: -> !', isInsideArray],
]);
```

## remove-useless-tuples-from-type-checker

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/f53f386b607115e0a96f7e294e34761e/cefd72aba4fcade59bbf8faa59739bac5c2fe057).

### ❌ Example of incorrect code

```js
export const allStrings = createTypeChecker([
    ['- : -> BlockStatement'],
    ['- : -> WrongType'],
]);
```

### ✅ Example of correct code

```js
export const allStrings = createTypeChecker([
    '- : -> BlockStatement',
    '- : -> WrongType',
]);
```

## remove-trailing-spaces-from-type-checker

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/91d33e39485c31e76b534ad8447ba4db/abca8d21ad6edc1f6fed23edb05fa166677f11d6).

### ❌ Example of incorrect code

```js
export const beforeIf = createTypeChecker([
    ['-: parentPath -> ', isCoupleLines],
]);
```

### ✅ Example of correct code

```js
export const beforeIf = createTypeChecker([
    ['-: parentPath ->', isCoupleLines],
]);
```

## check-type-passed-to-type-checker

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/9b35f5f2f23bece832f0f87c929d30e2/b08df8ef8ce6c2a03bceebe6119846c45a78a119).

### ❌ Example of incorrect code

```js
export const beforeIf = createTypeChecker([
    ['- : -> WrongType'],
]);
```

### ✅ Example of correct code

```js
export const beforeIf = createTypeChecker([
    ['- : -> 🧨 WrongType'],
]);
```

## declare

### ❌ Example of incorrect code

```js
isIdentifier();

test('', (t) => {
    t.print(fixture.returnStatement);
});
```

### ✅ Example of correct code

```js
const {types} = require('@putout/babel');
const {createTest} = require('#test');

const {test, fixture} = createTest(__dirname);
const {isIdentifier} = types;

isIdentifier();

test('', (t) => {
    t.print(fixture.returnStatement);
});
```

## remove-legacy-test-declaration

```diff
-const {printExtension} = require('../../../test/printer');
-const {readFixtures} = require('../../../test/fixture');
-
-const fixture = readFixtures(__dirname);
-
-const test = extend({
-    print: printExtension,
-});
```

## License

MIT
