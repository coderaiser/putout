# @putout/plugin-remove-duplicate-interface-keys [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-duplicate-interface-keys.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-duplicate-interface-keys "npm"

`putout` plugin adds ability to find and remove duplecate interface-keys.

## Install

```
npm i @putout/plugin-remove-duplicate-interface-keys
```

## Rule

```json
{
    "rules": {
        "remove-duplicate-interface-keys": "on"
    }
}
```

## ❌ Incorrect code example

```ts
interface Hello {
    'hello': any
    'hello': string
}
```

## ✅ Correct code Example

```ts
interface Hello {
    'hello': string
}
```

## License

MIT
