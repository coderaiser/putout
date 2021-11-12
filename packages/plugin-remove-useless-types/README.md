# @putout/plugin-remove-useless-types [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-types.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-types "npm"

`putout` plugin adds ability to find and remove `useless types`.

## Install

```
npm i @putout/plugin-remove-useless-types -D
```

## Rule

```json
{
    "rules": {
        "remove-useless-types": "on"
    }
}
```

## ❌ Incorrect code example

```ts
type oldType = {
    a: number,
    b: string,
};

type newType = oldType;

const x:newType = 5;
```

## ✅ Correct code Example

```ts
type oldType = {
    a: number,
    b: string,
};

const x:oldType = 5;
```

## License

MIT
