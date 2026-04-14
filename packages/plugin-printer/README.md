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
- ✅ [add-missing-colon-to-type-checker](#add-missing-spaces-to-type-checker);
- ✅ [add-missing-tuples-to-type-checker](#add-missing-tuples-to-type-checker);
- ✅ [apply-breakline](#apply-breakline);
- ✅ [apply-computed-print](#apply-computed-print);
- ✅ [apply-create-test-url](#apply-create-test-url);
- ✅ [apply-linebreak](#apply-linebreak);
- ✅ [apply-types](#apply-types);
- ✅ [check-type-passed-to-type-checker](#check-type-passed-to-type-checker);
- ✅ [check-if-success-possible-in-type-checker](#check-if-success-possible-in-type-checker);
- ✅ [merge-tuple-of-type-checker](#merge-tuple-of-type-checker);
- ✅ [declare](#declare);
- ✅ [remove-args](#remove-args);
- ✅ [remove-useless-maybe](#remove-useless-maybe);
- ✅ [remove-legacy-test-declaration](#remove-legacy-test-declaration);
- ✅ [remove-trailing-spaces-from-type-checker](#remove-trailing-spaces-from-type-checker);
- ✅ [remove-useless-spaces-from-type-checker](#remove-useless-spaces-from-type-checker);
- ✅ [remove-useless-arrow-from-type-checker](#remove-useless-arrow-from-type-checker);
- ✅ [remove-useless-colon-from-type-checker](#remove-useless-colon-from-type-checker);
- ✅ [remove-useless-tuples-from-type-checker](#remove-useless-tuples-from-type-checker);
- ✅ [remove-useless-not-from-type-checker](#remove-useless-not-from-type-checker);
- ✅ [remove-useless-path-from-type-checker](#remove-useless-path-from-type-checker);
- ✅ [reverse-comparison-in-type-checker](#reverse-comparison-in-type-checker);

## Config

```json
{
    "rules": {
        "printer/add-args": "on",
        "printer/add-missing-tuples-to-type-checker": "on",
        "printer/add-missing-colon-to-type-checker": "on",
        "printer/add-missing-spaces-to-type-checker": "on",
        "printer/apply-breakline": "on",
        "printer/apply-linebreak": "on",
        "printer/apply-computed-print": "on",
        "printer/apply-create-test-url": "on",
        "printer/apply-types": "on",
        "printer/check-type-passed-to-type-checker": "on",
        "printer/check-if-success-possible-in-type-checker": "on",
        "printer/declare": "on",
        "printer/merge-tuple-of-type-checker": "on",
        "printer/remove-args": "on",
        "printer/remove-useless-maybe": "on",
        "printer/remove-trailing-spaces-from-type-checker": "on",
        "printer/remove-useless-spaces-from-type-checker": "on",
        "printer/remove-useless-arrow-from-type-checker": "on",
        "printer/remove-useless-colon-from-type-checker": "on",
        "printer/remove-useless-not-from-type-checker": "on",
        "printer/remove-useless-path-from-type-checker": "on",
        "printer/remove-useless-tuples-from-type-checker": "on",
        "printer/reverse-comparison-in-type-checker": "on"
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

## add-missing-colon-to-type-checker

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/97d38d9bee0586deb8c627c19e399a27/889646df2dcfcfe86f7eb0efb6e3ed5791701f58).

### ❌ Example of incorrect code

```js
export const beforeIf = createTypeChecker([
    ['+ -> !', isInsideArray],
    ['- parentPath ->', isCoupleLines],
]);
```

### ✅ Example of correct code

```js
export const beforeIf = createTypeChecker([
    ['+: -> !', isInsideArray],
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

## remove-useless-arrow-from-type-checker

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/c12c37b793192eadb60fac332d95cc3b/3f4aa557c65897f4967712f30e51c29483feddc8).

### ❌ Example of incorrect code

```js
const isTwoLongStringsInsideArray = createTypeChecker([
    ['-: -> !', isTwoLongStrings],
    ['+: parentPath -> -> ArrayExpression'],
]);
```

### ✅ Example of correct code

```js
const isTwoLongStringsInsideArray = createTypeChecker([
    ['-: -> !', isTwoLongStrings],
    ['+: parentPath -> ArrayExpression'],
]);
```

## remove-useless-colon-from-type-checker

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/49a35399bd43d56bfd0221b3a0ace3b0/3ff3bdc8cb5f2a06786e9b616252d1b5f506dd73).

### ❌ Example of incorrect code

```js
export const beforeIf = createTypeChecker([
    ['+:', isInsideArray],
    ['-:', isCoupleLines],
]);
```

### ✅ Example of correct code

```js
export const beforeIf = createTypeChecker([
    ['+', isInsideArray],
    ['-', isCoupleLines],
]);
```

## remove-useless-not-from-type-checker

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/051b981021fd1e048b675106f0850211/2022b9797125016d4e5c5e6b5d4e066ab2e103ad).

### ❌ Example of incorrect code

```js
export const beforeIf = createTypeChecker([
    ['-: -> !+'],
    ['+: -> !-'],
]);
```

### ✅ Example of correct code

```js
export const beforeIf = createTypeChecker([
    ['-: -> -'],
    ['+: -> +'],
]);
```

## remove-useless-path-from-type-checker

Selector always starts from `path`, so it can be `parentPath.`, or `node.`, but never `path.`, since it is self reference.

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/ef8e1dc1036a4a2fcc99b32c3dc661e2/bc43a082dc9cb5ed8a8afe6964174f0d1be2e1c1).

### ❌ Example of incorrect code

```js
export const beforeIf = createTypeChecker([
    ['-: path.parentPath -> ', isCoupleLines],
]);
```

### ✅ Example of correct code

```js
export const beforeIf = createTypeChecker([
    ['-: parentPath -> ', isCoupleLines],
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

## check-if-success-possible-in-type-checker

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/4164addec1e1b2bb93ad7caf3ed13ad8/b04dc172f4094ea6b6902ec54deee779aba6b944).
When you have only negative branch defined in type checker it never never succeeds (`+`), and always returns false.

Consider adding success branch, or remove type checker.

☝️ *This rule has no autofix, because most likely tests will fail after auto fix,
and instead of observing code with a problem, you will first see failed tests,
and then after some searches determine that there is a wrong auto fix.*

### ❌ Example of incorrect code

```js
const isSimple = createTypeChecker([
    '-: -> SpreadElement',
    '-: -> Identifier',
    '-: -> !CallExpression',
]);

const isSimpleAfterObject = createTypeChecker([
    ['-', isSimple],
    ['-', callWithNext(isObjectExpression)],
    ['-', callWithPrev(isObjectExpression)],
]);
```

### ✅ Example of correct code

Possible fix:

```js
const isSimple = createTypeChecker([
    '-: -> SpreadElement',
    '-: -> Identifier',
    '+: -> !CallExpression',
]);

const isSimpleAfterObject = createTypeChecker([
    ['-', isSimple],
    ['-', callWithNext(isObjectExpression)],
    ['+', callWithPrev(isObjectExpression)],
]);
```

## check-type-passed-to-type-checker

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/9b35f5f2f23bece832f0f87c929d30e2/b08df8ef8ce6c2a03bceebe6119846c45a78a119).

☝️ *This rule has no autofix, because most likely tests will fail after auto fix,
and instead of observing code with a problem, you will first see failed tests,
and then after some searches determine that there is a wrong auto fix.*

### ❌ Example of incorrect code

```js
export const beforeIf = createTypeChecker([
    ['- : -> WrongType'],
]);
```

### ✅ Example of correct code

Here is possible correct code:

```js
export const beforeIf = createTypeChecker([
    ['- : -> Identifier'],
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

## merge-tuple-of-type-checker

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/7351b8359ac3da967e9b4b80d49b51da/74de1543f6e129f6e22f38e2eb597abce6c122a6).

### ❌ Example of incorrect code

```js
export const isNewlineAfterComma = createTypeChecker([
    ['+: -> !', isObjectExpression],
    ['+: ->', isStringLiteral],
    ['+', isStringLiteral],
]);
```

### ✅ Example of correct code

```js
export const isNewlineAfterComma = createTypeChecker([
    ['+: -> !ObjectExpression'],
    ['+: -> StringLiteral'],
    ['+: StringLiteral'],
]);
```

## reverse-comparison-in-type-checker

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/ae2335d32022de240e918ce077144767/f25c5a11f746fe532f81adede991286cb77d1b11).

### ❌ Example of incorrect code

```js
const isMoreThenMaxElementLengthInOneLine = createTypeChecker([
    ['-: node.elements.length -> !', '<', 2],
    ['-: node.elements.length -> !', '>', 2],
    ['-: node.elements.length -> !', '>=', 2],
    ['-: node.elements.length -> !', '<=', 2],
]);
```

### ✅ Example of correct code

```js
const isMoreThenMaxElementLengthInOneLine = createTypeChecker([
    ['-: node.elements.length', '>=', 2],
    ['-: node.elements.length', '<=', 2],
    ['-: node.elements.length', '<', 2],
    ['-: node.elements.length', '>', 2],
]);
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
