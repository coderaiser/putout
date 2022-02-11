# @putout/plugin-remove-unused-variables [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-unused-variables.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-unused-variables"npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin adds ability to find and remove unused variables.

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

## ❌ Example of incorrect code

```js
const a = 'hello';
const b = 'world';
console.log(a);
```

## ✅ Example of correct code

```js
const a = 'hello';
console.log(a);
```

## License

MIT
