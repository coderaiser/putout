# @putout/plugin-arguments [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-arguments.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-arguments"npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to find and remove useless `arguments`.

## Install

```
npm i @putout/plugin-arguments
```

## Rules

- ✅ [apply-json-parse](#apply-json-parse);
- ✅ [apply-rest](#apply-rest);
- ✅ [remove-useless](#remove-useless);
- ✅ [remove-useless-from-method](#remove-useless-from-method);
- ✅ [destructuring](#destructring);
- ✅ [remove-unused](#remove-unused);

## Config

```json
{
    "rules": {
        "arguments/apply-json-parse": "on",
        "arguments/apply-rest": "on",
        "arguments/remove-useless": "on",
        "arguments/remove-useless-from-method": "on",
        "arguments/destructuring": "on",
        "arguments/remove-unused": "on"
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

## License

MIT
