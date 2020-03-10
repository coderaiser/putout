# putout-plugin-convert-for-to-for-of [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-convert-for-to-for-of.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-convert-for-to-for-of "npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-for-to-for-of
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-for-to-for-of

`putout` plugin adds ability to convert `for` to `for-of` loop.
## Install

```
npm i @putout/plugin-convert-for-to-for-of -D
```

## Rule

Rule `convert-for-to-for-of` is enabled by default, to disable add to `.putout.json`:

```json
{
    "rules": {
        "convert-for-to-for-of/n": false,
        "convert-for-to-for-of/length": false
    }
}
```

## ❌ Incorrect code example

```js
for (let i = 0; i < items.length; i++) {
    const item = items[i];
    log(item);
};

const n = items.length;
for (let i = 0; i < n; i++) {
    const item = items[i];
    log(item);
};
```

## ✅ Correct code Example

```js
for (const item of items) {
    log(item);
}
```

## License

MIT

