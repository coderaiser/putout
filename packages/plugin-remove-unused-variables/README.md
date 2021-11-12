# @putout/plugin-remove-unused-variables [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-unused-variables.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-unused-variables"npm"

`putout` plugin adds ability to find and remove unused variables.

## Install

```
npm i @putout/plugin-remove-unused-variables -D
```

## Rule

Rule `remove-unused-variables` is enabled by default, to disable add to `.putout.json`:

```json
{
    "rules": {
        "remove-unused-variables": "off"
    }
}
```

## ❌ Incorrect code example

```js
const a = 'hello';
const b = 'world';
console.log(a);
```

## ✅ Correct code Example

```js
const a = 'hello';
console.log(a);
```

## License

MIT
