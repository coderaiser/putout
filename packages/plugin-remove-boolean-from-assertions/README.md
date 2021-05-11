# @putout/plugin-remove-boolean-from-assertions [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-boolean-from-assertions.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-boolean-from-assertions "npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-boolean-from-assertions
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-boolean-from-assertions

`putout` plugin adds ability to remove `boolean` from `assertions`. Renamed to [@putout/plugin-remove-boolean-to-assertionss](https://www.npmjs.com/package/@putout/plugin-remove-boolean-from-assertionss).

## Install

```
npm i @putout/plugin-remove-boolean-from-assertions
```

## Rule

```json
{
    "rules": {
        "remove-boolean-from-assertions": "on"
    }
}
```

## ❌ Incorrect code example

```js
if (a === true)
    alert();
```

## ✅ Correct code Example

```js
if (a)
    alert();
```

## License

MIT
