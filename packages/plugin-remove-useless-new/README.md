# @putout/plugin-remove-useless-map [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-map.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-map"npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-useless-map
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-useless-map

`putout` plugin adds ability to remove useless operator `new`. Which has no sense for `Boolean`, `String`, `Number`, `Error`:

> Thus the function call `Error(…)` is equivalent to the object creation expression `new Error(…)` with the same arguments.
>
>  (c) https://262.ecma-international.org/12.0/#sec-error-constructor

[`Symbol`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) cannot be used with `new`, as it is primitive.

## Install

```
npm i @putout/plugin-remove-useless-map
```

## Rule

```json
{
    "rules": {
        "remove-useless-map": "on"
    }
}
```

## ❌ Incorrect code example

```js
new Error('Something whent wrong');
```

## ✅ Correct code Example

```js
Error('Something whent wrong');
```

## License

MIT
