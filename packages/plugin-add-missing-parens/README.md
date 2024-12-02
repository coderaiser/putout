# @putout/plugin-add-missing-parens [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-add-missing-parens.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-add-missing-parens"npm"

> The JavaScript exception "tagged template cannot be used with optional chain" occurs when the tag expression of a tagged template literal is an optional chain, or if there's an optional chain between the tag and the template.
>
> (c) [**MDN**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Bad_optional_template)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to add missing parens. Check out in 🐊[**Putout Editor**](https://putout.vercel.app/#/gist/a8ab0ffefed3b1e7dd0f43d794ea86f4/5d45fcc2e283b5b2d0b9e155010d1114b9f0a7ee).

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
