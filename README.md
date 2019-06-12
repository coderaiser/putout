# Putout [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/putout.svg?style=flat&longCache=true
[BuildStatusIMGURL]:        https://img.shields.io/travis/coderaiser/putout/master.svg?style=flat&longCache=true
[DependencyStatusIMGURL]:   https://img.shields.io/david/coderaiser/putout.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/putout "npm"
[BuildStatusURL]:           https://travis-ci.org/coderaiser/putout  "Build Status"
[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout "Dependency Status"

[CoverageURL]:              https://coveralls.io/github/coderaiser/putout?branch=master
[CoverageIMGURL]:           https://coveralls.io/repos/coderaiser/putout/badge.svg?branch=master&service=github

Putout is a pluggable and configurable code transformer. It work's in a similar but more powerful than `eslint` way.
While `eslint` can tell you about `unused variable`, `debugger` statement or redundant `console.log`, it fixes mostly whitespaces. `Putout` can fix all this things and [much more](#built-in-transforms).

[![putout](https://asciinema.org/a/236695.svg)](https://asciinema.org/a/236695)

## Why?

- because [eslint](https://eslint.org) avoids [fixes that could change the runtime behavior](https://eslint.org/docs/developer-guide/working-with-rules#applying-fixes).
- because [babel](https://babeljs.io) produces [throw-away code](https://github.com/babel/babel/issues/5139);
- because [pretier](https://github.com/prettier/prettier) it is a formatter;
- because [jscodeshift](https://github.com/facebook/jscodeshift) has no `config` and `plugins` support.

The main difference of `putout` is saving code transformation results directly in a source code in a day-to-day baisis.

## Install

```
npm i putout -g
```

## Usage

```
Usage: putout [options] [path]
Options:
  -h, --help              display this help and exit
  -v, --version           output version information and exit
  -f, --format            use a specific output format - default: dump
  --fix                   aply found fixes of errors to code
  --fix-count             count of fixes rounds (defaults to 10)
```

To find possible transform places:

```
putout lib test
```

To apply transforms:

```
putout lib test --fix
```

## Built-in transforms

<details><summary>remove unused variables</summary>

```diff
  function show() {
-     const message = 'hello';
      console.log('hello world');
  }
```
</details>

<details><summary>remove unused private fields</summary>

```diff
  class Hello {
    #a = 5;
-   #b = 3;
    get() {
        return this.#a;
    };
}
```
</details>

<details><summary>remove unused expressions</summary>

```diff
  function show(error) {
-     showError;
  }
```
</details>

<details><summary>remove useless variables</summary>

```diff
-   function hi(a) {
-       const b = a;
    };
+   function hi(b) {
    };
```
</details>

<details><summary>remove <code>debugger</code> statement</summary>

```diff
- debugger;
```
</details>

<details><summary>remove <code>boolean</code> from <code>logical expressions</code></summary>

```diff
-const t = true && false;
-const t = false;
```
</details>

<details><summary>replace <code>test.only</code> to <code>test</code> calls</summary>

```diff
-test.only('some test here', (t) => {
+test('some test here', (t) => {
    t.end();
});
```
</details>

<details><summary>replace <code>test.skip</code> to <code>test</code> calls</summary>

```diff
-test.skip('some test here', (t) => {
+test('some test here', (t) => {
    t.end();
});
```
</details>

<details><summary>remove <code>process.exit</code> call</summary>

```diff
-process.exit();
```
</details>

<details><summary>split variable declarations</summary>

```diff
-let a, b;
+let a;
+let b;
```
</details>

<details><summary>remove <code>console.log</code> calls</summary>

```diff
-console.log('hello');
```
</details>

<details><summary>remove empty block statements</summary>

```diff
-if (x > 0) {
-}
```
</details>

<details><summary>remove empty patterns</summary>

```diff
-const {} = process;
```
</details>

<details><summary>remove strict mode directive from esm</summary>

```diff
-'use strict';
-
import * from fs;
```
</details>

<details><summary>if absent <code>strict mode</code> directive in <code>commonjs</code> add it</summary>

```diff
+'use strict';
+
const fs = require('fs');
```
</details>

<details><summary>remove <code>constant conditions</code></summary>

```diff
function hi(a) {
-   if (2 < 3) {
-       console.log('hello');
-       console.log('world');
-   }
+   console.log('hello');
+   console.log('world');
};

function world(a) {
-   if (false) {
-       console.log('hello');
-       console.log('world');
-   }
};
```
</details>

<details><summary>convert <code>esm</code> to <code>commonjs</code></summary>

```diff
-import hello from 'world';
+const hello = require('world');
```
</details>
<details><summary>convert <code>commonjs</code> to <code>esm</code></summary>

```diff
-const hello = require('world');
+import hello from 'world';
```
</details>

<details><summary>apply destructuring</summary>

```diff
-const hello = world.hello;
-const a = b[0];
+const {hello} = world; 
+const [a] = b;
```
</details>

<details><summary>merge destructuring properties</summary>

```diff
-const {one} = require('numbers'):
-const {two} = require('numbers');
+ const {
+   one,
+   two
+} = require('numbers');
```
</details>

<details><summary>convert <code>Math.pow</code> to <code>exponentiation operator</code></summary>

```diff
-Math.pow(2, 4);
+2 ** 4;
```

</details>

<details><summary>extract sequence expressions</summary>

```diff
-module.exports.x = 1,
-module.exports.y = 2;
+module.exports.x = 1;
+module.exports.y = 2;
```

</details>

<details><summary>convert <code>apply</code> to <code>spread</code></summary>

```diff
-console.log.apply(console, arguments);
+console.log(...arguments);
```
</details>

<details><summary>convert <code>arguments</code> to <code>rest</code></summary>

```diff
-function hello() {
-    console.log(arguments);
+function hello(...args) {
+    console.log(args);
}
```
</details>

<details><summary>convert <code>Object.assign</code> to <code>merge spread</code></summary>

```diff
function merge(a) {
-   return Object.assign({}, a, {
-       hello: 'world'
-   });
+   return {
+       ...a,
+       hello: 'world'
+   };
};
```
</details>

<details><summary>convert <code>binary expression</code> to <code>boolean</code></summary>

```diff
-   const a = b === b;
+   const a = true;
```
</details>

## Plugins

The `putout` repo is comprised of many npm packages. It is a [lerna](https://github.com/lerna/lerna) monorepo similar to [babel](https://github.com/babel/babel).

| Package | Version | Dependencies |
|--------|-------|------------|
| [`@putout/plugin-remove-unused-variables`](/packages/plugin-remove-unused-variables) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-unused-variables.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-unused-variables) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-unused-variables)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-unused-variables) |
| [`@putout/plugin-remove-unused-expressions`](/packages/plugin-remove-unused-expressions) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-unused-expressions.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-unused-expressions) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-unused-expressions)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-unused-expressions) |
| [`@putout/plugin-remove-unused-private-fields`](/packages/plugin-remove-unused-private-fields) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-unused-private-fields.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-unused-private-fields) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-unused-private-fields)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-unused-private-fields) |
| [`@putout/plugin-remove-useless-variables`](/packages/plugin-remove-useless-variables) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-useless-variables.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-useless-variables) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-useless-variables)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-useless-variables) |
| [`@putout/plugin-remove-process-exit`](/packages/plugin-remove-process-exit) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-process-exit.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-process-exit) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-process-exit)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-process-exit) |
| [`@putout/plugin-remove-debugger`](/packages/plugin-remove-debugger) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-debugger.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-debugger) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-debugger)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-debugger) |
| [`@putout/plugin-remove-only`](/packages/plugin-remove-only) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-only.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-only) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-only)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-only) |
| [`@putout/plugin-remove-skip`](/packages/plugin-remove-skip) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-skip.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-skip) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-skip)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-skip) |
| [`@putout/plugin-split-variable-declarations`](/packages/plugin-split-variable-declarations) | [![npm](https://img.shields.io/npm/v/@putout/plugin-split-variable-declarations.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-split-variable-declarations) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-split-variable-declarations)](https://david-dm.org/coderaiser/putout?path=packages/plugin-split-variable-declarations) |
| [`@putout/plugin-remove-console`](/packages/plugin-remove-console) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-console.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-console) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-console)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-console) |
| [`@putout/plugin-remove-empty`](/packages/plugin-remove-empty) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-empty.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-empty) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-empty)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-empty) |
| [`@putout/plugin-remove-empty-pattern`](/packages/plugin-remove-empty-pattern) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-empty-pattern.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-empty-pattern) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-empty-pattern)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-empty-pattern) |
| [`@putout/plugin-remove-constant-conditions`](/packages/plugin-remove-constant-conditions) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-constant-conditions.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-constant-conditions) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-constant-conditions)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-constant-conditions) |
| [`@putout/plugin-remove-boolean-from-logical-expressions`](/packages/plugin-remove-boolean-from-logical-expressions) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-boolean-from-logical-expressions.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-boolean-from-logical-expressions) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-boolean-from-logical-expressions)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-boolean-from-logical-expressions) |
| [`@putout/plugin-convert-esm-to-commonjs`](/packages/plugin-convert-esm-to-commonjs) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-esm-to-commonjs.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-esm-to-commonjs) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-esm-to-commonjs)](https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-esm-to-commonjs) |
| [`@putout/plugin-convert-commonjs-to-esm`](/packages/plugin-convert-commonjs-to-esm) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-commonjs-to-esm.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-commonjs-to-esm) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-commonjs-to-esm)](https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-commonjs-to-esm) |
| [`@putout/plugin-apply-destructuring`](/packages/plugin-apply-destructuring) | [![npm](https://img.shields.io/npm/v/@putout/plugin-apply-destructuring.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-apply-destructuring) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-apply-destructuring)](https://david-dm.org/coderaiser/putout?path=packages/plugin-apply-destructuring) |
| [`@putout/plugin-merge-destructuring-properties`](/packages/plugin-merge-destructuring-properties) | [![npm](https://img.shields.io/npm/v/@putout/plugin-merge-destructuring-properties.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-merge-destructuring-properties) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-merge-destructuring-properties)](https://david-dm.org/coderaiser/putout?path=packages/plugin-merge-destructuring-properties) |
| [`@putout/plugin-react-hooks`](/packages/plugin-react-hooks) | [![npm](https://img.shields.io/npm/v/@putout/plugin-react-hooks.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-react-hooks) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-react-hooks)](https://david-dm.org/coderaiser/putout?path=packages/plugin-react-hooks) |
| [`@putout/plugin-madrun`](/packages/plugin-madrun) | [![npm](https://img.shields.io/npm/v/@putout/plugin-madrun.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-madrun) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-madrun)](https://david-dm.org/coderaiser/putout?path=packages/plugin-madrun) |
| [`@putout/plugin-strict-mode`](/packages/plugin-strict-mode) | [![npm](https://img.shields.io/npm/v/@putout/plugin-strict-mode.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-strict-mode) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-strict-mode)](https://david-dm.org/coderaiser/putout?path=packages/plugin-strict-mode) |
| [`@putout/plugin-convert-math-pow`](/packages/plugin-convert-math-pow) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-math-pow.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-math-pow) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-math-pow)](https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-math-pow) |
| [`@putout/plugin-extract-sequence-expressions`](/packages/plugin-extract-sequence-expressions) | [![npm](https://img.shields.io/npm/v/@putout/plugin-extract-sequence-expressions.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-extract-sequence-expressions) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-extract-sequence-expressions)](https://david-dm.org/coderaiser/putout?path=packages/plugin-extract-sequence-expressions) |
| [`@putout/plugin-convert-apply-to-spread`](/packages/plugin-convert-apply-to-spread) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-apply-to-spread.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-apply-to-spread) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-apply-to-spread)](https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-apply-to-spread) |
| [`@putout/plugin-convert-arguments-to-rest`](/packages/plugin-convert-arguments-to-rest) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-arguments-to-rest.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-arguments-to-rest) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-arguments-to-rest)](https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-arguments-to-rest) |
| [`@putout/plugin-convert-object-assign-to-merge-spread`](/packages/plugin-convert-object-assign-to-merge-spread) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-object-assign-to-merge-spread.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-object-assign-to-merge-spread) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-object-assign-to-merge-spread)](https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-object-assign-to-merge-spread) |
| [`@putout/plugin-convert-binary-expression-to-boolean`](/packages/plugin-convert-binary-expression-to-boolean) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-binary-expression-to-boolean.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-binary-expression-to-boolean) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-binary-expression-to-boolean)](https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-binary-expression-to-boolean) |
| [`@putout/plugin-putout`](/packages/plugin-putout) | [![npm](https://img.shields.io/npm/v/@putout/plugin-putout.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-putout) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-putout)](https://david-dm.org/coderaiser/putout?path=packages/plugin-putout) |

## Formatters

`putout` use formatters similar to [eslint's formatters](https://eslint.org/docs/user-guide/formatters/).
You can specify a formatter using the `--format` or `-f` flag on the command line. For example, `--format codeframe` uses the `codeframe` formatter.

The built-in formatter options are:
- `dump`
- `stream`
- `json`
- `codeframe`
- `progress`

| Package | Version | Dependencies |
|---------|---------|--------------|
| [`@putout/formatter-dump`](/packages/formatter-dump) | [![npm](https://img.shields.io/npm/v/@putout/formatter-dump.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/formatter-dump) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/formatter-dump)](https://david-dm.org/coderaiser/putout?path=packages/formatter-dump) |
| [`@putout/formatter-stream`](/packages/formatter-stream) | [![npm](https://img.shields.io/npm/v/@putout/formatter-stream.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/formatter-stream) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/formatter-stream)](https://david-dm.org/coderaiser/putout?path=packages/formatter-stream) |
| [`@putout/formatter-progress`](/packages/formatter-progress) | [![npm](https://img.shields.io/npm/v/@putout/formatter-progress.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/formatter-progress) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/formatter-progress)](https://david-dm.org/coderaiser/putout?path=packages/formatter-progress) |
| [`@putout/formatter-json`](/packages/formatter-json) | [![npm](https://img.shields.io/npm/v/@putout/formatter-json.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/formatter-json) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/formatter-json)](https://david-dm.org/coderaiser/putout?path=packages/formatter-json) |
| [`@putout/formatter-codeframe`](/packages/formatter-codeframe) | [![npm](https://img.shields.io/npm/v/@putout/formatter-codeframe.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/formatter-codeframe) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/formatter-codeframe)](https://david-dm.org/coderaiser/putout?path=packages/formatter-codeframe) |
| [`@putout/formatter-eslint`](/packages/formatter-eslint) | [![npm](https://img.shields.io/npm/v/@putout/formatter-eslint.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/formatter-eslint) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/formatter-eslint)](https://david-dm.org/coderaiser/putout?path=packages/formatter-eslint) |

### Custom Formatter

Formatter function executes on every processed file, it should return `output string`.

```
module.exports = ({name, source, places, index, count, filesCount, errorsCount}) => {
    return '';
};
```

Here is list of options:

- `name` - name of processed file
- `source` - source code of processed file
- `index` - current index
- `count` - processing files count
- `filesCount` - count of files with errors
- `errorsCount` count of errors

You can avoid any of this and use only what you nead. To make possible using with `putout` add prefix `putout-formatter-` to your `npm package`,
and add tags `putput`, `formatter`, `putout-formatter`.

### Eslint Formatters

`eslint formatters` can be used as well with help of `@putout/formatter-eslint` this way:

Install:
```
npm i putout @putout/formatter-eslint eslint-formatter-pretty -D
```

Run:
```sh
ESLINT_FORMATTER=pretty putout -f eslint lib
```

## Configuration

To configure `putout` add section `putout` to your `package.json` file or create `.putout.json` file and override any option:

```json
{
    "formatter": "dump",
    "match": {
        "madrun.js": {
            "madrun/*": true
        },
        "bin": {
            "remove-process-exit": false,
            "remove-console": false
        },
        "test|.spec.js": {
            "remove-only": true,
            "remove-skip": true,
            "putout": true
        }
    },
    "ignore": [
        "node_modules"
    ],
    "rules": {
        "madrun/*": false,
        "convert-esm-to-commonjs": false,
        "convert-commonjs-to-esm": false,
        "remove-only": false,
        "remove-skip": false
    },
    "plugins": [
        "apply-destructuring",
        "madrun",
        "remove-debugger",
        "remove-only",
        "remove-skip",
        "remove-process-exit",
        "remove-console",
        "remove-empty",
        "remove-unused-variables",
        "remove-unused-private-fields",
        "remove-unused-expressions",
        "remove-useless-variables",
        "remove-constant-conditions",
        "remove-boolean-from-logical-expressions",
        "split-variable-declarations",
        "convert-esm-to-commonjs",
        "convert-commonjs-to-esm",
        "convert-apply-to-spread",
        "convert-arguments-to-rest",
        "convert-object-assign-to-merge-spread",
        "convert-math-pow",
        "convert-binary-expression-to-boolean",
        "extract-sequence-expressions",
        "merge-destructuring-properties",
        "strict-mode",
        "putout"
    ]
}
```

### Match

When you need to match paths to rules you can use `match` section for this purpose in `.putout.json`:

```json
{
    "match": {
        "server": {
            "remove-process-exit": true
        }
    }
}
```

### Ignore

When you need to ignore some routes no metter what, you can use `ignore` section in `.putout.json`:

```json
{
    "ignore": [
        "test/fixture"
    ]
}
```

### Plugins

`Putout` supports `plugins`, there is to types: with prefix official `@putout/plugin-` and user plugins with prefix `putout-plugin-`. To use your plugin create plugin as `npm` package with keywords `putout`, `putout-plugin` and add it to `.putout.json`.

For example if you need to `remove-something` create `putout` plugin with name `putout-plugin-remove-something` and add it to `.putout.json`:

```json
{
    "plugins": [
        "remove-something"
    ]
}
```

Add `putout` as a `peerDependency` to your `packages.json` and set keywords: `putout`, `putout-plugin` so other users can find it 🙂.

#### Plugins API

Every `putout` plugin should contain 3 functions:

- `report(path)` - report error message to `putout` cli;
- `find(ast, context)` - find errors using `ast-traversing` and return `places` array;
- `fix(path)` - fixes paths using `places` array received using `find` function;

`context` of `find` function contains [@babel/traverse](https://babeljs.io/docs/en/next/babel-traverse.html) and [@babel/types](https://babeljs.io/docs/en/next/babel-types.html). Also there is [template](https://babeljs.io/docs/en/next/babel-template.html). All of this can be get from `putout`:

```js
const {
    traverse,
    types,
    template,
} = require('putout');
```

Most information you can find in [Babel Plugin Handbook](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md) is relevant to `putout` plugins.
To understand how things works from the inside take a look at [Super Tiny Compiler](https://github.com/jamiebuilds/the-super-tiny-compiler).

#### Example

Let's consider simplest possible plugin for removing `debugger statements [@putout/plugin-remove-debugger](https://github.com/coderaiser/putout/tree/master/packages/plugin-remove-debugger):

```js
// this is a message to show in putout cli
module.exports.report = () => 'Unexpected "debugger" statement';

// lets find all "debugger" statements
module.exports.find = (ast, {traverse}) => {
    const places = [];
    
    traverse(ast, {
        DebuggerStatement(path) {
            places.push(path);
        }
    });
    
    // we should return array of places which was found using traverse
    return places;
};

// when user calls "putout --fix" node will be removed with
module.exports.fix = (path) => {
    path.remove();
};
```

#### Testing

That was the simplest module to remove `debugger` statements in your code. Let's look how to test it using [@putout/test](https://github.com/coderaiser/putout/tree/master/packages/test):

```js
const removeDebugger = require('..');
const test = require('@putout/test')(__dirname, {
    'remove-debugger': removeDebugger,
});

// this is how we test that messages is correct
test('remove debugger: report', (t) => {
    t.reportCode('debugger', 'Unexpected "debugger" statement');
    t.end();
});

// stetement should be removed so result is empty
test('remove debugger: transformCode', (t) => {
    t.transformCode('debugger', '');
    t.end();
});
```

As you see test runner it is little bit modifed [tape](https://github.com/substack/tape).
To see more sophisticated example look at [@putout/remove-console](https://github.com/coderaiser/putout/tree/master/packages/plugin-remove-console).

## Codemods

`putout` supports `codemodes` in the similar to plugins way, just create a directory `~/.putout` and put your plugins there. Here is example: [convert-tape-to-supertape](https://github.com/coderaiser/putout/tree/master/codemods/plugin-convert-tape-to-supertape) and [this is example of work](https://github.com/coderaiser/putout/commit/ad02cebc344ce73cdee668cffc5078bf08830d52).


## ESLint Support

If you see that `putout` brokes formatting of your code, use eslint plugin [eslint-plugin-putout](https://github.com/coderaiser/putout/tree/master/packages/eslint-plugin-putout).

Install `eslint-plugin-putout` with:
```
npm i eslint eslint-plugin-putout -D
```

Then create `eslintrc.json`:

```json
{
    "extends": [
        "plugin:putout/recommended"
    ],
    "plugins": [
        "putout"
    ]
}
```

And use with `putout` this way:

```sh
putout --fix lib && eslint --fix lib
```

## API

### putout(source)

```js
const {readFileSync} = require('fs');
const source = readFileSync('./1.js', 'utf8');
console.log(source);
// outputs
`
const t = 'hello';
const m = t + '!';
`

const result = putout(source);
// returns
`
const t = 'hello';
`

const result2 = putout(result);
// returns
``
```

## License

MIT

