# @putout/plugin-remove-useless-map [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-map.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-map"npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin adds ability to remove useless [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).

## Install

```
npm i @putout/plugin-remove-useless-map
```

## Rule

```json
{
    "rules": {
        "remove-useless-map": "on"
    }
}
```

## ❌ Example of incorrect code

```js
const [str] = lines.map((line) => `hello ${line}`);
```

## ✅ Example of correct code

```js
const [line] = lines;
const str = `hello ${line}`;
```

## License

MIT
