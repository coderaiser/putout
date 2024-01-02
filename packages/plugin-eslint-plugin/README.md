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
        "eslint-plugin/convert-context-to-source": "on",
        "eslint-plugin/apply-flat-config-to-rule-tester": "on"
    }
}
```

## convert-context-to-source

> When **ESLint** v9.0.0 is released, it will ship with several breaking changes for rule authors.
> These changes are necessary as part of the work to implement language plugins, which gives **ESLint** first-class support for linting languages other than JavaScript.
>
> (c) [eslint.org](https://eslint.org/blog/2023/09/preparing-custom-rules-eslint-v9/)

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/d9dda4953b53340d4f54483ee3bbf2d5/d7182394c3b1a2b52e4c489b60da7365a9c94e09).

### ❌ Example of incorrect code

```js
context.parserServices;
sourceCode.parserServices;
context.getAncestors(node);
context.getDeclaredVariables(node);
context.getScope();
context.getCwd();
context.getSourceCode();
context.markVariableAsUsed(name);
context.getFilename();
context.getPhysicalFilename();
const nextNode = context.getNodeByRangeIndex(node.range[1] + 2);

context.getSource();
context.getSourceLines();
context.getAllComments();
context.getComments();
context.getCommentsBefore();
context.getCommentsAfter();
context.getCommentsInside();
context.getJSDocComment();
context.getFirstToken();
context.getFirstTokens();
context.getLastToken();
context.getLastTokens();
context.getTokenAfter();
context.getTokenBefore();
context.getTokenByRangeStart();
context.getTokens();
context.getTokensAfter();
context.getTokensBefore();
context.getTokensBetween();
context.parserServices;
```

### ✅ Example of correct code

```js
sourceCode.parserServices;
sourceCode.parserServices;
sourceCode.getAncestors(node);
sourceCode.getDeclaredVariables(node);
sourceCode.getScope();
context.cwd;
context.sourceCode;
sourceCode.markVariableAsUsed(name);
context.filename;
context.physicalFilename;
const nextNode = sourceCode.getNodeByRangeIndex(node.range[1] + 2);

sourceCode.getText();
sourceCode.getLines();
sourceCode.getAllComments();
sourceCode.getComments();
sourceCode.getCommentsBefore();
sourceCode.getCommentsAfter();
sourceCode.getCommentsInside();
sourceCode.getJSDocComment();
sourceCode.getFirstToken();
sourceCode.getFirstTokens();
sourceCode.getLastToken();
sourceCode.getLastTokens();
sourceCode.getTokenAfter();
sourceCode.getTokenBefore();
sourceCode.getTokenByRangeStart();
sourceCode.getTokens();
sourceCode.getTokensAfter();
sourceCode.getTokensBefore();
sourceCode.getTokensBetween();
sourceCode.parserServices;
```

## apply-flat-config-to-rule-tester

### ❌ Example of incorrect code

```js
const parserTester = new RuleTester({
    parser: require.resolve('@babel/eslint-parser/experimental-worker'),
    parserOptions: {
        requireConfigFile: false,
        babelOptions: {
            plugins: ['@babel/plugin-syntax-typescript'],
        },
    },
});
```

### ✅ Example of correct code

```js
const parserTester = new RuleTester({
    parser: require.resolve('@babel/eslint-parser/experimental-worker'),
    parserOptions: {
        requireConfigFile: false,
        babelOptions: {
            plugins: ['@babel/plugin-syntax-typescript'],
        },
    },
});
```

## License

MIT
