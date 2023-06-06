# @putout/plugin-merge-destructuring-properties [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-merge-destructuring-properties.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-merge-destructuring-properties"npm"

> The destructuring assignment syntax is a JavaScript expression that makes it possible to unpack values from `arrays`, or `properties` from `objects`, into distinct `variables`.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to merge destructuring properties.

## Install

```
npm i @putout/plugin-merge-destructuring-properties
```

## Rule

Rule `merge-destructuring-properties` is enabled by default, to disable add to `.putout.json`:

```json
{
    "rules": {
        "merge-destructuring-properties": "off"
    }
}
```

### ❌ Example of incorrect code

```js
const {one} = require('numbers');
const {two} = require('numbers');
```

### ✅ Example of correct code

```js
const {one, two} = require('numbers');
```

## License

MIT
