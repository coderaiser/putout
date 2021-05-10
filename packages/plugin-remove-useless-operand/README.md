# @putout/plugin-remove-useless-operand [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-operand.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-operand "npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-useless-operand
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-useless-operand

`putout` plugin adds ability to remove useless `operand`.

## Install

```
npm i @putout/plugin-remove-useless-operand
```

## Rule

```json
{
    "rules": {
        "remove-useless-operand": "on"
    }
}
```

## ❌ Incorrect code example

```js
a = a + b;
b += 1;
```

## ✅ Correct code Example

```js
a += b;
++b;
```

## License

MIT
