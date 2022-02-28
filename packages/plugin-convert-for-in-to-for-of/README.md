# @putout/plugin-convert-for-in-to-for-of [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-for-in-to-for-of.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-for-in-to-for-of "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to convert `for` to `for-of` loop.

## Install

```
npm i @putout/plugin-convert-for-in-to-for-of -D
```

## Rule

Rule `convert-for-in-to-for-of` is enabled by default, to disable add to `.putout.json`:

```json
{
    "rules": {
        "convert-for-in-to-for-of/positive": "off",
        "convert-for-in-to-for-of/negative": "off"
    }
}
```

## ❌ Example of incorrect code

```js
for (const item in object) {
    if (object.hasOwnProperty(item)) {
        log(item);
    }
}

for (const item in object) {
    if (!object.hasOwnProperty(item))
        continue;
    
    log(item);
}
```

## ✅ Example of correct code

```js
for (const item of Object.keys(object)) {
    log(item);
}
```

## License

MIT
