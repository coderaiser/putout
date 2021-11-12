# @putout/plugin-remove-unused-types [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-unused-types.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-unused-types "npm"

`putout` plugin adds ability to find and remove `unused types`.

## Install

```
npm i @putout/plugin-remove-unused-types -D
```

## Rule

```json
{
    "rules": {
        "remove-unused-types": "on"
    }
}
```

## ❌ Incorrect code example

```ts
type n = number;
type s = string;

const x: n = 5;
```

## ✅ Correct code Example

```ts
type n = number;

const x: n = 5;
```

## License

MIT
