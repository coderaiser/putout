# @putout/plugin-apply-consistent-blocks [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-apply-consistent-blocks.svg?style=flconsistent-blocks&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-apply-consistent-blocks "npm"

> A **block statement** is used to group zero or more statements. The block is delimited by a pair of braces ("curly braces") and contains a list of zero or more statements and declarations.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/block)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to apply consistent blocks. Check out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/9035db21bae7b6c76d1dc875d4c74828/07edbfd755060ae263949caf08b31aa43609375a).

## Install

```
npm i @putout/plugin-apply-consistent-blocks
```

## Rule

```json
{
    "rules": {
        "apply-consistent-blocks": "on"
    }
}
```

## ❌ Example of incorrect code

```js
if (a > 3) {
    m();
}

if (a > 3)
    b = 5;
else {
    b = 6;
}

if (a > 3)
    b = 5;
else {
    b = 6;
    fn();
}
```

## ✅ Example of correct code

```js
if (a > 3)
    m();

if (a > 3)
    b = 5;
else
    b = 6;

if (a > 3) {
    b = 5;
} else {
    b = 6;
    fn();
}
```

## License

MIT
