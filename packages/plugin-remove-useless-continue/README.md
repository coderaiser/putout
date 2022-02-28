# @putout/plugin-remove-useless-continue [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-continue.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-continue "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to remove useless `continue`.

## Install

```
npm i @putout/plugin-remove-useless-continue
```

## Rule

```json
{
    "rules": {
        "remove-useless-continue": "on"
    }
}
```

## ❌ Example of incorrect code

```js
for (sign = decpt, i = 0; sign /= 10 !== 0; i++)
    continue;
```

## ✅ Example of correct code

```js
for (sign = decpt, i = 0; sign /= 10 !== 0; i++)
    ;
```

## License

MIT
