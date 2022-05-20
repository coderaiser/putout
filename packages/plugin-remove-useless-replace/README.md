# @putout/plugin-remove-useless-replace [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-replace.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-replace "npm"

> The `replace()` method returns a new string with some or all matches of a `pattern` replaced by a `replacement`. The original string is left unchanged.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/replace)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to remove useless `replace`.
Check it out in 🐊[Putout Editor](https://putout.cloudcmd.io/#/gist/04c18d7d2302e0a3cc543c7c83adeaf2/ddb38d94dcc6425fc944e3b130837739f916c7df).

## Install

```
npm i @putout/plugin-remove-useless-replace
```

## Rule

```json
{
    "rules": {
        "remove-useless-replace": "on"
    }
}
```

## ❌ Example of incorrect code

```js
const a = 'hello'.replace(b, b);
```

## ✅ Example of correct code

```js
const a = 'hello';
```

## License

MIT
