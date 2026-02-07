# 🛠️ Syntax Errors

🐊**Putout** not only improves working code but also fixes broken code.

<details><summary>function declaration half converted from arrow expression</summary>

```diff
-function parse(source) => {
+function parse(source) {
    return source;
}
```

</details>

<details><summary>broken string</summary>

```diff
-const a = 'hello;
+const a = 'hello';

-const b = ‘hello world’;
+const b = 'hello world';

-x('hello);
+x('hello');
const m = {
-    z: x('hello
+    z: x('hello'),
}
```

</details>

<details><summary>forgotten round braces in if statement</summary>

```diff
-if a > 5 {
+if (a > 5) {
    alert();
}
```

</details>

<details><summary>add missing <code>async</code></summary>

```diff
-function get(url) {
+async function get(url) {
    return await fetch(url);
}
```

</details>

<details><summary>add missing <code>*</code></summary>

```diff
-function hello() {
+function* hello() {
    yield 'world';
}

-function func2() {
+function* func2() {
    yield* func1();
}
```

</details>

<details><summary>declare before reference</summary>

```diff
-const {remove} = operator;
const {types, operator} = require('putout');
+const {remove} = operator;
```

</details>

<details><summary>assignment to constant variable</summary>

```diff
-const a = 5;
+let a = 5;
a = 3;
```

</details>

<details><summary>constant variable without initializer</summary>

```diff
-const a;
+let a;
```

</details>

<details><summary>declare undefined variables</summary>

```diff
+import {readFile} from 'fs/promises';
readFile('./hello.js', 'utf8');
```

</details>

<details><summary>missing initializer</summary>

```diff
-const {code, places} await samadhi(source);
+const {code, places} = await samadhi(source);
```

</details>

<details><summary>remove useless<code>delete</code></summary>

```diff
-delete abc;
```

</details>

<details><summary>remove illegal<code>strict-mode</code></summary>

```diff
function x1(...a) {
-  'use strict';
}
```

</details>

<details><summary>remove getter arguments</summary>

```diff
export interface IParamsConstructor {
-   get fromArray(name: string): IParams;
+   get fromArray(): IParams;
}
```

</details>

<details><summary>remove setter return type</summary>

```diff
export interface IParamsConstructor {
-   set fromArray(name: string): IParams;
+   set fromArray(name: string);
}
```

</details>

<details><summary>import identifier</summary>

```diff
-import hello from hello;
+import hello from 'hello';
```

</details>

<details><summary>comma after statement</summary>

```diff
function x() {
-    return 'hello',
+    return 'hello';
}

-const a = 5,
+const a = 5;
```

</details>

<details><summary>useless comma</summary>

```diff
const a = {
-    b: 'hello',,
+    b: 'hello',
}

const a = class {
-    b() {},
+    b() {}
}
```

</details>

<details><summary>useless semicolon</summary>

```diff
const a = {
-    b: 'hello';
+    b: 'hello',
}
```

</details>

<details><summary>assign from</summary>

```diff
-const a = from 'a';
+const a = require('a');
```

</details>

<details><summary>convert assignment to declaration</summary>

```diff
-a = 5;
+const a = 5;
```

</details>

<details><summary>add missing parens</summary>

```diff
-getConsoleLog?.()``;
-String?.raw``;
-String?.raw!``;
+(getConsoleLog?.())``;
+(String?.raw)``;
+(String?.raw!)``;
```

</details>

<details><summary>export without const</summary>

```diff
-export x = () => {};
+export const x = () => {};
```

</details>

<details><summary>SyntaxError: missing formal parameter</summary>

```diff
-(__a + __b) => __b + __a;
+(__a, __b) => __b + __a;
```

</details>

<details><summary>wrong brace</summary>

```diff
-import a from 'a');
+import a from 'a';
```

</details>

<details><summary>add missing brace</summary>

```diff
a && b = a;
a && (b = a);
```

</details>

<details><summary>wrap with block</summary>

```diff
-if (a)
+if (a) {
    const b = 5;
+}
```

</details>

<details><summary>extract keywords from variables</summary>

```diff
-export const isTemplateMiddle = (a) => a?.type === 'TemplateMiddle',
+export const isTemplateMiddle = (a) => a?.type === 'TemplateMiddle';
export const isTemplateTail = (a) => a?.type === 'TemplateTail';

-export const a = 1,
+export const a = 1;
const b = 5;
```

</details>

<details><summary>convert <code>break</code> to <code>return</code></summary>

```diff
function get() {
    if (b)
-       break;
+       return;
}
```

</details>

<details><summary>convert <code>continue</code> to <code>return</code></summary>

```diff
function get() {
    if (b)
-       continue;
+       return;
}
```

</details>

<details><summary>remove useless <code>parens</code> for params </summary>

```diff
-const a = ((b)) => c;
+const a = (b) => c;
```

</details>

<details><summary>argument name clash</summary>

```diff
-const a = ({b, b, ...c}) => {};
+const a = ({b, ...c}) => {};
```

</details>

<details><summary>convert colon to comma</summary>

```diff
export const rules = [
-   ['apply-nesting': applyNesting],
+   ['apply-nesting', applyNesting],
];
```

</details>

<details><summary>remove useless export specifier</summary>

```diff
export const hello = () => 'world';
export const {
-    hello,
}
```

</details>

<details><summary><code>replaceAll()</code> called with a non-global <code>RegExp</code>argument</summary>

```diff
-'hello'.replaceAll(/hello/, 'world')
+'hello'.replaceAll(/hello/g, 'world')
```

</details>

<details><summary>convert <code>module</code> to <code>namespace</code></summary>

```diff
-module M {
+namespace M {
    var x: string;
}
```

</details>

<details><summary>remove duplicate to <code>parameter</code></summary>

```diff
-const s = (a, a) => {};
+const s = (a) => {};
```

</details>

<details><summary>split <code>namespace</code> with <code>specifiers</code></summary>

```diff
-import * as plugin, {CUT} from './plugin.js';
+import as plugin from './plugin.js';
+const {CUT} = plugin;
```

 </details>

<details><summary><code>Uncaught SyntaxError: Unexpected token ','</code></summary>

```diff
-renameFileWithLog('hello', ,'world');
+renameFileWithLog('hello', 'world');
```

 </details>
