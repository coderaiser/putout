# @putout/plugin-remove-useless-continue [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-continue.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-continue "npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-useless-continue
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-useless-continue

`putout` plugin adds ability to remove useless `continue`.

## Install

```
npm i @putout/plugin-remove-useless-continue
```

## Rule

```json
{
    "rules": {
        "remove-useless-continue": "on"
    }
}
```

## ❌ Incorrect code example

```js
for (sign = decpt, i = 0; sign /= 10 !== 0; i++)
    continue;
```

## ✅ Correct code Example

```js
for (sign = decpt, i = 0; sign /= 10 !== 0; i++)
    ;
```

## License

MIT
