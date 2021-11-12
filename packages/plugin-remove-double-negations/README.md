# @putout/plugin-remove-double-negations [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-double-negations.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-double-negations"npm"

`putout` plugin adds ability to remove double negations.

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

## ❌ Incorrect code example

```js
if (!!a) {
    console.log('hi');
}
```

## ✅ Correct code Example

```js
if (a) {
    console.log('hi');
}
```

## License

MIT
