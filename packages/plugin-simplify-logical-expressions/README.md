# @putout/plugin-simplify-logical-expressions [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-simplify-logical-expressions.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-simplify-logical-expressions "npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-simplify-logical-expressions
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-simplify-logical-expressions

`putout` plugin adds ability to simplify `logical-expressions`.

## Install

```
npm i @putout/plugin-simplify-logical-expressions -D
```

## Rule

```json
{
    "rules": {
        "simplify-logical-expressions": "on"
    }
}
```

## ❌ Incorrect code example

```js
const is = !(options && !options.bidirectional);
```

## ✅ Correct code Example

```js
const is = !options || options.bidirectional;
```

## License

MIT

