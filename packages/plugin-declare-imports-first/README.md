# @putout/plugin-declare-imports-first [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-declare-imports-first.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-declare-imports-first "npm"

> The static `import` declaration is used to import read-only live bindings which are exported by another module.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to declare imports first.

Check out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/b1c18e5d726afe4ebb69d6b7a7dda82b/8189590815a1b8adb35bb8a846e28228e3c7fadf).

## Install

```
npm i @putout/plugin-declare-imports-first
```

## Rule

```json
{
    "rules": {
        "declare-imports-first": "on"
    }
}
```

## ❌ Example of incorrect code

```js
const [arg] = process.argv;
import esbuild from 'esbuild';
```

## ✅ Example of correct code

```js
import esbuild from 'esbuild';
const [arg] = process.argv;
```

## License

MIT
