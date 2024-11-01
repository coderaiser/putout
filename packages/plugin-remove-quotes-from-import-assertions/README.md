# @putout/plugin-remove-quotes-from-import-assertions [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-quotes-from-import-assertions.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-quotes-from-import-assertions"npm"

> The new import assertions feature allows module import statements to include additional information alongside the module specifier. An initial use for the feature is to enable JSON documents to be imported as JSON modules:
>
> (c) [MDN](https://v8.dev/features/import-assertions)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to find and remove quotes from import assertions.
Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/f9f34acddbefba0ded53225ca10fa44e/7b4dba44602b9b2d28fe3a98989474a4b0d8d73d).

## Install

```
npm i @putout/plugin-remove-quotes-from-import-assertions
```

## Rule

```json
{
    "rules": {
        "remove-quotes-from-import-assertions": "on"
    }
}
```

## ❌ Example of incorrect code

```js
import json from './mod.json' with { type: 'json' };
```

## ✅ Example of correct code

```js
import json from './mod.json' with { type: 'json' };
```
