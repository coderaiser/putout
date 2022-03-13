# @putout/plugin-remove-console [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-console.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-console"npm"

> The `console.log()` method outputs a message to the web console. The message may be a single string (with optional substitution values), or it may be any one or more JavaScript objects.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/API/console/log)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to find and remove `console.log` calls.

## Install

```
npm i @putout/plugin-remove-console
```

## Rule

```json
{
    "rules": {
        "remove-console": "on"
    }
}
```

## ❌ Example of incorrect code

```js
const hello = 'world';
console.log(hello);
```

## ✅ Example of correct code

```js
const hello = 'world';
```
