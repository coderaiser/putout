# @putout/plugin-remove-useless-constructors [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-constructors.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-constructors "npm"

> Wrapper classes have surprising behaviour, such as `new Boolean(false)` evaluating to `true`.
>
> https://google.github.io/styleguide/tsguide.html#primitive-types-wrapper-classes

🐊[`Putout`](https://github.com/coderaiser/putout) plugin adds ability to remove useless `constructors`. Use with [remove-useless-new](https://github.com/coderaiser/putout/tree/master/packages/plugin-remove-useless-new#readme).

## Install

```
npm i @putout/plugin-remove-useless-constructors
```

## Rule

```json
{
    "rules": {
        "remove-useless-constructors": "on"
    }
}
```

## ❌ Incorrect code example

```js
const s = String('hello');
const b = Boolean(false);
const n = Number(5);

```

## ✅ Correct code Example

```js
const s = 'hello';
const b = false;
const n = 5;
```

## License

MIT
