# @putout/plugin-remove-double-negations [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-double-negations.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-double-negations"npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to remove double negations.

## Install

```
npm i @putout/plugin-remove-double-negations
```

## Rule

```json
{
    "rules": {
        "remove-double-negations": "off"
    }
}
```

## ❌ Example of incorrect code

```js
if (!!a) {
    console.log('hi');
}
```

## ✅ Example of correct code

```js
if (a) {
    console.log('hi');
}
```

## License

MIT
