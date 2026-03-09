# @putout/plugin-return [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-return.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-return "npm"

> The `return` statement ends function execution and specifies a value to be returned to the function caller.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to transform to new **Node.js** API and apply best practices.

## Install

```
npm i putout @putout/plugin-return -D
```

## Rules

- ✅ [apply-early-return](#apply-early-return);
- ✅ [convert-from-continue](#convert-from-continue);
- ✅ [convert-from-break](#convert-from-continue);
- ✅ [merge-with-next-sibling](#merge-with-next-sibling);
- ✅ [remove-useless](#remove-useless);
- ✅ [remove-last-empty](#remove-last-empty);
- ✅ [simplify-boolean](#simplify-boolean);

## Config

```json
{
    "rules": {
        "return/apply-early-return": "on",
        "return/convert-from-continue": "on",
        "return/convert-from-break": "on",
        "return/merge-with-next-sibling": "on",
        "return/remove-useless": "on",
        "return/remove-last-empty": "on",
        "return/simplify-boolean": "on"
    }
}
```

## apply-early-return

> In short, an **early return** provides functionality so the result of a conditional statement can be returned as soon as a result is available, rather than wait until the rest of the function is run.
>
> (c) [dev.to](https://dev.to/jenniferlynparsons/early-returns-in-javascript-5hfb)

### ❌ Example of incorrect code

```js
function get(a) {
    const b = 0;
    
    {
        if (a > 0)
            return 5;
        
        return 7;
    }
}
```

### ✅ Example of correct code

```js
function get(a) {
    if (a > 0)
        return 5;
    
    return 7;
}
```

## convert-from-continue

> The `continue` statement terminates execution of the statements in the current iteration of the current or labeled loop, and continues execution of the loop with the next iteration.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/continue)

> `SyntaxError: Illegal continue statement: no surrounding iteration statement`
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Bad_continue)

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/a321ee4d76a066c17835b4aa50f91499/e0d161c7bd8b0d63ebf8d5a5026529c2fb8e0cb3).

### ❌ Example of incorrect code

```ts
function x() {
    if (a)
        continue;
    
    return b;
}
```

### ✅ Example of correct code

```js
function x() {
    if (a)
        return;
    
    return b;
}
```

## convert-from-break

> The `break` statement terminates the current loop or switch statement and transfers program control to the statement following the terminated statement.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

> `SyntaxError: unlabeled break must be inside loop or switch`
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Bad_break)

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/a321ee4d76a066c17835b4aa50f91499/10646f7383b8d58cda02417485d5281955da95be).

### ❌ Example of incorrect code

```ts
function x() {
    if (a)
        break;
    
    return false;
}
```

### ✅ Example of correct code

```js
function x() {
    if (a)
        return;
    
    return false;
}
```

## merge-with-next-sibling

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/2cb7e8836ce0adb6009f21859f8a0c15/9eea5b36a4f6664b05f2f9f0abd271a62a4dbbbe).

### ❌ Example of incorrect code

```js
function x() {
    return;
    {
        hello: 'world';
    }
    
    return;
    5;
    
    return;
    a ? 2 : 3;
}
```

### ✅ Example of correct code

```js
function x() {
    return {
        hello: 'world',
    };
    
    return 5;
    
    return a ? 2 : 3;
}
```

### remove-useless

### ❌ Example of incorrect code

```js
const traverse = ({push}) => {
    return {
        ObjectExpression(path) {
            push(path);
        },
    };
};
```

### ✅ Example of correct code

```js
const traverse = ({push}) => ({
    ObjectExpression(path) {
        push(path);
    },
});
```

### remove-last-empty

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/111549a3e6d61f8637ea12217062ea80/10e7842f9fbbf7fb0712d3b41cdcc707ae410fe5).

### ❌ Example of incorrect code

```js
const exit = (vars, path, {push}) => {
    push(path);
    return;
};
```

### ✅ Example of correct code

```js
const exit = (vars, path, {push}) => {
    push(path);
};
```

## simplify-boolean

Check out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/304035b9529830cf20e76e9a1f35f14c/39c743921c6bfad3984a3989f25c2986ab51e8c8).

### ❌ Example of incorrect code

```js
function isA(a, b) {
    if (a.length === b.length)
        return true;
    
    return false;
}
```

### ✅ Example of correct code

```js
function isA(a, b) {
    return a.length !== b.length;
}
```

## License

MIT
