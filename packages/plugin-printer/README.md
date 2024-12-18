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
- ✅ [apply-breakline](#apply-breakline);
- ✅ [apply-computed-print](#apply-computed-print);
- ✅ [apply-linebreak](#apply-linebreak);
- ✅ [apply-types](#apply-types);
- ✅ [declare](#declare);
- ✅ [remove-args](#remove-args);

## Config

```json
{
    "rules": {
        "printer/add-args": "on",
        "printer/apply-breakline": "on",
        "printer/apply-linebreak": "on",
        "printer/apply-computed-print": "on",
        "printer/apply-types": "on",
        "printer/declare": "on",
        "printer/remove-args": "on"
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

## apply-computed-print

### ❌ Example of incorrect code

```js
print(path.get('block'));
```

### ✅ Example of correct code

```js
print('__block');
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

## declare

### ❌ Example of incorrect code

```js
isIdentifier();
```

### ✅ Example of correct code

```js
const {types} = require('@putout/babel');
const {isIdentifier} = types;

isIdentifier();
```

## License

MIT
