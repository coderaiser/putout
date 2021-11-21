# @putout/plugin-apply-montag [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-apply-montag.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-apply-montag"npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin adds ability to apply [montag](https://github.com/coderaiser/montag).

## Install

```
npm i @putout/plugin-apply-montag
```

## Rule

```json
{
    "rules": {
        "apply-montag": "on"
    }
}
```

## ❌ Incorrect code example

```js
const a = montag`
    hello
    world
`;
```

## ✅ Correct code Example

```js
const a = montag`
    hello
    world
`;
```

## License

MIT
