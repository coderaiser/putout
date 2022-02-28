# @putout/plugin-apply-optional-chaining [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-apply-optional-chaining.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-apply-optional-chaining"npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin apply `optional chaining`.

## Install

```
npm i @putout/plugin-apply-optional-chaining
```

## Rule

```json
{
    "rules": {
        "apply-optional-chaining": "on"
    }
}
```

## ❌ Example of incorrect code

```js
const result = hello && hello.world;
```

## ✅ Example of correct code

```js
const result = hello?.world;
```

## License

MIT
