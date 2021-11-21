# @putout/plugin-remove-unreferenced-variables [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-unreferenced-variables.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-unreferenced-variables"npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin adds ability to find and remove `unreferenced-variables`.

## Install

```
npm i @putout/plugin-remove-unreferenced-variables -D
```

## Rule

Rule `remove-unreferenced-variables` enabled by default, to disable add to `.putout.json`:

```json
{
    "rules": {
        "remove-unreferenced-variables": "off"
    }
}
```

## ❌ Incorrect code example

```js
let a;
a = 5;
```

## ✅ Correct code Example

```js
let a;
a = 5;
console.log(a);
```

## License

MIT
