# @putout/plugin-parens [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-parens.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-parens"npm"

> The JavaScript exception "tagged template cannot be used with optional chain" occurs when the tag expression of a tagged template literal is an optional chain, or if there's an optional chain between the tag and the template.
>
> (c) [**MDN**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Bad_optional_template)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to add missing parens. Check out in 🐊[**Putout Editor**](https://putout.vercel.app/#/gist/a8ab0ffefed3b1e7dd0f43d794ea86f4/5d45fcc2e283b5b2d0b9e155010d1114b9f0a7ee).

## Install

```
npm i @putout/plugin-parens
```

## Rule

```json
{
    "rules": {
        "parens/add-missing": "on"
    }
}
```

## await

To disable use:

```json
{
    "rules": {
        "parens/add-missing-for-await": "off"
    }
}
```

## ❌ Example of incorrect code

```ts
await asyncFn().filter(Boolean);
```

## ✅ Example of correct code

```js
(await asyncFn()).filter(Boolean);
```

## template

Checkout in 🐊[**Putout Editor**](https://putout.vercel.app/#/gist/ef3f1e198a8d5ebeb9dd3fd1fef8f305/c6b46a34037f5cb095b5419b748a24b6dc8e2933).

```json
{
    "rules": {
        "parens/add-missing-for-template": "off"
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
(String?.raw)!``;
```

## License

MIT
