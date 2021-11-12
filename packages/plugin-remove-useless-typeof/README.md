# @putout/plugin-remove-useless-typeof [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-typeof.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-typeof"npm"

`putout` plugin adds ability to apply shorthand properties.

## Install

```
npm i @putout/plugin-remove-useless-typeof
```

## Rule

```json
{
    "rules": {
        "remove-useless-typeof": "on"
    }
}
```

## ❌ Incorrect code example

```js
typeof typeof 'hello';
```

## ✅ Correct code Example

```js
typeof 'hello';
```

## License

MIT
