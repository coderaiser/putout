# @putout/plugin-remove-useless-operand [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-operand.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-operand "npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin adds ability to remove useless `operand`.

## Install

```
npm i @putout/plugin-remove-useless-operand
```

## Rule

```json
{
    "rules": {
        "remove-useless-operand": "on"
    }
}
```

## ❌ Incorrect code example

```js
a = a + b;
b += 1;
```

## ✅ Correct code Example

```js
a += b;
++b;
```

## License

MIT
