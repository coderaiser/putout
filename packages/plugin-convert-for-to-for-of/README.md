# putout-plugin-convert-for-to-for-of [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-for-to-for-of.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-for-to-for-of "npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin adds ability to convert `for` to `for-of` loop.

## Install

```
npm i @putout/plugin-convert-for-to-for-of -D
```

## Rule

Rule `convert-for-to-for-of` is enabled by default, to disable add to `.putout.json`:

```json
{
    "rules": {
        "convert-for-to-for-of/n": "off",
        "convert-for-to-for-of/length": "off"
    }
}
```

## ❌ Incorrect code example

```js
for (let i = 0; i < items.length; i++) {
    const item = items[i];
    log(item);
}

const n = items.length;
for (let i = 0; i < n; i++) {
    const item = items[i];
    log(item);
}

for (let i = 0; i < items.length; i++) {
    const item = items[i];
    log(i, item);
}
```

## ✅ Correct code Example

```js
for (const item of items) {
    log(item);
}

for (const [i, item] of items.entries()) {
    log(i, item);
}
```

## License

MIT
