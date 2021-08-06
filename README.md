# Putout [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

[NPMURL]: https://npmjs.org/package/putout "npm"
[NPMIMGURL]: https://img.shields.io/npm/v/putout.svg?style=flat&longCache=true
[BuildStatusURL]: https://github.com/coderaiser/putout/actions?query=workflow%3A%22Node+CI%22 "Build Status"
[BuildStatusIMGURL]: https://github.com/coderaiser/putout/workflows/Node%20CI/badge.svg
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/putout.svg?path=packages/putout
[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/putout "Dependency Status"
[CoverageURL]: https://coveralls.io/github/coderaiser/putout?branch=master
[CoverageIMGURL]: https://coveralls.io/repos/coderaiser/putout/badge.svg?branch=master&service=github

> "Perfection is finally attained not when there is no longer anything to add,
> but when there is no longer anything to take away"
>
> (c) Antoine de Saint Exupéry

![putout](https://github.com/coderaiser/putout/blob/master/images/putout-logo.svg)

Putout is a pluggable and configurable code transformer with built-in `eslint`, `babel plugins` and `jscodeshift codemods` support for `js`, `jsx` `typescript` and `flow` files. It has [a lot of transforms](#built-in-transformations) that will keep your codebase in a clean state transforming any `code smell` to readable code according to best practices.

[![putout](https://asciinema.org/a/0akg9gkJdbmbGl6BbpaycgKZm.svg)](https://asciinema.org/a/0akg9gkJdbmbGl6BbpaycgKZm)

## Table of Contents

- [Why does this project exist?](#why-does-this-project-exist)
- [Installation](#installation)
- [Usage](#usage)
- [Architecture](#architecture)
- [API](#api)
- [Built-in transformations](#built-in-transformations)
- [Plugins](#plugins-1)
- [Formatters](#formatters)
- [Configuration](#configuration)
- [Plugins API](#plugins-api)
- [Using Babel Plugins with Putout](#using-babel-plugins-with-putout)
- [Using JSCodeshift Codemods with Putout](#using-jscodeshift-codemods-with-putout)
- [Codemods](#codemods)
- [Integration with ESLint](#integration-with-eslint)
- [Integration with Babel](#integration-with-babel)
- [Using Putout as Loader](#using-putout-as-loader)
- [Real-world uses](#real-world-uses)
- [Versioning policy](#versioning-policy)
- [Contributions](#contributions)
- [Donations](#donations)
- [License](#license)

## Why does this project exist?

- because [eslint](https://eslint.org) avoids [fixes that could change the runtime behavior](https://eslint.org/docs/developer-guide/working-with-rules#applying-fixes);
- because [babel](https://babeljs.io) produces [throw-away code](https://github.com/babel/babel/issues/5139);
- because [prettier](https://github.com/prettier/prettier) is a formatter;
- because [jscodeshift](https://github.com/facebook/jscodeshift) has no `config` and `plugins` support;

The main difference of `putout` is saving code transformation results directly in a source code in a day-to-day baisis;

## Installation

```
npm i putout -D
```

## Usage

```
Usage: putout [options] [path]
Options
   -h, --help                  display this help and exit
   -v, --version               output version information and exit
   -f, --format                use a specific output format - default: progress-bar/dump on CI
   -s, --staged                add staged files when in git repository
   --fix                       apply fixes of errors to code
   --fix-count                 count of fixes rounds (defaults to 10)
   --rulesdir                  use additional rules from directory
   --transform                 apply inline transform
   --plugins                   plugins to use splited by comma
   --enable                    enable rule by name in .putout.json
   --disable                   disable rule by name in .putout.json
   --enable-all                enable all rules in .putout.json
   --disable-all               disable all rules in .putout.json
   --flow                      enable flow
   --no-flow                   disable flow (default)
   --cache                     enable cache to speed up processing (default)
   --fresh                     generate a fresh cache
   --no-config                 avoid reading config file (.putout.json)
   --no-ci                     disable CI detection
   --no-cache                  disable cache
```

To find possible transform places:

```
putout lib test
```

To apply transforms:

```
putout lib test --fix
```

### Environment variables

`Putout` supports next `environment variables`:

- `PUTOUT_FILES` - files that should be processed by putout, divided by ",";

```
PUTOUT_FILES=lib,test putout --fix
```

## Architecture

`Putout` consists of a couple simple parts, here is workflow representation:

![putout](https://github.com/coderaiser/putout/blob/master/images/putout.png)

And here is CLI sheme:

![putout](https://github.com/coderaiser/putout/blob/master/images/putout-cli.png)

### Engines

`Engines` is the heart of `putout`: `loader`, `runner` and `parser` works for every processed file. `Processor` runs all the processors.

| Package | Version | Dependencies |
|--------|-------|------------|
| [`@putout/engine-parser`](/packages/engine-parser) | [![npm](https://img.shields.io/npm/v/@putout/engine-parser.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/engine-parser) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/engine-parser)](https://david-dm.org/coderaiser/putout?path=packages/engine-parser) |
| [`@putout/engine-loader`](/packages/engine-loader) | [![npm](https://img.shields.io/npm/v/@putout/engine-loader.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/engine-loader) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/engine-loader)](https://david-dm.org/coderaiser/putout?path=packages/engine-loader) |
| [`@putout/engine-runner`](/packages/engine-runner) | [![npm](https://img.shields.io/npm/v/@putout/engine-runner.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/engine-runner) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/engine-runner)](https://david-dm.org/coderaiser/putout?path=packages/engine-runner) |
| [`@putout/engine-processor`](/packages/engine-processor) | [![npm](https://img.shields.io/npm/v/@putout/engine-processor.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/engine-processor) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/engine-processor)](https://david-dm.org/coderaiser/putout?path=packages/engine-processor) |

### Processors

With help of [processors](https://github.com/coderaiser/putout/blob/master/packages/engine-processor) `putout` can be extended to read any file format and parse `JavaScript` from there.

Here is a list of built-int processors:

| Package | Version | Dependencies |
|--------|-------|------------|
| [`@putout/processor-javascript`](/packages/processor-javascript) | [![npm](https://img.shields.io/npm/v/@putout/processor-javascript.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/processor-javascript) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/processor-javascript)](https://david-dm.org/coderaiser/putout?path=packages/processor-javascript) |
| [`@putout/processor-json`](/packages/processor-json) | [![npm](https://img.shields.io/npm/v/@putout/processor-json.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/processor-json) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/processor-json)](https://david-dm.org/coderaiser/putout?path=packages/processor-json) |
| [`@putout/processor-markdown`](/packages/processor-markdown) | [![npm](https://img.shields.io/npm/v/@putout/processor-markdown.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/processor-markdown) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/processor-markdown)](https://david-dm.org/coderaiser/putout?path=packages/processor-markdown) |
| [`@putout/processor-ignore`](/packages/processor-ignore) | [![npm](https://img.shields.io/npm/v/@putout/processor-ignore.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/processor-ignore) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/processor-ignore)](https://david-dm.org/coderaiser/putout?path=packages/processor-ignore) |
| [`@putout/processor-yaml`](/packages/processor-yaml) | [![npm](https://img.shields.io/npm/v/@putout/processor-yaml.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/processor-yaml) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/processor-yaml)](https://david-dm.org/coderaiser/putout?path=packages/processor-yaml) |
| [`@putout/processor-css`](/packages/processor-css) | [![npm](https://img.shields.io/npm/v/@putout/processor-css.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/processor-css) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/processor-css)](https://david-dm.org/coderaiser/putout?path=packages/processor-css) |

You can disable any of them with:

```json
{
    "processors": [
        ["markdown", "off"]
    ]
}
```

And not bundled processors:

| Package | Version | Dependencies |
|--------|-------|------------|
| [`@putout/processor-typescript`](/packages/processor-typescript) | [![npm](https://img.shields.io/npm/v/@putout/processor-typescript.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/processor-typescript) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/processor-typescript)](https://david-dm.org/coderaiser/putout?path=packages/processor-typescript) |
| [`@putout/processor-html`](/packages/processor-html) | [![npm](https://img.shields.io/npm/v/@putout/processor-html.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/processor-html) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/processor-html)](https://david-dm.org/coderaiser/putout?path=packages/processor-html) |

To enable it use:

```json
{
    "processors": [
        ["typescript", "on"]
    ]
}
```

Processors can be tested using [@putout/test/processors](https://github.com/coderaiser/putout/tree/master/packages/test#processors-api).

## API

### putout(source, options)

First things first, `require` putout:

```js
const putout = require('putout');
```

Let's consider next `source` with two `variables` and one `call expression`:

```js
const hello = 'world';
const hi = 'there';

console.log(hello);
```

We can declare it as `source`:

```js
const source = `
    const hello = 'world';
    const hi = 'there';
    
    console.log(hello);
`;
```

#### Plugins

Putout supports dynamic loading of plugins from `node_modules`. Let's consider example of using [remove-unused-variables](https://github.com/coderaiser/putout/tree/master/packages/plugin-remove-unused-variables/README.md) plugin:

```js
putout(source, {
    plugins: [
        'remove-unused-variables',
    ],
});
// returns
({
    code: "\n    const hello = 'world';\n\n    console.log(hello);\n",
    places: [],
});
```

As you see `places` is empty, but the code is changed: there is no `hi` variable.

#### No fix

From the first day `putout` was developed with ability to split main process into two concepts: `find` and `fix`.
This conception mirrorod in the code, so you can find all places with redundant variables without transformation:

```js
putout(source, {
    fix: false,
    plugins: [
        'remove-unused-variables',
    ],
});
// returns
({
    code: '\n' +
    "    const hello = 'world';\n" +
    "    const hi = 'there';\n" +
    '    \n' +
    '    console.log(hello);\n',
    places: [{
        rule: 'remove-unused-variables',
        message: '"hi" is defined but never used',
        position: {line: 3, column: 10},
    }],
});
```

## Built-in transformations

<details><summary>remove unused variables</summary>

```diff
  function show() {
-     const message = 'hello';
      console.log('hello world');
  }
```

</details>

<details><summary>remove duplicates from logical expressions</summary>

```diff
-a && b && a
+a && b
```

</details>

<details><summary>remove unused for-of variables</summary>

```diff
-for (const {a, b} of c) {
+for (const {a} of c) {
    console.log(a);
}
```

</details>

<details><summary>remove unreferenced variables</summary>

```diff
-let a;
- a = 1;
let b;
b = 2;
console.log(b);
```

</details>

<details><summary>remove duplicate keys</summary>

```diff
const a = {
-    x: 'hello',
-    ...y,
    x: 'world',
    ...y,
}
```

</details>

<details><summary>remove duplicate case</summary>

```diff
switch (x) {
    case 5:
        console.log('hello');
        break;
-    case 5:
-        console.log('zz');
-        break;
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

<details><summary>remove useless <code>variables</code></summary>

```diff
-   function hi(a) {
-       const b = a;
    };
+   function hi(b) {
    };
```

</details>

<details><summary>remove useless <code>map</code></summary>

```diff
-const [str] = lines.map((line) => `hello ${line}`);
+const [line] = lines;
+const str = `hello ${line}`;
```

</details>

<details><summary>remove useless <code><a href=https://www.typescriptlang.org/docs/handbook/2/mapped-types.html>mapped types</a></code></summary>

```diff
-type SuperType = {
-   [Key in keyof Type]: Type[Key]
-}
+type SuperType = Type;
```

</details>

<details><summary>remove useless <code><a href=https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#mapping-modifiers>mapping modifiers</a></code></summary>

```diff
type SuperType = {
-   +readonly[Key in keyof Type]+?: Type[Key];
+   readonly[Key in keyof Type]?: Type[Key];
}
```

</details>

<details><summary>remove useless <code>continue</code></summary>

```diff
+for (sign = decpt, i = 0; (sign /= 10) != 0; i++);
-for (sign = decpt, i = 0; (sign /= 10) != 0; i++)
-    continue;
```

</details>

<details><summary>remove useless <code>operand</code></summary>

```diff
-a = a + b;
+a += b;
```

</details>

<details><summary>remove useless <code>return</code></summary>

```diff
-module.exports.traverse = ({push}) => {
-    return {
-        ObjectExpression(path) {
-        }
-    }
-};
+module.exports.traverse = ({push}) => ({
+   ObjectExpression(path) {
+   }
+});
```

</details>

<details><summary>remove useless <code>array constructor</code></summary>

```diff
-const a = Array(1, 2, 3);
+const a = [1, 2, 3];
```

</details>

<details><summary>remove useless <code>conditions</code></summary>

```diff
-if (zone?.tooltipCallback) {
-    zone.tooltipCallback(e);
-}
+zone?.tooltipCallback(e);
```

</details>

<details><summary>remove useless <code>type conversion</code></summary>

```diff
-const a = Boolean(b.includes(c));
+const a = b.includes(c);

--if (!!a)
++if (a)
    console.log('hi');

```

</details>

<details><summary>remove useless <code>functions</code></summary>

```diff
-   const f = (...a) => fn(...a);
+   const f = fn;
```

</details>

<details><summary>remove useless <code>typeof</code></summary>

```diff
- typeof typeof 'hello';
+ typeof 'hello';
```

</details>

<details><summary>remove useless <code>await</code></summary>

```diff
-   await await Promise.resolve('hello');
+   await Promise.resolve('hello');
```

</details>

<details><summary>remove useless <code>async</code></summary>

```diff
-const show = async () => {
+const show = () => {
    console.log('hello');
};
```

</details>

<details><summary>add missing <code>await</code></summary>

```diff
-runCli();
+await runCli();

async function runCli() {
}
```

</details>

<details><summary>declare undefined variables</summary>

```diff
const fs = import 'fs/promises';
const {stub} = import 'supertape';

+const {assign} = Object;

const readFile = stub();

assign(fs, {
    readFile,
});
```

</details>

<details><summary>remove useless <code>arguments</code></summary>

```diff
onIfStatement({
    push,
-   generate,
-   abc,
})

function onIfStatement({push}) {
}
```

</details>

<details><summary>remove useless <code>template expressions</code></summary>

```diff
-let y =`${"hello"} + ${"world"}`;
+let y =`hello + world`;
```

</details>

<details><summary>remove useless <code>for-of</code></summary>

```diff
-for (const a of ['hello']) {
-    console.log(a);
-}
+console.log('hello');
```

</details>

<details><summary>reuse duplicate<code>init</code></summary>

```diff
const putout = require('putout');
-const {operator} = require('putout');
+const {operator} = putout;
```

</details>

<details><summary>convert <code>assignment</code> to <code>arrow function</code></summary>

```diff
-const createRegExp = (a) = RegExp(a, 'g');
+const createRegExp = (a) => RegExp(a, 'g');
```

</details>

<details><summary>convert <code>assignment</code> to <code>comparison</code></summary>

```diff
-if (a = 5) {
+if (a === 5) {
}
```

</details>

<details><summary>convert <code>bitwise</code> to <code>logical</code></summary>

```diff
-a | !b
+a || !b
```

</details>

<details><summary>convert <code>equal</code> to <code>strict equal</code></summary>

```diff
-if (a == b) {
+if (a === b) {
}
```

</details>

<details><summary>convert <code>indexOf</code> to <code>includes</code></summary>

```diff
-if (~array.indexOf(element)) {
+if (array.includes(element)) {
}
```

</details>

<details><summary>convert <code>generic</code> to <code>shorthand</code> (for typescript) (<a href=https://stackoverflow.com/a/36843084/4536327>why</a>)</summary>

```diff
interface A {
-    x: Array<X>;
+    x: X[];
}
```

</details>

<details><summary>remove useless <code>types</code> from <code>constants</code> (for typescript)</summary>

```diff
-const x: any = 5;
+const x = 5;
```

</details>
   
<details><summary>remove useless <code><a href=https://www.typescriptlang.org/docs/handbook/2/mapped-types.html>mapped types</a></code>(for typescript)</summary>

```diff
-type SuperType = {
-   [Key in keyof Type]: Type[Key]
-}
+type SuperType = Type;
```

</details>


<details><summary>convert <code>fs.promises</code> to <code>fs/promises</code> for <a href=https://nodejs.org/dist/latest-v15.x/docs/api/fs.html#fs_fs_promises_api>node.js</a></summary>

```diff
-const {readFile} = require('fs').promises;
+const {readFile} = require('fs/promises');
```

</details>

<details><summary>remove useless <code>types</code> (for typescript)</summary>

```diff
type oldType = number;
-type newType = oldType;
-const x: newType = 5;
+const x: oldType = 5;
```

</details>

<details><summary>remove duplicate <code>interface</code> keys (for typescript)</summary>

```diff
interface Hello {
-   'hello': any;
    'hello': string;
}
```

</details>

<details><summary>remove unused <code>types</code> (for typescript)</summary>

```diff
type n = number;
-type s = string;
+const x: n = 5;
```

</details>

<details><summary>remove useless <code>escape</code></summary>

```diff
-const t = 'hello \"world\"';
-const s1 = `hello \"world\"`;
-const s = `hello \'world\'`;
+const t = 'hello "world"';
+const s1 = `hello "world"`;
+const s = `hello 'world'`;
```

</details>

<details><summary>remove useless <code>Array.from</code></summary>

```diff
-for (const x of Array.from(y)) {}
+for (const x of y) {}
```

</details>

<details><summary>remove useless <code>spread</code></summary>

```diff
-for (const x of [...y]) {}
+for (const x of y) {}
```

</details>

<details><summary>remove useless <code>Promise.resolve</code></summary>

```diff
async () => {
-    return Promise.resolve('x');
+    return 'x';
}
```

</details>

<details><summary>convert<code>Promise.reject</code> to <code>throw</code></summary>

```diff
async () => {
-    return Promise.reject('x');
+    throw 'x';
}
```

</details>

<details><summary>remove <code>debugger</code> statement</summary>

```diff
- debugger;
```

</details>
<details><summary>remove <code>iife</code></summary>

```diff
-(function() {
-    console.log('hello world');
-}());
+console.log('hello world');
```

</details>

<details><summary>remove <code>boolean</code> from <code>assertions</code></summary>

```diff
-if (a === true)
+if (a)
    alert();
```

</details>

<details><summary>remove <code>boolean</code> from <code>logical expressions</code></summary>

```diff
-const t = true && false;
+const t = false;
```

</details>

<details><summary>remove nested blocks</summary>

```diff
for (const x of Object.keys(a)) {
-   {
-       console.log(x);
-   }
+   console.log(x);
}
```

</details>

<details><summary>remove unreachable code</summary>

```diff
function hi() {
    return 5;
-  console.log('hello');
}
```

</details>

<details><summary>replace <code>test.only</code> with <code>test</code> calls</summary>

```diff
-test.only('some test here', (t) => {
+test('some test here', (t) => {
    t.end();
});
```

</details>

<details><summary>replace <code>test.skip</code> with <code>test</code> calls</summary>

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

<details><summary>split nested destructuring</summary>

```diff
-const {a: {b}} = c;
+const {a} = c;
+const {b} = a;
```

</details>

<details><summary>simplify <code>assignment</code></summary>

```diff
-const {a} = {a: 5};
-const [b] = [5];
+const a = 5;
+const b = 5;
```

</details>

<details><summary>simplify <code>logical expressions</code></summary>

```diff
-!(options && !options.bidirectional);
+!options || options.bidirectional;
```

</details>

<details><summary>simplify <code>ternary</code></summary>

```diff
-module.exports = fs.copyFileSync ? fs.copyFileSync : copyFileSync;
+module.exports = fs.copyFileSync || copyFileSync;
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

<details><summary>Add <code>strict mode</code> directive in <code>commonjs</code> if absent</summary>

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

<details><summary>convert <code>esm</code> to <code>commonjs</code> (disabled)</summary>

```diff
-import hello from 'world';
+const hello = require('world');
```

</details>
<details><summary>convert <code>commonjs</code> to <code>esm</code> (disabled)</summary>

```diff
-const hello = require('world');
+import hello from 'world';
```

</details>

<details><summary>convert <code>replace</code> to <code>replaceAll</code> (disabled, <a href=https://github.com/tc39/proposal-string-replaceall>stage-4</a>)</summary>

```diff
-'hello'.replace(/hello/g, 'world');
+'hello'.replaceAll('hello', 'world');
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

<details><summary>apply <code>if condition</code></summary>

```diff
-if (2 > 3);
+if (2 > 3)
    alert();
```

</details>

<details><summary>apply <code>Array.at</code>(<a href=https://github.com/nodejs/node/blob/master/doc/changelogs/CHANGELOG_V16.md#2021-07-29-version-1660-current-bethgriggs>disabled</a>)</summary>

```diff
-const latest = (a) => a[a.length - 1];
+const latest = (a) => a.at(-1);
```

</details>

<details><summary>apply top-level-await (<a href=https://github.com/tc39/proposal-top-level-await>proposal-top-level-await</a>, enabled for ESM)</summary>

```diff
import fs from 'fs';

-(async () => {
-    const data = await fs.promises.readFile('hello.txt');
-})();
+const data = await fs.promises.readFile('hello.txt');
```

</details>

<details><summary>apply numeric separators(<a href=https://github.com/tc39/proposal-numeric-separator>proposal-numeric-separator</a>)</summary>

```diff
-const a = 100000000;
+const a = 100_000_000;
```

</details>

<details><summary>apply optional chaining (<a href=https://github.com/tc39/proposal-optional-chaining>proposal-optional-chaining</a>)</summary>

```diff
-const result = hello && hello.world;
+const result = hello?.world;
```

</details>

<details><summary>apply <code>as</code> type assertion (according to <a href=https://basarat.gitbook.io/typescript/type-system/type-assertion#as-foo-vs-less-than-foo-greater-than>best practices</a>)</summary>

```diff
-const boundaryElement = <HTMLElement>e.target;
+const boundaryElement1 = e.target as HTMLElement;
```

</details>

<details><summary>apply nullish coalescing (<a href=https://github.com/tc39/proposal-nullish-coalescing>proposal-nullish-coalescing</a>, not bundled)</summary>

```diff
-result = typeof result  === 'undefined' ? 'hello': result;
result = result ?? 'hello';
```

</details>

<details><summary>apply <a href=https://www.typescriptlang.org/docs/handbook/utility-types.html>utility types</a></summary>

```diff
-type SuperType = {
-    [Key in keyof Type]?: Type[Key];
-}
+type SuperType = Partial<Type>;
```

</details>

<details><summary>convert <code>throw</code> statement into expression (<a href=https://github.com/tc39/proposal-throw-expressions>proposal-throw-expressions</a>, not bundled)</summary>

```diff
-const fn = (a) => {throw Error(a);}
+const fn = (a) => throw Error(a);
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

<details><summary>merge duplicate imports</summary>

```diff
-import {m as b} from 'y';
-import {z} from 'y';
-import x from 'y';
+import x, {m as b, z} from 'y';
```

</details>

<details><summary>merge <code>if</code> statements</summary>

```diff
-if (a > b)
-    if (b < c)
-        console.log('hi');
+if (a > b && b < c)
+    console.log('hi');
```

</details>

<details><summary>convert <code>Math.pow</code> to <code>exponentiation operator</code></summary>

```diff
-Math.pow(2, 4);
+2 ** 4;
```

</details>

<details><summary>convert <code>anonymous</code> to <code>arrow function</code></summary>

```diff
-module.exports = function(a, b) {
+module.exports = (a, b) => {
}
```

</details>

<details><summary>convert <code>for</code> to <code>for-of</code></summary>

```diff
-for (let i = 0; i < items.length; i++) {
+for (const item of items) {
-   const item = items[i];
    log(item);
}
```

</details>

<details><summary>convert <code>forEach</code> to <code>for-of</code></summary>

```diff
-Object.keys(json).forEach((name) => {
+for (const name of Object.keys(json)) {
    manage(name, json[name]);
-});
+}
```

</details>

<details><summary>convert <code>for-in</code> to <code>for-of</code></summary>

```diff
-for (const name in object) {
-   if (object.hasOwnProperty(name)) {
+for (const name of Object.keys(object)) {
    console.log(a);
-   }
}
```

</details>

<details><summary>convert <code>map</code> to <code>for-of</code></summary>

```diff
-names.map((name) => {
+for (const name of names) {
    alert(`hello ${name}`);
+}
-});
```

</details>

<details><summary>convert <code>array copy</code> to <code>slice</code></summary>

```diff
-const places = [
-    ...items,
-];
+const places = items.slice();
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

<details><summary>extract object properties into variable</summary>

```diff
-const {replace} = putout.operator;
-const {isIdentifier} = putout.types;
+const {operator, types} = putout;
+const {replace} = operator;
+const {isIdentifier} = types;
```

</details>

<details><summary>convert <code>apply</code> to <code>spread</code></summary>

```diff
-console.log.apply(console, arguments);
+console.log(...arguments);
```

</details>

<details><summary>convert <code>concat</code> to <code>flat</code></summary>

```diff
-[].concat(...array);
+array.flat();
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

<details><summary>convert <code>comparison</code> to <code>boolean</code></summary>

```diff
-   const a = b === b;
+   const a = true;
```

</details>

<details><summary>convert <code>top-level return</code> into <code>process.exit()</code>(because EcmaScript Modules doesn't support top level return)</summary>

```diff
-   return;
+   process.exit();
```

</details>

<details><summary>add <code>await</code> to <code>return promise()</code> statements (<a href=https://v8.dev/blog/fast-async>because it's faster, produces call stack and more readable</a>)</summary>

```diff
async run () {
-   return promise();
+   return await promise();
}
```

</details>

## Plugins

The `putout` repo is comprised of many npm packages. It is a [lerna](https://github.com/lerna/lerna) monorepo similar to [babel](https://github.com/babel/babel).

### Appliers

| Package | Version | Dependencies |
|--------|-------|------------|
| [`@putout/plugin-apply-array-at`](/packages/plugin-apply-array-at) | [![npm](https://img.shields.io/npm/v/@putout/plugin-apply-array-at.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-apply-array-at) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-apply-array-at)](https://david-dm.org/coderaiser/putout?path=packages/plugin-apply-array-at) |
| [`@putout/plugin-apply-numeric-separators`](/packages/plugin-apply-numeric-separators) | [![npm](https://img.shields.io/npm/v/@putout/plugin-apply-numeric-separators.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-apply-numeric-separators) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-apply-numeric-separators)](https://david-dm.org/coderaiser/putout?path=packages/plugin-apply-numeric-separators) |
| [`@putout/plugin-apply-destructuring`](/packages/plugin-apply-destructuring) | [![npm](https://img.shields.io/npm/v/@putout/plugin-apply-destructuring.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-apply-destructuring) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-apply-destructuring)](https://david-dm.org/coderaiser/putout?path=packages/plugin-apply-destructuring) |
| [`@putout/plugin-apply-top-level-await`](/packages/plugin-apply-top-level-await) | [![npm](https://img.shields.io/npm/v/@putout/plugin-apply-top-level-await.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-apply-top-level-await) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-apply-top-level-await)](https://david-dm.org/coderaiser/putout?path=packages/plugin-apply-top-level-await) |
| [`@putout/plugin-apply-optional-chaining`](/packages/plugin-apply-optional-chaining) | [![npm](https://img.shields.io/npm/v/@putout/plugin-apply-optional-chaining.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-apply-optional-chaining) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-apply-optional-chaining)](https://david-dm.org/coderaiser/putout?path=packages/plugin-apply-optional-chaining) |
| [`@putout/plugin-apply-as-type-assertions`](/packages/plugin-apply-as-type-assertions) | [![npm](https://img.shields.io/npm/v/@putout/plugin-apply-as-type-assertions.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-apply-as-type-assertions) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-apply-as-type-assertions)](https://david-dm.org/coderaiser/putout?path=packages/plugin-apply-as-type-assertions) |
| [`@putout/plugin-apply-if-condition`](/packages/plugin-apply-if-condition) | [![npm](https://img.shields.io/npm/v/@putout/plugin-apply-if-condition.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-apply-if-condition) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-apply-if-condition)](https://david-dm.org/coderaiser/putout?path=packages/plugin-apply-if-condition) |
| [`@putout/plugin-apply-utility-types`](/packages/plugin-apply-utility-types) | [![npm](https://img.shields.io/npm/v/@putout/plugin-apply-utility-types.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-apply-utility-types) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-apply-utility-types)](https://david-dm.org/coderaiser/putout?path=packages/plugin-apply-utility-types) |

### Splitters

| Package | Version | Dependencies |
|--------|-------|------------|
| [`@putout/plugin-split-variable-declarations`](/packages/plugin-split-variable-declarations) | [![npm](https://img.shields.io/npm/v/@putout/plugin-split-variable-declarations.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-split-variable-declarations) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-split-variable-declarations)](https://david-dm.org/coderaiser/putout?path=packages/plugin-split-variable-declarations) |
| [`@putout/plugin-split-nested-destructuring`](/packages/plugin-split-nested-destructuring) | [![npm](https://img.shields.io/npm/v/@putout/plugin-split-nested-destructuring.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-split-nested-destructuring) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-split-nested-destructuring)](https://david-dm.org/coderaiser/putout?path=packages/plugin-split-nested-destructuring) |

### Mergers

| Package | Version | Dependencies |
|--------|-------|------------|
| [`@putout/plugin-merge-destructuring-properties`](/packages/plugin-merge-destructuring-properties) | [![npm](https://img.shields.io/npm/v/@putout/plugin-merge-destructuring-properties.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-merge-destructuring-properties) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-merge-destructuring-properties)](https://david-dm.org/coderaiser/putout?path=packages/plugin-merge-destructuring-properties) |
| [`@putout/plugin-merge-duplicate-imports`](/packages/plugin-merge-duplicate-imports) | [![npm](https://img.shields.io/npm/v/@putout/plugin-merge-duplicate-imports.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-merge-duplicate-imports) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-merge-duplicate-imports)](https://david-dm.org/coderaiser/putout?path=packages/plugin-merge-duplicate-imports) |
| [`@putout/plugin-merge-if-statements`](/packages/plugin-merge-if-statements) | [![npm](https://img.shields.io/npm/v/@putout/plugin-merge-if-statements.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-merge-if-statements) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-merge-if-statements)](https://david-dm.org/coderaiser/putout?path=packages/plugin-merge-if-statements) |

### Converters

| Package | Version | Dependencies |
|--------|-------|------------|
| [`@putout/plugin-convert-apply-to-spread`](/packages/plugin-convert-apply-to-spread) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-apply-to-spread.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-apply-to-spread) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-apply-to-spread)](https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-apply-to-spread) |
| [`@putout/plugin-convert-bitwise-to-logical`](/packages/plugin-convert-bitwise-to-logical) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-bitwise-to-logical.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-bitwise-to-logical) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-bitwise-to-logical)](https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-bitwise-to-logical) |
| [`@putout/plugin-convert-concat-to-flat`](/packages/plugin-convert-concat-to-flat) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-concat-to-flat.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-concat-to-flat) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-concat-to-flat)](https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-concat-to-flat) |
| [`@putout/plugin-convert-esm-to-commonjs`](/packages/plugin-convert-esm-to-commonjs) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-esm-to-commonjs.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-esm-to-commonjs) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-esm-to-commonjs)](https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-esm-to-commonjs) |
| [`@putout/plugin-convert-commonjs-to-esm`](/packages/plugin-convert-commonjs-to-esm) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-commonjs-to-esm.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-commonjs-to-esm) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-commonjs-to-esm)](https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-commonjs-to-esm) |
| [`@putout/plugin-convert-array-copy-to-slice`](/packages/plugin-convert-array-copy-to-slice) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-array-copy-to-slice.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-array-copy-to-slice) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-array-copy-to-slice)](https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-array-copy-to-slice) |
| [`@putout/plugin-convert-template-to-string`](/packages/plugin-convert-template-to-string) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-template-to-string.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-template-to-string) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-template-to-string)](https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-template-to-string) |
| [`@putout/plugin-convert-equal-to-strict-equal`](/packages/plugin-convert-equal-to-strict-equal) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-equal-to-strict-equal.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-equal-to-strict-equal) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-equal-to-strict-equal)](https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-equal-to-strict-equal) |
| [`@putout/plugin-convert-index-of-to-includes`](/packages/plugin-convert-index-of-to-includes) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-index-of-to-includes.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-index-of-to-includes) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-index-of-to-includes)](https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-index-of-to-includes) |
| [`@putout/plugin-convert-generic-to-shorthand`](/packages/plugin-convert-generic-to-shorthand) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-generic-to-shorthand.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-generic-to-shorthand) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-generic-to-shorthand)](https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-generic-to-shorthand) |
| [`@putout/plugin-convert-math-pow`](/packages/plugin-convert-math-pow) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-math-pow.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-math-pow) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-math-pow)](https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-math-pow) |
| [`@putout/plugin-convert-to-arrow-function`](/packages/plugin-convert-to-arrow-function) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-to-arrow-function.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-to-arrow-function) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-to-arrow-function)](https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-to-arrow-function) |
| [`@putout/plugin-convert-for-to-for-of`](/packages/plugin-convert-for-to-for-of) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-for-to-for-of.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-for-to-for-of) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-for-to-for-of)](https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-for-to-for-of) |
| [`@putout/plugin-convert-for-each-to-for-of`](/packages/plugin-convert-for-each-to-for-of) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-for-each-to-for-of.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-for-each-to-for-of) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-for-each-to-for-of)](https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-for-each-to-for-of) |
| [`@putout/plugin-convert-for-in-to-for-of`](/packages/plugin-convert-for-in-to-for-of) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-for-in-to-for-of.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-for-in-to-for-of) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-for-in-to-for-of)](https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-for-in-to-for-of) |
| [`@putout/plugin-convert-map-to-for-of`](/packages/plugin-convert-map-to-for-of) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-map-to-for-of.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-map-to-for-of) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-map-to-for-of)](https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-map-to-for-of) |
| [`@putout/plugin-convert-object-assign-to-merge-spread`](/packages/plugin-convert-object-assign-to-merge-spread) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-object-assign-to-merge-spread.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-object-assign-to-merge-spread) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-object-assign-to-merge-spread)](https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-object-assign-to-merge-spread) |
| [`@putout/plugin-convert-comparison-to-boolean`](/packages/plugin-convert-comparison-to-boolean) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-comparison-to-boolean.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-comparison-to-boolean) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-comparison-to-boolean)](https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-comparison-to-boolean) |
| [`@putout/plugin-convert-top-level-return`](/packages/plugin-convert-top-level-return) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-top-level-return.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-top-level-return) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-top-level-return)](https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-top-level-return) |
| [`@putout/plugin-convert-mock-require-to-mock-import`](/packages/plugin-convert-mock-require-to-mock-import) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-mock-require-to-mock-import.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-mock-require-to-mock-import) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-mock-require-to-mock-import)](https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-mock-require-to-mock-import) |
| [`@putout/plugin-convert-assignment-to-arrow-function`](/packages/plugin-convert-assignment-to-arrow-function) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-assignment-to-arrow-function.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-assignment-to-arrow-function) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-assignment-to-arrow-function)](https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-assignment-to-arrow-function) |
| [`@putout/plugin-convert-assignment-to-comparison`](/packages/plugin-convert-assignment-to-comparison) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-assignment-to-comparison.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-assignment-to-comparison) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-assignment-to-comparison)](https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-assignment-to-comparison) |

### Removers

| Package | Version | Dependencies |
|--------|-------|------------|
| [`@putout/plugin-remove-unused-variables`](/packages/plugin-remove-unused-variables) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-unused-variables.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-unused-variables) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-unused-variables)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-unused-variables) |
| [`@putout/plugin-remove-unused-for-of-variables`](/packages/plugin-remove-unused-for-of-variables) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-unused-for-of-variables.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-unused-for-of-variables) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-unused-for-of-variables)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-unused-for-of-variables) |
| [`@putout/plugin-remove-unused-types`](/packages/plugin-remove-unused-types) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-unused-types.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-unused-types) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-unused-types)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-unused-types) |
| [`@putout/plugin-remove-unreferenced-variables`](/packages/plugin-remove-unreferenced-variables) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-unreferenced-variables.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-unreferenced-variables) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-unreferenced-variables)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-unreferenced-variables) |
| [`@putout/plugin-remove-duplicate-keys`](/packages/plugin-remove-duplicate-keys) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-duplicate-keys.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-duplicate-keys) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-duplicate-keys)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-duplicate-keys) |
| [`@putout/plugin-remove-duplicate-interface-keys`](/packages/plugin-remove-duplicate-interface-keys) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-duplicate-interface-keys.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-duplicate-interface-keys) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-duplicate-interface-keys)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-duplicate-interface-keys) |
| [`@putout/plugin-remove-duplicate-case`](/packages/plugin-remove-duplicate-case) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-duplicate-case.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-duplicate-case) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-duplicate-case)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-duplicate-case) |
| [`@putout/plugin-remove-unused-expressions`](/packages/plugin-remove-unused-expressions) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-unused-expressions.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-unused-expressions) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-unused-expressions)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-unused-expressions) |
| [`@putout/plugin-remove-unused-private-fields`](/packages/plugin-remove-unused-private-fields) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-unused-private-fields.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-unused-private-fields) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-unused-private-fields)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-unused-private-fields) |
| [`@putout/plugin-remove-useless-variables`](/packages/plugin-remove-useless-variables) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-useless-variables.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-useless-variables) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-useless-variables)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-useless-variables) |
| [`@putout/plugin-remove-useless-map`](/packages/plugin-remove-useless-map) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-useless-map.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-useless-map) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-useless-map)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-useless-map) |
| [`@putout/plugin-remove-useless-mapped-types`](/packages/plugin-remove-useless-mapped-types) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-useless-mapped-types.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-useless-mapped-types) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-useless-mapped-types)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-useless-mapped-types) |
| [`@putout/plugin-remove-useless-mapping-modifiers`](/packages/plugin-remove-useless-mapping-modifiers) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-useless-mapping-modifiers.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-useless-mapping-modifiers) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-useless-mapping-modifiers)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-useless-mapping-modifiers) |
| [`@putout/plugin-remove-useless-return`](/packages/plugin-remove-useless-return) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-useless-return.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-useless-return) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-useless-return)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-useless-return) |
| [`@putout/plugin-remove-useless-continue`](/packages/plugin-remove-useless-continue) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-useless-continue.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-useless-continue) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-useless-continue)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-useless-continue) |
| [`@putout/plugin-remove-useless-operand`](/packages/plugin-remove-useless-operand) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-useless-operand.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-useless-operand) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-useless-operand)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-useless-operand) |
| [`@putout/plugin-remove-useless-array-constructor`](/packages/plugin-remove-useless-array-constructor) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-useless-array-constructor.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-useless-array-constructor) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-useless-array-constructor)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-useless-array-constructor) |
| [`@putout/plugin-remove-useless-conditions`](/packages/plugin-remove-useless-conditions) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-useless-conditions.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-useless-conditions) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-useless-conditions)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-useless-conditions) |
| [`@putout/plugin-remove-useless-type-conversion`](/packages/plugin-remove-useless-type-conversion) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-useless-type-conversion.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-useless-type-conversion) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-useless-type-conversion)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-useless-type-conversion) |
| [`@putout/plugin-remove-useless-functions`](/packages/plugin-remove-useless-functions) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-useless-functions.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-useless-functions) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-useless-functions)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-useless-functions) |
| [`@putout/plugin-remove-useless-async`](/packages/plugin-remove-useless-async) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-useless-async.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-useless-async) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-useless-async)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-useless-async) |
| [`@putout/plugin-remove-useless-await`](/packages/plugin-remove-useless-await) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-useless-await.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-useless-await) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-useless-await)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-useless-await) |
| [`@putout/plugin-remove-useless-typeof`](/packages/plugin-remove-useless-typeof) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-useless-typeof.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-useless-typeof) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-useless-typeof)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-useless-typeof) |
| [`@putout/plugin-remove-useless-types`](/packages/plugin-remove-useless-types) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-useless-types.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-useless-types) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-useless-types)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-useless-types) |
| [`@putout/plugin-remove-useless-types-from-constants`](/packages/plugin-remove-useless-types-from-constants) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-useless-types-from-constants.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-useless-types-from-constants) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-useless-types-from-constants)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-useless-types-from-constants) |
| [`@putout/plugin-remove-useless-array-from`](/packages/plugin-remove-useless-array-from) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-useless-array-from.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-useless-array-from) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-useless-array-from)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-useless-array-from) |
| [`@putout/plugin-remove-useless-spread`](/packages/plugin-remove-useless-spread) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-useless-spread.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-useless-spread) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-useless-spread)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-useless-spread) |
| [`@putout/plugin-remove-useless-arguments`](/packages/plugin-remove-useless-arguments) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-useless-arguments.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-useless-arguments) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-useless-arguments)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-useless-arguments) |
| [`@putout/plugin-remove-useless-escape`](/packages/plugin-remove-useless-escape) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-useless-escape.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-useless-escape) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-useless-escape)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-useless-escape) |
| [`@putout/plugin-remove-useless-template-expressions`](/packages/plugin-remove-useless-template-expressions) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-useless-template-expressions.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-useless-template-expressions) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-useless-template-expressions)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-useless-template-expressions) |
| [`@putout/plugin-remove-useless-for-of`](/packages/plugin-remove-useless-for-of) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-useless-for-of.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-useless-for-of) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-useless-for-of)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-useless-for-of) |
| [`@putout/plugin-remove-process-exit`](/packages/plugin-remove-process-exit) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-process-exit.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-process-exit) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-process-exit)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-process-exit) |
| [`@putout/plugin-remove-debugger`](/packages/plugin-remove-debugger) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-debugger.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-debugger) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-debugger)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-debugger) |
| [`@putout/plugin-remove-iife`](/packages/plugin-remove-iife) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-iife.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-iife) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-iife)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-iife) |
| [`@putout/plugin-remove-only`](/packages/plugin-remove-only) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-only.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-only) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-only)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-only) |
| [`@putout/plugin-remove-skip`](/packages/plugin-remove-skip) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-skip.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-skip) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-skip)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-skip) |
| [`@putout/plugin-remove-double-negations`](/packages/plugin-remove-double-negations) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-double-negations.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-double-negations) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-double-negations)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-double-negations) |
| [`@putout/plugin-remove-unreachable-code`](/packages/plugin-remove-unreachable-code) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-unreachable-code.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-unreachable-code) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-unreachable-code)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-unreachable-code) |
| [`@putout/plugin-remove-console`](/packages/plugin-remove-console) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-console.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-console) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-console)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-console) |
| [`@putout/plugin-remove-empty`](/packages/plugin-remove-empty) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-empty.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-empty) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-empty)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-empty) |
| [`@putout/plugin-remove-empty-pattern`](/packages/plugin-remove-empty-pattern) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-empty-pattern.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-empty-pattern) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-empty-pattern)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-empty-pattern) |
| [`@putout/plugin-remove-constant-conditions`](/packages/plugin-remove-constant-conditions) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-constant-conditions.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-constant-conditions) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-constant-conditions)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-constant-conditions) |
| [`@putout/plugin-remove-boolean-from-assertions`](/packages/plugin-remove-boolean-from-assertions) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-boolean-from-assertions.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-boolean-from-assertions) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-boolean-from-assertions)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-boolean-from-assertions) |
| [`@putout/plugin-remove-boolean-from-logical-expressions`](/packages/plugin-remove-boolean-from-logical-expressions) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-boolean-from-logical-expressions.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-boolean-from-logical-expressions) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-boolean-from-logical-expressions)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-boolean-from-logical-expressions) |
| [`@putout/plugin-remove-duplicates-from-logical-expressions`](/packages/plugin-remove-duplicates-from-logical-expressions) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-duplicates-from-logical-expressions.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-duplicates-from-logical-expressions) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-duplicates-from-logical-expressions)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-duplicates-from-logical-expressions) |
| [`@putout/plugin-remove-nested-blocks`](/packages/plugin-remove-nested-blocks) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-nested-blocks.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-nested-blocks) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-nested-blocks)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-nested-blocks) |

