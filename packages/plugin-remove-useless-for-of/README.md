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

## ❌ Example of incorrect code

```js
for (const a of ['hello']) {
    console.log(a);
}
```

## ✅ Example of correct code

```js
console.log('hello');
```

## License

MIT
