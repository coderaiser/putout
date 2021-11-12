# @putout/plugin-remove-useless-templates [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-templates.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-templates"npm"

`putout` plugin adds ability to find and remove useless `template string`. Nut bundled to `putout` (by default `convert-template-to-string` is used).

## Install

```
npm i @putout/plugin-remove-useless-templates
```

## Rule

```json
{
    "rules": {
        "remove-useless-templates": "on"
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
