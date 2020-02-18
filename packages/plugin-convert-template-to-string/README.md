# putout-plugin-convert-template-to-string [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-convert-template-to-string.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-convert-template-to-string"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-template-to-string
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-template-to-string

`putout` plugin adds ability to find and remove useless `template string`.

## Install

```
npm i @putout/plugin-convert-template-to-string
```

## Rule

```json
{
    "rules": {
        "convert-template-to-string": true
    }
}
```

## ❌ Incorrect code example

```js
const s = `${a + b}`;
```

## ✅ Correct code Example

```js
const s = String(a + b);
```

## License

MIT

