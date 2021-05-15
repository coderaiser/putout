# @putout/plugin-remove-useless-return [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-return.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-return"npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-useless-return
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-useless-return

`putout` plugin adds ability to find and remove useless `return`.

## Install

```
npm i @putout/plugin-remove-useless-return
```

## Rule

```json
{
    "rules": {
        "remove-useless-return": "on"
    }
}
```

## ❌ Incorrect code example

```js
module.exports.traverse = ({push}) => {
    return {
        ObjectExpression(path) {
        },
    };
};
```

## ✅ Correct code Example

```js
module.exports.traverse = ({push}) => ({
    ObjectExpression(path) {
    },
});
```

## License

MIT
