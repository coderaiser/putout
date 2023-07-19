# @putout/plugin-apply-starts-with [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-apply-starts-with.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-apply-starts-with "npm"

> The `startsWith()` method determines whether a string begins with the characters of a specified string, returning `true` or `false` as appropriate.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to apply `.startsWith()`.

## Install

```
npm i @putout/plugin-apply-starts-with
```

## Rule

```json
{
    "rules": {
        "apply-starts-with": "on"
    }
}
```

## ❌ Example of incorrect code

```js
function x(a = '') {
    if (!a.indexOf('1'))
        return false;
}

function x1({a = ''}) {
    return !a.indexOf('1');
}

function x2() {
    const {a = ''} = z;
    return !a.indexOf('1');
}
```

## ✅ Example of correct code

```js
function x(a = '') {
    return a.startsWith('1');
}

function x1({a = ''}) {
    return a.startsWith('1');
}

function x2() {
    const {a = ''} = z;
    return a.startsWith('1');
}
```

## License

MIT
