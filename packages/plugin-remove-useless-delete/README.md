# @putout/plugin-remove-useless-delete [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-assign.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-assign "npm"

> The `delete` operator removes a `property` from an `object`. If the `property`'s value is an `object` and there are no more references to the `object`, the `object` held by that `property` is eventually released automatically.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to remove useless `delete`.
Check it out in 🐊[Putout Editor](https://putout.cloudcmd.io/#/gist/71a95e8831318c77549ae2e49332f6a4/32dd1c3525ba8b65be2cf7fd02cb8e20646ac3f8).

Fixes syntax error:

> `SyntaxError: Delete of an unqualified identifier in strict mode.`
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Delete_in_strict_mode)

## Install

```
npm i @putout/plugin-remove-useless-delete
```

## Rule

```json
{
    "rules": {
        "remove-useless-assign": "on"
    }
}
```

## ❌ Example of incorrect code

```js
delete x;
delete x.x;
delete x[1];
```

## ✅ Example of correct code

```js
delete x.x;
delete x[1];
```

## Comparison

Linter | Rule | Fix
--------|-------|------------|
🐊 **Putout** | [`remove-useless-delete`](https://github.com/coderaiser/putout/tree/master/packages/plugin-remove-useles-delete#readme) | ✅
⏣ **ESLint** | [`no-delete-var`](https://eslint.org/docs/rules/no-delete-var) | ❌
🦕 **Deno** | [`no-delete-var`](https://lint.deno.land/rules/no-delete-var) | ❌

## License

MIT
