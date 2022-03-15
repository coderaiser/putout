# @putout/plugin-extract-sequence-expressions [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-extract-sequence-expressions.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-extract-sequence-expressions"npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to convert Commonjs to ESM.

## Install

```
npm i @putout/plugin-extract-sequence-expressions -D
```

## Rule

```json
{
    "rules": {
        "extract-sequence-expressions": "on"
    }
}
```

## ❌ Example of incorrect code

```js
module.exports.x = 1,
module.exports.y = 2;

fn((a, b));
```

## ✅ Example of correct code

```js
module.exports.x = 1;
module.exports.y = 2;

fn(a, b);
```

## License

MIT
