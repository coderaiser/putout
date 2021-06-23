# @putout/plugin-simplify-assignment [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-simplify-assignment.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-simplify-assignment "npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/plugin-simplify-assignment
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-simplify-assignment

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
