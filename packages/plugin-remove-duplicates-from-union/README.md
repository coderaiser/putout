# @putout/plugin-remove-duplicates-from-union [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-duplicates-from-union.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-duplicates-from-union "npm"

[`putout`](https://github.com/coderaiser/putout) plugin adds ability to find and remove `duplicates` from `union` (for typescript).

## Install

```
npm i @putout/plugin-remove-duplicates-from-union -D
```

## Rule

```json
{
    "rules": {
        "remove-duplicates-from-union": "on"
    }
}
```

## ❌ Incorrect code example

```ts
type x = boolean[]
    | A
    | string
    | A
    | string[]
    | boolean[];
```

## ✅ Correct code Example

```ts
type x = boolean[]
    | A
    | string
    | string[];
```

## License

MIT
