# @putout/plugin-remove-useless-return [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-return.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-return"npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin adds ability to find and remove useless `return`.

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
const traverse = ({push}) => {
    return {
        ObjectExpression(path) {
        },
    };
};
```

## ✅ Correct code Example

```js
const traverse = ({push}) => ({
    ObjectExpression(path) {
    },
});
```

## License

MIT
