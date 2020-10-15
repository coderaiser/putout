# @putout/plugin-remove-useless-templates [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-remove-useless-templates.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-remove-useless-templates"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-useless-templates
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-useless-templates

`putout` plugin adds ability to find and remove useless `template string`. Nut bundled to `putout` (by default `convert-template-to-string` is used).

## Install

```
npm i @putout/plugin-remove-useless-templates
```

## Rule

```json
{
    "rules": {
        "remove-useless-templates": true
    }
}
```

## ❌ Incorrect code example

```js
console.log(`${str}`);
```

## ✅ Correct code Example

```js
console.log(str);
```

## License

MIT

