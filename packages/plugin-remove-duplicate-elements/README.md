# @putout/plugin-remove-duplicate-elements [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-duplicate-elements.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-duplicate-elements "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to find and remove duplecate elements.
Checkout int 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/0455a6a59a0ba47a3611b3a95f1e20c5/fa6e2c73e3317c2a8c6fe3142c65d457d6f361ed).

## Install

```
npm i @putout/plugin-remove-duplicate-elements
```

## Rule

```json
{
    "rules": {
        "remove-duplicate-elements": "on"
    }
}
```

## ❌ Example of incorrect code

```js
__putout_processor_json([
    'coverage',
    '',
    'coverage',
    '',
    'abc',
]);
```

## ✅ Example of correct code

```js
__putout_processor_json([
    'coverage',
    '',
    'abc',
]);
```

## License

MIT
