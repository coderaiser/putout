# @putout/plugin-remove-useless-else [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-else.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-else"npm"

> You can skip the `else` block if your `if` block always executes a `return` statement, it makes code a lot easier to read.
>
> (c) [no else return](https://www.samanthaming.com/tidbits/23-no-else-return/)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to remove useless `else`.

## Install

```
npm i @putout/plugin-remove-useless-else
```

## Rule

```json
{
    "rules": {
        "remove-useless-else": "on"
    }
}
```

## ❌ Example of incorrect code

```js
if (x)
    return;
else
    console.log();
```

## ✅ Example of correct code

```js
if (x)
    return;

console.log();
```

## License

MIT
