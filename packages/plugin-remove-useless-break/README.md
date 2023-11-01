# @putout/plugin-remove-useless-break [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-break.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-break "npm"

> The `break` statement terminates the current loop or switch statement and transfers program control to the statement following the terminated statement.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to remove useless `break`.

## Install

```
npm i @putout/plugin-remove-useless-break
```

## Rule

```json
{
    "rules": {
        "remove-useless-break": "on"
    }
}
```

## ❌ Example of incorrect code

```js
while (a) {
    break;
}
```

## ✅ Example of correct code

```js
while (a) {}
```

## License

MIT
