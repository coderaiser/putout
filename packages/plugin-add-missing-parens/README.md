# @putout/plugin-add-missing-parens [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-add-missing-parens.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-add-missing-parens"npm"

> The JavaScript exception "tagged template cannot be used with optional chain" occurs when the tag expression of a tagged template literal is an optional chain, or if there's an optional chain between the tag and the template.
>
> (c) [**MDN**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Bad_optional_template)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to add missing parens.

## Install

```
npm i @putout/plugin-add-missing-parens
```

## Rule

```json
{
    "rules": {
        "add-missing-parens": "on"
    }
}
```

## ❌ Example of incorrect code

```ts
getConsoleLog?.()``;
String?.raw``;
String?.raw!``;
```

## ✅ Example of correct code

```ts
(getConsoleLog?.())``;
(String?.raw)``;
String?.raw!``;
```

## License

MIT
