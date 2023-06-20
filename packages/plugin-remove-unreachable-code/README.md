# @putout/plugin-remove-unreachable-code [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-unreachable-code.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-unreachable-code"npm"

> The **JavaScript** warning "unreachable code after return statement" occurs when using an expression after a return statement, or when using a semicolon-less return statement but including an expression directly after.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Stmt_after_return)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to find and remove unreachable code.

## Install

```
npm i @putout/plugin-remove-unreachable-code
```

## Rule

```json
{
    "rules": {
        "remove-unreachable-code": "on"
    }
}
```

## ❌ Example of incorrect code

```js
function hi() {
    return 'world';
    console.log('hello');
}

function log() {
    throw Error('error');
    
    console.log('hello');
}
```

## ✅ Example of correct code

```js
function hi() {
    return 'world';
}

function log() {
    throw Error('error');
}
```

## License

MIT
