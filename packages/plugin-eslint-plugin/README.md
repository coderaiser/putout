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

- ✅ [apply-flat-config-to-rule-tester](#apply-flat-config-to-rule-tester);
- ✅ [convert-context-to-source](#convert-context-to-source);
- ✅ [convert-require-resolve-to-require](#convert-require-resolve-to-require);
- ✅ [turn-off-schema](#turn-off-schema);
- ✅ [update-ecma-version](#update-ecma-version);

## Config

```json
{
    "rules": {
        "eslint-plugin/convert-context-to-source": "on",
        "eslint-plugin/apply-flat-config-to-rule-tester": "on",
        "eslint-plugin/convert-require-resolve-to-require": "on",
        "eslint-plugin/turn-off-schema": "on",
        "eslint-plugin/update-ecma-version": ["on", {
            "ecmaVersion": 2024
        }]
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

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/51bc804a64700c235746915f082a926d/d5f3c107eedf8c3ccec62550c1b4a0a6ea1db4ac).

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

## convert-require-resolve-to-require

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/b064422ac6ef61e7d31b8c076c74e2d5/6f5f66668767f5e13ea08373d58bac3efb24452b).

### ❌ Example of incorrect code

```js
const test = new RuleTester({
    languageOptions: {
        parser: require.resolve('@babel/eslint-parser/experimental-worker'),
        parserOptions: {
            requireConfigFile: false,
            babelOptions: {
                plugins: ['@babel/plugin-syntax-typescript'],
            },
        },
    },
});
```

### ✅ Example of correct code

```js
const test = new RuleTester({
    languageOptions: {
        parser: require('@babel/eslint-parser/experimental-worker'),
        parserOptions: {
            requireConfigFile: false,
            babelOptions: {
                plugins: ['@babel/plugin-syntax-typescript'],
            },
        },
    },
});
```

## turn-off-schema

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/5044f09074f6d4772dc637962c49d73d/dde068d6773f3bc7bf6c47892487e155a5ef3cc4).

### ❌ Example of incorrect code

```js
function getMeta(plugin) {
    const {
        type = 'layout',
        recommended = true,
        fixable = 'whitespace',
    } = plugin;
    
    return {
        type,
        docs: {
            recommended,
        },
        schema: {},
        fixable,
    };
}
```

### ✅ Example of correct code

```js
function getMeta(plugin) {
    const {
        type = 'layout',
        recommended = true,
        fixable = 'whitespace',
    } = plugin;
    
    return {
        type,
        docs: {
            recommended,
        },
        schema: false,
        fixable,
    };
}
```

## update-ecma-version

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/42748dc7b02e9476b51ab68dc4695ba1/81bc39b3429c470fb989c4d5241e61c305e66971).

### ❌ Example of incorrect code

```js
const ruleTester = new RuleTester({
    languageOptions: {
        parserOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
        },
    },
});
```

### ✅ Example of correct code

```js
const ruleTester = new RuleTester({
    languageOptions: {
        parserOptions: {
            ecmaVersion: 2024,
            sourceType: 'module',
        },
    },
});
```

## License

MIT
