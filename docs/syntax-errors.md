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
const b = 'world';
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
