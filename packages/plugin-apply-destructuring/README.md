# @putout/plugin-apply-destructuring [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-apply-destructuring.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-apply-destructuring"npm"

`putout` plugin adds ability to use destructuring on variable declaratoins.

## Install

```
npm i @putout/plugin-apply-destructuring
```

## Rule

Rule `apply-destructuring` is enabled by default, to disable add to `.putout.json`:

```json
{
    "rules": {
        "apply-destructuring/object": "off",
        "apply-destructuring/array": "off"
    }
}
```

## ❌ Incorrect code example

```js
const first = array[0];
const name = user.name;
```

## ✅ Correct code Example

```js
const [first] = array;
const {name} = user;
```

## License

MIT
