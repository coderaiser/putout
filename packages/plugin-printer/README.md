# @putout/plugin-printer [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-printer.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-printer "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) adds support of transformations for [`@putout/printer`](https://github.com/putoutjs/printer).

> Type-checker rules moved to [`@putout/plugin-type-checker`](https://github.com/coderaiser/putout/tree/master/packages/plugin-type-checker#readme).

## Install

```
npm i @putout/plugin-printer -D
```

## Rules

- ✅ [add-args](#add-args);
- ✅ [apply-breakline](#apply-breakline);
- ✅ [apply-computed-print](#apply-computed-print);
- ✅ [apply-create-test-url](#apply-create-test-url);
- ✅ [apply-linebreak](#apply-linebreak);
- ✅ [apply-printer-declarations](#apply-printer-declarations);
- ✅ [apply-types](#apply-types);
- ✅ [declare](#declare);
- ✅ [declare-nearby](#declare-nearby);
- ✅ [remove-args](#remove-args);
- ✅ [remove-legacy-test-declaration](#remove-legacy-test-declaration);
- ✅ [remove-useless-maybe](#remove-useless-maybe);
- ✅ [remove-useless-print](#remove-useless-print);

## Config

```json
{
    "rules": {
        "printer/add-args": "on",
        "printer/apply-breakline": "on",
        "printer/apply-computed-print": "on",
        "printer/apply-create-test-url": "on",
        "printer/apply-linebreak": "on",
        "printer/apply-printer-declarations": "on",
        "printer/apply-types": "on",
        "printer/declare": "on",
        "printer/declare-nearby": "on",
        "printer/remove-args": "on",
        "printer/remove-useless-maybe": "on",
        "printer/remove-useless-print": "on"
    }
}
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

## apply-linebreak;

```diff
-indent();
-print.newline();
print.linebreak();
```

## apply-breakline

```diff
-print.newline();
-indent();
print.breakline();
```

## apply-computed-print

### ❌ Example of incorrect code

```js
export const TryStatement = (path, {print}) => {
    print(path.get('block'));
};
```

### ✅ Example of correct code

```js
export const TryStatement = (path, {print}) => {
    print('__block');
};
```

The rule changes only the `print` of a printer visitor (a parameter). Imported `print` of `putout` needs a path and stays as is.

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

## apply-printer-declarations

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/2fc66c476a235eb25f47e55fd7b33042/b0371fe2dd62e8f9fe5ce1fff6d352386e69fcc6).

### ❌ Example of incorrect code

```js
export const ExportNamedDeclaration = (path, printer, {indent}) => {
    const {print, write} = printer;
    const {leadingComments} = path.node;
    
    indent();
};
```

### ✅ Example of correct code

```js
export const ExportNamedDeclaration = (path, printer) => {
    const {leadingComments} = path.node;
    const {
        print,
        write,
        indent,
    } = printer;
    
    indent();
};
```

## apply-types

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/8a88fec812a52e302cf7b191eca2f49e/474ca87860d2eab755373ba9dc8b12efc4a80252).

```diff
-const {isIdentifier} = require('@babel/types');
+const {types} = require('@babel/types');
+const {isIdentifier} = types;
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

## declare-nearby

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/03d729e40ffd352678cdcc92a1cb7e2d/33a3d522247db4a1dd6d34b035176f26fc020ca8).

### ❌ Example of incorrect code

```js
export const FunctionDeclaration = {
    print(path, printer, semantics) {
        const {print} = printer;
        
        indent();
    },
};
```

### ✅ Example of correct code

```js
export const FunctionDeclaration = {
    print(path, printer, semantics) {
        const {indent, print} = printer;
        
        indent();
    },
};
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

## License

MIT
