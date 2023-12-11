# @putout/plugin-convert-assert-to-with [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-assert-to-with.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-assert-to-with "npm"

> This feature would ideally use the `with` keyword to denote attributes, but there are existing implementations based on a previous version of the proposal using the `assert` keyword. Due to potential web compatibility risks, the proposal still includes `assert` marked as deprecated. Usage of the old syntax is discouraged, and its removal is being investigated.

> (c) [tc39](https://tc39.es/proposal-import-attributes/)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to convert `assert` to `with`.
Check out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/9f85897b998c6458efc19db6a5414b79/57ef7cdd113c7a0087e0f7a6e70522f60baa04f4).

## Install

```
npm i @putout/plugin-convert-assert-to-with -D
```

## Rule

```json
{
    "rules": {
        "convert-assert-to-with": "on"
    }
}
```

## ❌ Example of incorrect code

```js
import json from './foo.json' with { type: 'json' };

import('foo.json');
```

## ✅ Example of correct code

```js
import json from './foo.json' with { type: 'json' };

import('foo.json');
```

## License

MIT
