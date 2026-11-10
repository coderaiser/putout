# @putout/plugin-type-checker [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-type-checker.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-type-checker "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) adds support of transformations for type checkers created with `createTypeChecker` of [`putout`](https://github.com/coderaiser/putout/tree/master/packages/operator-type-checker#readme).

## Install

```
npm i @putout/plugin-type-checker -D
```

## Rules

- ✅ [add-missing-colon-to-type-checker](#add-missing-colon-to-type-checker);
- ✅ [add-missing-spaces-to-type-checker](#add-missing-spaces-to-type-checker);
- ✅ [add-missing-tuples-to-type-checker](#add-missing-tuples-to-type-checker);
- ✅ [check-if-success-possible-in-type-checker](#check-if-success-possible-in-type-checker);
- ✅ [check-type-passed-to-type-checker](#check-type-passed-to-type-checker);
- ✅ [merge-tuples-of-type-checkers](#merge-tuples-of-type-checkers);
- ✅ [remove-trailing-spaces-from-type-checker](#remove-trailing-spaces-from-type-checker);
- ✅ [remove-useless-arrow-from-type-checker](#remove-useless-arrow-from-type-checker);
- ✅ [remove-useless-colon-from-type-checker](#remove-useless-colon-from-type-checker);
- ✅ [remove-useless-not-from-type-checker](#remove-useless-not-from-type-checker);
- ✅ [remove-useless-path-from-type-checker](#remove-useless-path-from-type-checker);
- ✅ [remove-useless-spaces-from-type-checker](#remove-useless-spaces-from-type-checker);
- ✅ [remove-useless-tuples-from-type-checker](#remove-useless-tuples-from-type-checker);
- ✅ [reverse-comparison-in-type-checker](#reverse-comparison-in-type-checker);
- ✅ [apply-boolean-operator-to-type-checker](#apply-boolean-operator-to-type-checker);

## Config

```json
{
    "rules": {
        "type-checker/add-missing-colon-to-type-checker": "on",
        "type-checker/add-missing-spaces-to-type-checker": "on",
        "type-checker/add-missing-tuples-to-type-checker": "on",
        "type-checker/check-if-success-possible-in-type-checker": "on",
        "type-checker/check-type-passed-to-type-checker": "on",
        "type-checker/merge-tuples-of-type-checkers": "on",
        "type-checker/remove-trailing-spaces-from-type-checker": "on",
        "type-checker/remove-useless-arrow-from-type-checker": "on",
        "type-checker/remove-useless-colon-from-type-checker": "on",
        "type-checker/remove-useless-not-from-type-checker": "on",
        "type-checker/remove-useless-path-from-type-checker": "on",
        "type-checker/remove-useless-spaces-from-type-checker": "on",
        "type-checker/remove-useless-tuples-from-type-checker": "on",
        "type-checker/reverse-comparison-in-type-checker": "on",
        "type-checker/apply-boolean-operator-to-type-checker": "on"
    }
}
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

## add-missing-tuples-to-type-checker

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

## merge-tuples-of-type-checkers

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

## reverse-comparison-in-type-checker

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/be2bb33f5c7ac7b687c1fa856704bc73/e57fa5a3ded571adca03f5bdeb5a0f63a594aa81).

### ❌ Example of incorrect code

```js
export const ExpressionStatement = {
    print(path, {indent, print}) {
        indent();
        print('__expression');
        print.newline();
    },
};
```

### ✅ Example of correct code

```js
export const ExpressionStatement = (path, {indent, print}) => {
    indent();
    print('__expression');
    print.newline();
};
```

## apply-boolean-operator-to-type-checker

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/053946bd010f04ad87e148c648d3af32/a69e0182048d692747b34df94ac4ce0b47d49f33).

### ❌ Example of incorrect code

```js
const isNotMarked = createTypeChecker([
    ['-: node.async', not(Boolean)],
    ['-: __putout_promises_add_missing_async', Boolean],
    ['+', Boolean],
]);
```

### ✅ Example of correct code

```js
const isNotMarked = createTypeChecker([
    ['-: node.async -> -'],
    ['-: __putout_promises_add_missing_async -> +'],
    ['+ -> +'],
]);
```

