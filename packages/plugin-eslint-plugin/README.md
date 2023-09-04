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
        "eslint/apply-filename": "on",
        "eslint/convert-context-to-source": "on"
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

## convert-context-to-source

Replace deprated versions of ESLint v8 to equalent API of v9.
Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/d9dda4953b53340d4f54483ee3bbf2d5/d7182394c3b1a2b52e4c489b60da7365a9c94e09).

### ❌ Example of incorrect code

```js
context.parserServices;
context.getAncestors(node);
context.getDeclaredVariables(node);
context.getScope();
context.getCwd();
context.markVariableAsUsed(name);
context.getPhysicalFilename();
```

### ✅ Example of correct code

```js
sourceCode.parserServices;
sourceCode.getAncestors(node);

sourceCode.getDeclaredVariables(node);
sourceCode.getScope();
context.cwd;
sourceCode.markVariableAsUsed(name);
context.physicalFilename;
```

## License

MIT
