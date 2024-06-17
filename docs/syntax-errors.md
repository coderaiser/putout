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
```

</details>

<details><summary>useless semicolon</summary>

```diff
const a = {
-    b: 'hello';
+    b: 'hello',
}

const a = class {
-    b() {},
+    b() {}
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
const a = 5;
```

</details>
