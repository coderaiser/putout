# @putout/plugin-apply-numeric-separators [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-apply-numeric-separators.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-apply-numeric-separators"npm"

`putout` plugin apply `numeric separators`.

## Install

```
npm i @putout/plugin-apply-numeric-separators
```

## Rule

```json
{
    "rules": {
        "apply-numeric-separators": "on"
    }
}
```

## ❌ Incorrect code example

```js
const t = 10000000;
```

## ✅ Correct code Example

```js
const t = 10_000_000;
```

## License

MIT
