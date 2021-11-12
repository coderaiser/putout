# @putout/plugin-simplify-assignment [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-simplify-assignment.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-simplify-assignment "npm"

`putout` plugin adds ability to simplify `assignment`.

## Install

```
npm i @putout/plugin-simplify-assignment -D
```

## Rule

```json
{
    "rules": {
        "simplify-assignment": "on"
    }
}
```

## ❌ Incorrect code example

```js
const {a} = {
    a: 5,
};
const [b] = [5];
const c = (() => 7)();
```

## ✅ Correct code Example

```js
const a = 5;
const b = 5;
const c = 7;
```

## License

MIT
