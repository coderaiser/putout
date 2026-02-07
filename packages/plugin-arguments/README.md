# @putout/plugin-arguments [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-arguments.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-arguments "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to find and remove useless `arguments`.

## Install

```
npm i @putout/plugin-arguments
```

## Rules

- ✅ [apply-json-parse](#apply-json-parse);
- ✅ [apply-rest](#apply-rest);
- ✅ [convert-expressiont-to-arguments](#convert-expression-to-arguments);
- ✅ [remove-duplicate](#remove-duplicate);
- ✅ [remove-useless](#remove-useless);
- ✅ [remove-useless-from-method](#remove-useless-from-method);
- ✅ [remove-unused](#remove-unused);
- ✅ [remove-empty](#remove-empty);

## Config

```json
{
    "rules": {
        "arguments/apply-json-parse": "on",
        "arguments/apply-rest": "on",
        "arguments/convert-expressiont-to-arguments": "on",
        "arguments/remove-duplicate": "on",
        "arguments/remove-useless": "on",
        "arguments/remove-useless-from-method": "on",
        "arguments/remove-unused": "on",
        "arguments/remove-empty": "on"
    }
}
```

### apply-json-parse

> The `JSON.parse()` static method parses a JSON string, constructing the JavaScript value or object described by the string. An optional reviver function can be provided to perform a transformation on the resulting object before it is returned.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)

Check it out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/efdb0e3d0ab937f7901ce3047626b5fd/580aa27e4fb61fbfe3eead0cd21971a6ff084174).

### ❌ Example of incorrect code

```js
import {operator} from 'putout';

const {fromJS} = operator;
JSON.parse(fromJS(print(ast)), null, 4);
```

### ✅ Example of correct code

```js
import {operator} from 'putout';

const {fromJS} = operator;
JSON.parse(fromJS(print(ast)));
```

## apply-rest

> The rest parameter syntax allows a function to accept an indefinite number of arguments as an `array`, providing a way to represent variadic functions in JavaScript.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)

### ❌ Example of incorrect code

```js
function hello() {
    console.log(arguments);
}
```

### ✅ Example of correct code

```js
function hello(...args) {
    console.log(args);
}
```

## convert-expression-to-arguments

> `Uncaught SyntaxError: Malformed arrow function parameter list` occurs when your function declaration is missing valid parameters.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Missing_formal_parameter)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to fix `SyntaxError: missing formal parameter` .
Checkout in 🐊[**Putout Editor**](https://putout.vercel.app/#/gist/e1818c2385974e136ae77eb28b3d2221/66dcb650e02aaafffa7fe00914f80366c4bfd7d3).

## ❌ Example of incorrect code

```
(a(hello, world)) => (b + a);
(a + b) => (b + a);
(a || b) => (b + a);
```

## ✅ Example of correct code

```js
(a, hello, world) => a;
(a, b) => b + a;
(a, b) => b + a;
```

## remove-duplicate

> The JavaScript exception `duplicate formal argument x` or `duplicate argument names not allowed in this context` occurs when a function creates two or more parameter bindings with the same name, and the function is not a non-strict function with only simple parameters.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Duplicate_parameter)

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/7f6d549de44d73601ad8cbffc09269fc/586dcb0463439365875098c04ac4e11553911478).

```diff
-const sum = (a, a) => {}
+const sum = (a) => {}
```

## Comparison

Linter          | Rule  | Fix
----------------|-------|------------|
🐊 **Putout**   | [`arguments/remove-duplicate`](https://github.com/coderaiser/putout/tree/master/packages/plugin-arguments#remove-duplicate) | ✅
⏣ **ESLint**    | [`no-dupe-args`](https://eslint.org/docs/rules/no-dupe-args) | ❌
🦕 **Deno**     | [`no-dupe-args`](https://docs.deno.com/lint/rules/no-dupe-args/) | ❌

## remove-useless

### ❌ Example of incorrect code

```js
const sum = (a, b) => {};
sum(a, b, c);
```

### ✅ Example of correct code

```js
const sum = (a, b) => {};
sum(a, b);
```

### remove-useless-from-method

Check it out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/362c37e9f533299a7e721ac46f936801/0a47d094bd2a048eb6dcc224b808a63f2d076ccb).

### ❌ Example of incorrect code

```js
class Parser {
    parseStatement(context, topLevel, exports) {
        this.parseGuard(a, b);
    }
    
    parseGuard() {}
}
```

### ✅ Example of correct code

```js
class Parser {
    parseStatement(context, topLevel, exports) {
        this.parseGuard();
    }
    
    parseGuard() {}
}
```

### remove-unused

Check it out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/f6bf5e069cfb1328fe7418c501e265cc/388ab2266babe84f77c1f82687f5ed44873e8651).

### ❌ Example of incorrect code

```js
member += compute(member, list[i]);

function compute(member, current) {
    return String(current);
}
```

### ✅ Example of correct code

```js
member += compute(list[i]);

function compute(current) {
    return String(current);
}
```

### remove-empty

> `Uncaught SyntaxError: Unexpected token ','`
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Unexpected_token)

Check it out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/56f6e4cc87d0e4830ce570c1af8a7a4b/e85940bd6cbf4448e8a062543ce2e9fa67d0bb69).

```diff
-renameFileWithLog('hello', ,'world');
+renameFileWithLog('hello', 'world');
```

## License

MIT
