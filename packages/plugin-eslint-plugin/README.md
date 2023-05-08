# @putout/plugin-eslint-plugin [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-eslint-plugin.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-eslint-plugin"npm"

> Find and fix problems in your JavaScript code
>
> (c) [eslint.org](https://eslint.org/)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin helps to automate fixing **ESLint** plugins.

## Install

```
npm i @putout/plugin-eslint-plugin -D
```

## Rules

```json
{
    "rules": {
        "eslint/apply-source-code": "on",
        "eslint/apply-filename": "on"
    }
}
```

## apply-source-code

According to [v8.40](https://eslint.org/blog/2023/05/eslint-v8.40.0-released/), `context.getSourceCode()` is deprecated in favour of `context.sourceCode`.

### ❌ Example of incorrect code

```js
context.getSourceCode();
```

### ✅ Example of correct code

```js
context.sourceCode;
```

## apply-filename

According to [v8.40](https://eslint.org/blog/2023/05/eslint-v8.40.0-released/), `context.getFilename()` is deprecated in favour of `context.filename`.

### ❌ Example of incorrect code

```js
context.getFilename();
```

### ✅ Example of correct code

```js
context.filename;
```

## License

MIT
