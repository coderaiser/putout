# @putout/plugin-remove-useless-templates [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-templates.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-templates"npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin adds ability to find and remove useless `template string`. Nut bundled to `putout` (by default `convert-template-to-string` is used).

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

## ❌ Example of incorrect code

```js
console.log(`${str}`);
```

## ✅ Example of correct code

```js
console.log(str);
```

## License

MIT
