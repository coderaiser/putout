# @putout/plugin-remove-useless-escape [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-escape.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-escape"npm"

`putout` plugin adds ability to find and remove useless escape.

## Install

```
npm i @putout/plugin-remove-useless-escape
```

## Rule

```json
{
    "rules": {
        "remove-useless-escape": "on"
    }
}
```

## ❌ Incorrect code example

```js
const t = 'hello \"world\"';
const s1 = `hello \"world\"`;
const s = `hello \'world\'`;
const reg = /\w\:/g;
```

## ✅ Correct code Example

```js
const t = 'hello "world"';
const s1 = `hello "world"`;
const s = `hello 'world'`;
const reg = /\w:/g;
```

## License

MIT
