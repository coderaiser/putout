# putout-plugin-convert-for-each-to-for-of [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-convert-for-each-to-for-of.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-convert-for-each-to-for-of "npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-for-each-to-for-of
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-for-each-to-for-of

`putout` plugin adds ability to convert `Math.pow` to `exponentiation operator`.
## Install

```
npm i @putout/plugin-convert-for-each-to-for-of -D
```

## Rule

Rule `convert-for-each-to-for-of` is enabled by default, to disable add to `.putout.json`:

```json
{
    "rules": {
        "convert-for-each-to-for-of": false
    }
}
```

## ❌ Incorrect code example

```js
Object.keys(json).forEach((name) => {
    manage(name, json[name]);
});
```

## ✅ Correct code Example

```js
for (const name of Object.keys(json)) {
     manage(name, json[name]);
}
```

## License

MIT

