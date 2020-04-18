# putout-plugin-convert-for-in-to-for-of [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-convert-for-in-to-for-of.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-convert-for-in-to-for-of "npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-for-in-to-for-of
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-for-in-to-for-of

`putout` plugin adds ability to convert `for` to `for-of` loop.
## Install

```
npm i @putout/plugin-convert-for-in-to-for-of -D
```

## Rule

Rule `convert-for-in-to-for-of` is enabled by default, to disable add to `.putout.json`:

```json
{
    "rules": {
        "convert-for-in-to-for-of/positive": false,
        "convert-for-in-to-for-of/negative": false
    }
}
```

## ❌ Incorrect code example

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

## ✅ Correct code Example

```js
for (const item of Object.keys(object)) {
    log(item);
}
```

## License

MIT