### Simplifiers

| Package | Version | Dependencies |
|--------|-------|------------|
| [`@putout/plugin-simplify-assignment`](/packages/plugin-simplify-assignment) | [![npm](https://img.shields.io/npm/v/@putout/plugin-simplify-assignment.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-simplify-assignment) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-simplify-assignment)](https://david-dm.org/coderaiser/putout?path=packages/plugin-simplify-assignment) |
| [`@putout/plugin-simplify-logical-expressions`](/packages/plugin-simplify-logical-expressions) | [![npm](https://img.shields.io/npm/v/@putout/plugin-simplify-logical-expressions.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-simplify-logical-expressions) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-simplify-logical-expressions)](https://david-dm.org/coderaiser/putout?path=packages/plugin-simplify-logical-expressions) |
| [`@putout/plugin-simplify-ternary`](/packages/plugin-simplify-ternary) | [![npm](https://img.shields.io/npm/v/@putout/plugin-simplify-ternary.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-simplify-ternary) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-simplify-ternary)](https://david-dm.org/coderaiser/putout?path=packages/plugin-simplify-ternary) |

### Not bundled

Next packages not bundled with `putout` but can be installed separately.

| Package | Version | Dependencies |
|--------|-------|------------|
| [`@putout/plugin-apply-try-catch`](/packages/plugin-apply-try-catch) | [![npm](https://img.shields.io/npm/v/@putout/plugin-apply-try-catch.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-apply-try-catch) | [![Depentry-catch](https://david-dm.org/cotry-catch/putout.svg?path=packages/plugin-apply-try-catch)](https://david-dm.org/cotry-catch/putout?path=packages/plugin-apply-try-catch) |
| [`@putout/plugin-apply-early-return`](/packages/plugin-apply-early-return) | [![npm](https://img.shields.io/npm/v/@putout/plugin-apply-early-return.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-apply-early-return) | [![Depenearly-returnStatus](https://david-dm.org/coearly-return/putout.svg?path=packages/plugin-apply-early-return)](https://david-dm.org/coearly-return/putout?path=packages/plugin-apply-early-return) |
| [`@putout/plugin-react-hooks`](/packages/plugin-react-hooks) | [![npm](https://img.shields.io/npm/v/@putout/plugin-react-hooks.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-react-hooks) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-react-hooks)](https://david-dm.org/coderaiser/putout?path=packages/plugin-react-hooks) |
| [`@putout/plugin-convert-is-nan-to-number-is-nan`](/packages/plugin-convert-is-nan-to-number-is-nan) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-is-nan-to-number-is-nan.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-is-nan-to-number-is-nan) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-is-nan-to-number-is-nan)](https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-is-nan-to-number-is-nan) |
| [`@putout/plugin-convert-spread-to-array-from`](/packages/plugin-convert-spread-to-array-from) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-spread-to-array-from.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-spread-to-array-from) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-spread-to-array-from)](https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-spread-to-array-from) |
| [`@putout/plugin-apply-shorthand-properties`](/packages/plugin-apply-shorthand-properties) | [![npm](https://img.shields.io/npm/v/@putout/plugin-apply-shorthand-properties.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-apply-shorthand-properties) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-apply-shorthand-properties)](https://david-dm.org/coderaiser/putout?path=packages/plugin-apply-shorthand-properties) |
| [`@putout/plugin-apply-nullish-coalescing`](/packages/plugin-apply-nullish-coalescing) | [![npm](https://img.shields.io/npm/v/@putout/plugin-apply-nullish-coalescing.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-apply-nullish-coalescing) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-apply-nullish-coalescing)](https://david-dm.org/coderaiser/putout?path=packages/plugin-apply-nullish-coalescing)|
| [`@putout/plugin-cloudcmd`](/packages/plugin-cloudcmd) | [![npm](https://img.shields.io/npm/v/@putout/plugin-cloudcmd.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-cloudcmd) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-cloudcmd)](https://david-dm.org/coderaiser/putout?path=packages/plugin-cloudcmd) |
| [`@putout/plugin-postcss`](/packages/plugin-postcss) | [![npm](https://img.shields.io/npm/v/@putout/plugin-postcss.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-postcss) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-postcss)](https://david-dm.org/coderaiser/putout?path=packages/plugin-postcss) |
| [`@putout/plugin-jest`](/packages/plugin-jest) | [![npm](https://img.shields.io/npm/v/@putout/plugin-jest.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-jest) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-jest)](https://david-dm.org/coderaiser/putout?path=packages/plugin-jest) |
| [`@putout/plugin-convert-any-to-primitive`](/packages/plugin-convert-any-to-primitive) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-any-to-primitive.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-any-to-primitive) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-any-to-primitive)](https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-any-to-primitive) |
| [`@putout/plugin-travis`](/packages/plugin-travis) | [![npm](https://img.shields.io/npm/v/@putout/plugin-travis.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-travis) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-travis)](https://david-dm.org/coderaiser/putout?path=packages/plugin-travis) |
| [`@putout/plugin-convert-throw`](/packages/plugin-convert-throw) | [![npm](https://img.shields.io/npm/v/@putout/plugin-convert-throw.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-convert-throw) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-throw)](https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-throw) |
| [`@putout/plugin-add-return-await`](/packages/plugin-add-return-await) | [![npm](https://img.shields.io/npm/v/@putout/plugin-add-return-await.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-add-return-await) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-add-return-await)](https://david-dm.org/coderaiser/putout?path=packages/plugin-add-return-await) |

### Other

| Package | Version | Dependencies |
|--------|-------|------------|
| [`@putout/plugin-declare-undefined-variables`](/packages/plugin-declare-undefined-variables) | [![npm](https://img.shields.io/npm/v/@putout/plugin-declare-undefined-variables.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-declare-undefined-variables) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-declare-undefined-variables)](https://david-dm.org/coderaiser/putout?path=packages/plugin-declare-undefined-variables) |
| [`@putout/plugin-reuse-duplicate-init`](/packages/plugin-reuse-duplicate-init) | [![npm](https://img.shields.io/npm/v/@putout/plugin-reuse-duplicate-init.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-reuse-duplicate-init) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-reuse-duplicate-init)](https://david-dm.org/coderaiser/putout?path=packages/plugin-reuse-duplicate-init) |
| [`@putout/plugin-madrun`](/packages/plugin-madrun) | [![npm](https://img.shields.io/npm/v/@putout/plugin-madrun.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-madrun) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-madrun)](https://david-dm.org/coderaiser/putout?path=packages/plugin-madrun) |
| [`@putout/plugin-strict-mode`](/packages/plugin-strict-mode) | [![npm](https://img.shields.io/npm/v/@putout/plugin-strict-mode.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-strict-mode) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-strict-mode)](https://david-dm.org/coderaiser/putout?path=packages/plugin-strict-mode) |
| [`@putout/plugin-extract-sequence-expressions`](/packages/plugin-extract-sequence-expressions) | [![npm](https://img.shields.io/npm/v/@putout/plugin-extract-sequence-expressions.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-extract-sequence-expressions) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-extract-sequence-expressions)](https://david-dm.org/coderaiser/putout?path=packages/plugin-extract-sequence-expressions) |
| [`@putout/plugin-extract-object-properties`](/packages/plugin-extract-object-properties) | [![npm](https://img.shields.io/npm/v/@putout/plugin-extract-object-properties.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-extract-object-properties) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-extract-object-properties)](https://david-dm.org/coderaiser/putout?path=packages/plugin-extract-object-properties) |
| [`@putout/plugin-putout`](/packages/plugin-putout) | [![npm](https://img.shields.io/npm/v/@putout/plugin-putout.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-putout) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-putout)](https://david-dm.org/coderaiser/putout?path=packages/plugin-putout) |
| [`@putout/plugin-putout-config`](/packages/plugin-putout-config) | [![npm](https://img.shields.io/npm/v/@putout/plugin-putout-config.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-putout-config) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-putout-config)](https://david-dm.org/coderaiser/putout?path=packages/plugin-putout-config) |
| [`@putout/plugin-tape`](/packages/plugin-tape) | [![npm](https://img.shields.io/npm/v/@putout/plugin-tape.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-tape) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-tape)](https://david-dm.org/coderaiser/putout?path=packages/plugin-tape) |
| [`@putout/plugin-webpack`](/packages/plugin-webpack) | [![npm](https://img.shields.io/npm/v/@putout/plugin-webpack.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-webpack) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-webpack)](https://david-dm.org/coderaiser/putout?path=packages/plugin-webpack) |
| [`@putout/plugin-eslint`](/packages/plugin-eslint) | [![npm](https://img.shields.io/npm/v/@putout/plugin-eslint.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-eslint) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-eslint)](https://david-dm.org/coderaiser/putout?path=packages/plugin-eslint) |
| [`@putout/plugin-package-json`](/packages/plugin-package-json) | [![npm](https://img.shields.io/npm/v/@putout/plugin-package-json.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-package-json) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-package-json)](https://david-dm.org/coderaiser/putout?path=packages/plugin-package-json) |
| [`@putout/plugin-promises`](/packages/plugin-promises) | [![npm](https://img.shields.io/npm/v/@putout/plugin-promises.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-promises) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-promises)](https://david-dm.org/coderaiser/putout?path=packages/plugin-promises) |
| [`@putout/plugin-gitignore`](/packages/plugin-gitignore) | [![npm](https://img.shields.io/npm/v/@putout/plugin-gitignore.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-gitignore) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-gitignore)](https://david-dm.org/coderaiser/putout?path=packages/plugin-gitignore) |
| [`@putout/plugin-npmignore`](/packages/plugin-npmignore) | [![npm](https://img.shields.io/npm/v/@putout/plugin-npmignore.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-npmignore) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-npmignore)](https://david-dm.org/coderaiser/putout?path=packages/plugin-npmignore) |
| [`@putout/plugin-browserlist`](/packages/plugin-browserlist) | [![npm](https://img.shields.io/npm/v/@putout/plugin-browserlist.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-browserlist) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-browserlist)](https://david-dm.org/coderaiser/putout?path=packages/plugin-browserlist) |
| [`@putout/plugin-github`](/packages/plugin-github) | [![npm](https://img.shields.io/npm/v/@putout/plugin-github.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-github) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-github)](https://david-dm.org/coderaiser/putout?path=packages/plugin-github) |
| [`@putout/plugin-regexp`](/packages/plugin-regexp) | [![npm](https://img.shields.io/npm/v/@putout/plugin-regexp.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-regexp) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-regexp)](https://david-dm.org/coderaiser/putout?path=packages/plugin-regexp) |
| [`@putout/plugin-nodejs`](/packages/plugin-nodejs) | [![npm](https://img.shields.io/npm/v/@putout/plugin-nodejs.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-nodejs) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-nodejs)](https://david-dm.org/coderaiser/putout?path=packages/plugin-nodejs) |

## Formatters

`putout` uses formatters similar to [eslint's formatters](https://eslint.org/docs/user-guide/formatters/).
You can specify a formatter using the `--format` or `-f` flag on the command line. For example, `--format codeframe` uses the `codeframe` formatter.

The built-in formatter options are:

- `dump`
- `stream`
- `json`
- `json-lines`
- `codeframe`
- `progress`
- `progress-bar`
- `frame` (`codeframe` + `progress`)
- `memory`

| Package | Version | Dependencies |
|---------|---------|--------------|
| [`@putout/formatter-dump`](/packages/formatter-dump) | [![npm](https://img.shields.io/npm/v/@putout/formatter-dump.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/formatter-dump) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/formatter-dump)](https://david-dm.org/coderaiser/putout?path=packages/formatter-dump) |
| [`@putout/formatter-stream`](/packages/formatter-stream) | [![npm](https://img.shields.io/npm/v/@putout/formatter-stream.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/formatter-stream) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/formatter-stream)](https://david-dm.org/coderaiser/putout?path=packages/formatter-stream) |
| [`@putout/formatter-progress`](/packages/formatter-progress) | [![npm](https://img.shields.io/npm/v/@putout/formatter-progress.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/formatter-progress) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/formatter-progress)](https://david-dm.org/coderaiser/putout?path=packages/formatter-progress) |
| [`@putout/formatter-progress-bar`](/packages/formatter-progress-bar) | [![npm](https://img.shields.io/npm/v/@putout/formatter-progress-bar.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/formatter-progress-bar) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/formatter-progress-bar)](https://david-dm.org/coderaiser/putout?path=packages/formatter-progress-bar) |
| [`@putout/formatter-json`](/packages/formatter-json) | [![npm](https://img.shields.io/npm/v/@putout/formatter-json.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/formatter-json) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/formatter-json)](https://david-dm.org/coderaiser/putout?path=packages/formatter-json) |
| [`@putout/formatter-json-lines`](/packages/formatter-json-lines) | [![npm](https://img.shields.io/npm/v/@putout/formatter-json-lines.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/formatter-json-lines) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/formatter-json-lines)](https://david-dm.org/coderaiser/putout?path=packages/formatter-json-lines) |
| [`@putout/formatter-codeframe`](/packages/formatter-codeframe) | [![npm](https://img.shields.io/npm/v/@putout/formatter-codeframe.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/formatter-codeframe) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/formatter-codeframe)](https://david-dm.org/coderaiser/putout?path=packages/formatter-codeframe) |
| [`@putout/formatter-frame`](/packages/formatter-frame) | [![npm](https://img.shields.io/npm/v/@putout/formatter-frame.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/formatter-frame) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/formatter-frame)](https://david-dm.org/coderaiser/putout?path=packages/formatter-frame) |
| [`@putout/formatter-eslint`](/packages/formatter-eslint) | [![npm](https://img.shields.io/npm/v/@putout/formatter-eslint.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/formatter-eslint) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/formatter-eslint)](https://david-dm.org/coderaiser/putout?path=packages/formatter-eslint) |
| [`@putout/formatter-memory`](/packages/formatter-memory) | [![npm](https://img.shields.io/npm/v/@putout/formatter-memory.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/formatter-memory) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/formatter-memory)](https://david-dm.org/coderaiser/putout?path=packages/formatter-memory) |

### Custom Formatter

Formatter function executes on every processed file, it should return `output string`.

```js
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
and add tags `putout`, `formatter`, `putout-formatter`.

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

To configure `putout` add section `putout` to your `package.json` file or create `.putout.json` file and override any of [default options](/packages/putout/putout.json).

### Rules

All rules located in `plugins` section and built-in rules are enabled by default.
You can disable rules using "off", or enable them (in `match` section) using "on".

```json
{
    "rules": {
        "remove-unused-variables": "off"
    }
}
```

Or pass options using `rules` section:

```json
{
    "rules": {
        "remove-unused-variables": ["on", {
            "exclude": "const global = __"
        }]
    }
}
```

#### Exclude

With help of `exclude` you can set `type` or `code pattern` to exclude for current rule.
Pass an array when you have a couple templates to exclude:

```json
{
    "rules": {
        "remove-unused-variables": ["on", {
            "exclude": [
                "VariableDeclaration"
            ]
        }]
    }
}
```

`exclude` is cross-plugin function supported by core, when develop your plugin, please use other name
to keep users ability to customize all plugins in a way they need to.


### Match

When you need to match paths to rules you can use `match` section for this purpose in `.putout.json`:

```json
{
    "match": {
        "server": {
            "remove-process-exit": "on"
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

There is two types of plugins supported by `putout`, their names in npm started with prefix:

- `@putout/plugin-` for official plugins
- `putout-plugin-` for user plugins

*Example*
If you need to `remove-something` create `putout` plugin with a name `putout-plugin-remove-something` and add it to `.putout.json`:

```json
{
    "plugins": [
        "remove-something"
    ]
}
```

Add `putout` as a `peerDependency` to your `packages.json` (>= of version you developing for).

*Always add keywords `putout`, `putout-plugin` when publish putout plugin to `npm` so others can easily find it.*

## Plugins API

Let's consider a couple plugin types, that can be used.

### Replacer

The simplest `putout` plugin type, consits of 2 functions:

- `report` - report error message to `putout` cli;
- `replace` - replace `key` template into `value` template;

```js
module.exports.report = () => 'use optional chaining';
module.exports.replace = () => ({
    '__a && __a.__b': '__a?.__b',
});
```

This plugin will find and sugest to replace all occurrences of code: `object && object.property` into `object?.property`.

### Includer

More powerful plugin type, when you need more control over traversing.
It should contain next 2 functions:

- `report` - report error message to `putout` cli;
- `fix` - fixes paths using `places` array received using `find` function;

and one or more of this:

- `filter` - filter path, should return `true`, or `false` (don't use with `traverse`);
- `include` - returns array of templates, or node names to include;
- `exclude` - returns array of templates, or node names to exclude;

```js
module.exports.report = () => 'use optional chaining';
module.exports.include = () => [
    'debugger',
];

module.exports.fix = (path) => {
    path.remove(path);
};
```

More information about supported plugin types you can find at [@putout/engine-runner](https://github.com/coderaiser/putout/tree/master/packages/engine-runner).
About the process of plugins loading you can find at [@putout/engine-loader](https://github.com/coderaiser/putout/tree/master/packages/engine-loader).

When you need, you can use [@babel/types](https://babeljs.io/docs/en/next/babel-types.html), [template](https://babeljs.io/docs/en/next/babel-template.html) and [generate](https://babeljs.io/docs/en/babel-generator). All of this can be get from `putout`:

```js
const {
    types,
    template,
    generate,
} = require('putout');
```

Most information you can find in [Babel Plugin Handbook](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md) is relevant to `putout` plugins.
To understand how things works from the inside take a look at [Super Tiny Compiler](https://github.com/jamiebuilds/the-super-tiny-compiler).

### Operator

When you need to use `replaceWith`, `replaceWithMultiple`, or `insertAfter`, please use `operator` instead of `path`-methods.

```js
const {template, operator} = require('putout');
const {replaceWith} = operator;

const ast = template.ast(`
  const str = 'hello';
`);

module.exports.fix = (path) => {
    // wrong
    path.replaceWith(ast);
    
    // correct
    replaceWith(path, ast);
};
```

This should be done to preserve `loc` and `comments` information, which is different in `babel` and `recast`. `putout` will handle this case for you :),
just use methods of `operator`.

### Putout Plugin

When you work on a `plugin` or `codemod` please add rule `putout` into `.putout.json`:

```json
{
    "rules": {
        "putout": "on"
    }
}
```

[@putout/plugin-putout](https://github.com/coderaiser/putout/tree/master/packages/plugin-putout) will handle plugin-specific cases for you :).

### Example

Let's consider simplest possible plugin for removing `debugger statements` [@putout/plugin-remove-debugger](https://github.com/coderaiser/putout/tree/master/packages/plugin-remove-debugger):

```js
// this is a message to show in putout cli
module.exports.report = () => 'Unexpected "debugger" statement';

// let's find all "debugger" statements and replace them with ""
module.exports.replace = () => ({
    debugger: '',
});
```

`Visitor` used in `traverse function` can be code template as well. So when you need to find `module.exports = <something>`, you
can use:

```js
module.exports.traverse = ({push}) => ({
    'module.exports = __'(path) {
        push(path);
    },
});
```

Where `__` is a placeholder for anything.

*Remember: template key should be valid JavaScript, or Type name like in previous example.*

You can also use `include` and/or `exclude` insead of `traverse` and `filter` ([more sophisticated example](https://github.com/coderaiser/putout/blob/master/packages/plugin-add-return-await/lib/add-return-await.js)):

```js
// should be always used include/or exclude, when traverse not used
module.exports.include = () => [
    'debugger',
];

// optional
module.exports.exclude = () => [
    'console.log',
];

// optional
module.exports.filter = (path) => {
    // do some checks
    return true;
};
```

### Template

There is predefined placeholders:

- `__` - any code;
- `"__"` - any string literal;
- `__` - any template string literal;

### Testing

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

As you see test runner it is little bit extended [supertape](https://github.com/coderaiser/supertape).
To see more sophisticated example look at [@putout/remove-console](https://github.com/coderaiser/putout/tree/master/packages/plugin-remove-console).

### 🤷‍♂️ What if I don't want to publish a plugin?

If you don't want to publish a `plugin` you developed, you can pass it to `Putout` as an `object` described earler. Here is [how it can look like](https://github.com/coderaiser/mock-import/blob/v1.0.8/lib/convert-imports/index.js#L19-L33):

```js
putout('const a = 5', {
    plugins: [
        ['remove-unused-variables', require('@putout/plugin-remove-unused-variables')],
    ],
});
```

Where `plugins` is an `array` that contains `[name, implementation]` `tuples`.

## Using Babel Plugins with Putout

You can add `babel` to `plugins` section of `.putout.json` with `babel/` prefix.

*You can disable rule, or use match in a similar way.*

*Remember to omit `babel-plugin-` or `@babel/plugin`: putout will set it up for you :)*

*Example*
Let's add `babel-plugin-transform-inline-consecutive-adds` to `.putout.json`:

```json
{
    "plugins": [
        "babel/transform-inline-consecutive-adds"
    ]
}
```

Then create a file and process it with help of `babel plugin`.

```sh
coderaiser@cloudcmd:~$ cat > a.js
const t = [];
t.push(1);
t.push(2);

coderaiser@cloudcmd:~$ putout a.js -f codeframe
/home/coderaiser/a.js:4:0
  2 | t.push(1);
  3 | t.push(2);
> 4 |
    | ^ transform inline consecutive adds

✖ 1 errors in 1 files
  fixable with the `--fix` option
coderaiser@cloudcmd:~$ putout --fix a.js
coderaiser@cloudcmd:~$ cat a.js
const t = [1, 2];
```

Using `putout` as a runner for `babel` `plugins` you can not only change file content, but also see what exactly will be changed. You can use your already written
`babel` `plugins` or reuse work in progress plugins made for `babel`, but remember that `putout` `plugins` gave more accurate information about changing places, and works faster (no need to find information about changes in transformed file).

### Babel plugins list

Here you can find `babel plugins` which feets the most main purpose of `putout` and advised to use:

<details><summary><a href="https://babeljs.io/docs/en/babel-plugin-transform-inline-consecutive-adds">transform-inline-consecutive-adds</a></summary>

```diff
-const foo = {};
-foo.a = 42;
-foo.b = ["hi"];
-foo.c = bar();
-foo.d = "str";
+const foo = {
+  a: 42,
+  b: ["hi"],
+  c: bar(),
+  d: "str"
+};

-const bar = [];
-bar.push(1);
-bar.push(2);
+const bar = [1, 2];
```

</details>

<details><summary><a href="https://github.com/babel/babel/tree/master/codemods/babel-plugin-codemod-object-assign-to-object-spread">codemod-object-assign-to-object-spread</a></summary>

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

<details><summary><a href="https://github.com/babel/babel/tree/master/codemods/babel-plugin-codemod-optional-catch-binding">codemod-optional-catch-binding</a></summary>

```diff
try {
    throw 0;
-} catch (err) {
+} catch {
    console.log("it failed, but this code executes");
}
```

</details>

Please send pull requests with `babel plugins` which can be used as codemods, or simplify, fix, makes code more readable.

## Using JSCodeshift codemods with Putout

`jscodeshift` codemods can be added to `plugins` section of `.putout.json` with prefix `jscodeshift/`. This way:

*Example*

```json
{
    "plugins": [
        "jscodeshift/async-await-codemod"
    ]
}
```

### JSCodeshift codemods list

Here you can find `jscodeshift codemods` which feets the most main purpose of `putout` and advised to use:

<details><summary><a href="https://github.com/sgilroy/async-await-codemod">async-await-codemod</a></summary>

```diff
-function makeRequest() {
-  return getJSON().then(data => {
-    console.log(data);
-    return 'done';
-  });
+ async function makeRequest() {
+  const data = await getJSON();
+  console.log(data);
+  return 'done';
}
```

</details>

Please send pull requests with `jscodeshift codemods` which can be used to simplify, fix or makes code more readable.

## Codemods

`putout` supports `codemodes` in the similar to plugins way, just create a directory `~/.putout` and put your plugins there. Here is example: [convert-tape-to-supertape](https://github.com/coderaiser/putout/tree/master/codemods/plugin-convert-tape-to-supertape) and [this is example of work](https://github.com/coderaiser/putout/commit/ad02cebc344ce73cdee668cffc5078bf08830d52).

## Integration with ESLint

If you see that `putout` brokes formatting of your code, use eslint plugin [eslint-plugin-putout](https://github.com/coderaiser/putout/tree/master/packages/eslint-plugin-putout).

Install `eslint-plugin-putout` with:

```
npm i eslint eslint-plugin-putout -D
```

Then create `.eslintrc.json`:

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
putout --fix lib
```

To set custom `eslint config file` use `ESLINT_CONFIG_FILE` env variable:

```sh
ESLINT_CONFIG_FILE=test.eslintrc.json putout --fix lib
```

You can even use only `eslint`, because `putout` bundled to `eslint-plugin-putout` with:

```
eslint --fix lib
```

Will uses putout transformations for you :).

## Integration with Babel

`Putout` can be used as [babel plugin](/packages/babel-plugin-putout).
Just create `.babelrc.json` file with configuration you need.

```json
{
    "plugins": [
        ["putout", {
            "rules": {
                "remove-unused-variables": "off"
            }
        }]
    ]
}
```

## Using Putout as Loader

`Putout` can be used as [loader](https://nodejs.org/dist/latest-v16.x/docs/api/esm.html#esm_transformsource_source_context_defaulttransformsource) this way:

```sh
node --loader putout your-file.js
```

You can also transform input files using `Babel`. For example if you need to transform `jsx` with `@babel/plugin-transform-react-jsx` you can use `.putout.json`:

```json
{
    "plugins": [
        "babel/transform-react-jsx"
    ]
}
```

## Real-world uses

- [Cloud Commander](https://cloudcmd.io): orthodox file manager for the web.
- [Eslint Config Hardcore](https://github.com/EvgenyOrekhov/eslint-config-hardcore): The most strict (but practical) ESLint config out there.
- [Mock Import](https://github.com/coderaiser/mock-import): Mocking of Node.js EcmaScript Modules.
- [Madrun](https://github.com/coderaiser/madrun): CLI tool to run multiple npm-scripts in a madly comfortable way.
- [Xterm.js](https://github.com/xtermjs/xterm.js/pull/3269): A terminal for the web.
- [Stylelint](https://github.com/stylelint/stylelint/issues/5291#issuecomment-841625288): A mighty, modern linter that helps you avoid errors and enforce conventions in your styles.
- [ESTrace](https://github.com/coderaiser/estrace): Trace functions in EcmaScript Modules.

Do you use `putout` in your application as well? Please open a Pull Request to include it here. We would love to have it in our list.

## Versioning Policy

`Putout` follows semantic versioning ([semver](https://semver.org)) principles.
That means that with a version number **major**.**minor**.**patch**:

- **patch**: `bug fix`, `dependency update` (`17.0.0 -> 17.0.1`).
- **minor**: `new features`, `new rules` or `fixes` (`17.0.0 -> 17.1.0`).
- **major** `breaking changes`, `removing rules` (`17.0.0 -> 18.0.0`).

## Contributions

You can make contribution proposing a feature, fixing a bug or typo in documentation or making a dontation ;).

## Donations

`putout` requires quite a lot of effort and time. If you like it, support on [patreon](https://www.patreon.com/coderaiser).

## License

MIT
