# @putout/plugin-remove-useless-arguments [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-arguments.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-arguments"npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to find and remove useless `arguments`.

## Install

```
npm i @putout/plugin-remove-useless-arguments
```

## Rule

```json
{
    "rules": {
        "remove-useless-arguments/arguments": "on",
        "remove-useless-arguments/destructuring": "on",
        "remove-useless-arguments/method": "on"
    }
}
```

## arguments

### ❌ Example of incorrect code

```js
const sum = (a, b) => {};// destructuring
sum(a, b, c);
```

### ✅ Example of correct code

```js
const sum = (a, b) => {};
sum(a, b, c);
```

### destructuring

### ❌ Example of incorrect code

```js
onIfStatement({
    push,
    generate,
    abc,
    helloworld,
});

function onIfStatement({push}) {
}
```

### ✅ Example of correct code

```js
onIfStatement({
    push,
});

function onIfStatement({push}) {
}
```

### method

Check it out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/362c37e9f533299a7e721ac46f936801/0a47d094bd2a048eb6dcc224b808a63f2d076ccb).

### ❌ Example of incorrect code

```js
class Parser {
    parseStatement(context, topLevel, exports) {
        this.parseGuard(a, b);
    }
    parseGuard() {
    }
}
```

### ✅ Example of correct code

```js
class Parser {
    parseStatement(context, topLevel, exports) {
        this.parseGuard();
    }
    parseGuard() {
    }
}
```

## License

MIT
