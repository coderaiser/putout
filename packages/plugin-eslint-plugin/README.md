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
        "eslint/convert-context-to-source": "on"
    }
}
```

## convert-context-to-source

According to [v8.40](https://eslint.org/blog/2023/05/eslint-v8.40.0-released/):

- `context.getSourceCode()` is deprecated in favour of `context.sourceCode`;
- `context.getFilename()` is deprecated in favour of `context.filename`;
- etc;

So is better to replace deprecated API of ESLint v8 to equalent future proof API for v9.
Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/d9dda4953b53340d4f54483ee3bbf2d5/d7182394c3b1a2b52e4c489b60da7365a9c94e09).

### ❌ Example of incorrect code

```js
context.getSourceCode();
context.parserServices;
context.getAncestors(node);
context.getDeclaredVariables(node);
context.getScope();
context.getCwd();
context.markVariableAsUsed(name);
context.getFilename();
context.getPhysicalFilename();
```

### ✅ Example of correct code

```js
sourceCode.parserServices;
sourceCode.getAncestors(node);
sourceCode.getDeclaredVariables(node);
sourceCode.getScope();
sourceCode.markVariableAsUsed(name);
context.cwd;
context.sourceCode;
context.filename;
context.physicalFilename;
```

## License

MIT
