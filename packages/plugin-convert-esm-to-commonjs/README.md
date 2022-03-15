# @putout/plugin-convert-esm-to-commonjs [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-esm-to-commonjs.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-esm-to-commonjs"npm"

> **EcmaScript module** syntax is the standard way to import and export values between files in **JavaScript**. The `import` statement can be used to reference a value exposed by the `export` statement in another file.
>
> **CommonJS** is a module system supported in Node, it provides a `require` function, which can be used to access the `exports` object exposed by another file.
> 
> (c) [parceljs](https://parceljs.org/languages/javascript/)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to convert **EcmaScript Modules** to **CommonJS**.

## Install

```
npm i @putout/plugin-convert-esm-to-commonjs
```

## Rule

```json
{
    "rules": {
        "convert-esm-to-commonjs": "on"
    }
}
```

## ❌ Example of incorrect code

```js
import hello from 'world';
```

## ✅ Example of correct code

```js
const hello = require('world');
```

## License

MIT
