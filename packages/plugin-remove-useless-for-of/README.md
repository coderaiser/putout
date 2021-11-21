# @putout/plugin-remove-useless-for-of [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-for-of.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-for-of "npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin adds ability to remove useless `for-of` statements.

## Install

```
npm i @putout/plugin-remove-useless-for-of
```

## Rule

```json
{
    "rules": {
        "remove-useless-for-of": "on"
    }
}
```

## ❌ Incorrect code example

```js
for (const a of ['hello']) {
    console.log(a);
}
```

## ✅ Correct code Example

```js
console.log('hello');
```

## License

MIT
