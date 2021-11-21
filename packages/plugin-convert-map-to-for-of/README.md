# putout-plugin-convert-map-to-for-of [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-map-to-for-of.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-map-to-for-of "npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin adds ability to convert `map` to `for-of` loop.

## Install

```
npm i @putout/plugin-convert-map-to-for-of -D
```

## Rule

```json
{
    "rules": {
        "convert-map-to-for-of": "on"
    }
}
```

## ❌ Incorrect code example

```js
names.map((name) => {
    alert(`hello ${name}`);
});
```

## ✅ Correct code Example

```js
for (const name of names) {
    alert(`hello ${name}`);
}
```

## License

MIT
