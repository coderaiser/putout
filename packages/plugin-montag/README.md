# @putout/plugin-apply-montag [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-apply-montag.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-apply-montag"npm"

> Format multiline strings using tagged templates, instead of putting all lines into an array and joining to a string.
>
> (c) [**Montag**](https://github.com/coderaiser/montag)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to apply [**Montag**](https://github.com/coderaiser/montag).

## Install

```
npm i @putout/plugin-apply-montag
```

## Rule

```json
{
    "rules": {
        "montag/apply": "on",
        "montag/declare": "on"
    }
}
```

## apply

### ❌ Example of incorrect code

```js
const a = [
    'hello',
    'world',
].join('\n');
```

### ✅ Example of correct code

```js
const a = montag`
    hello
    world
`;
```

## declare

### ❌ Example of incorrect code

```js
const a = montag`
    hello
    world
`;
```

### ✅ Example of correct code

```js
import montag from 'montag';

const a = montag`
    hello
    world
`;
```

## License

MIT
