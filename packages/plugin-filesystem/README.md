# @putout/plugin-filesystem [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-filesystem.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-filesystem"npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin helps to lint filesystem.

## Install

```
npm i @putout/plugin-filesystem -D
```

## Rules

```json
{
    "rules": {
        "filesystem/remove-vim-swap-file": "on",
        "filesystem/bundle-css": "off",
        "filesystem/rename-file": "off",
        "filesystem/remove-files": "off",
        "filesystem/rename-spec-to-test": "off",
        "filesystem/rename-test-to-spec": "off",
        "filesystem/rename-referenced-file": "off",
        "filesystem/move-referenced-file": "off",
        "filesystem/convert-simple-filesystem-to-filesystem": "off"
    }
}
```

## rename-file

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/0614c2da35a1864b59ac284f18656328/66daa5b325666a0d5befa586965c56e9636a5db4).

Update `.putout.json` to enable rule:

```json
{
    "rules": {
        "filesystem/rename-file": ["on", {
            "from": "README.md",
            "to": "readme.md"
        }]
    }
}
```

It will make next modifications to filesystem:

```diff
-README.md
+readme.md
```

For more sophisticated example, use `mask`:

```json
{
    "rules": {
        "filesystem/rename-file": ["on", {
            "mask": "*.test.*",
            "from": "test",
            "to": "spec"
        }]
    }
}
```

It will rename 'test' to 'spec' in `*.test.*` files:

```diff
-index.test.js
+index.spec.js
```

## remove-vim-swap-file

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/a495c6782ed8b512f37e757bafd02b08/5d0dc03f6be2653639bb22ea00c3ce91e8454940).

```diff
-readme.md.swap
```

## remove-files

Update `.putout.json` to enable rule:

```json
{
    "rules": {
        "filesystem/remove-files": ["on", {
            "names": ["coverage"]
        }]
    }
}
```

It will make next modifications to filesystem:

```diff
 /
 |-- test/
 |   `-- hello.spec.js
-|-- coverage/
 `-- lib/
     `-- hello.js
```

## rename-spec-to-test

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/ab52a74195eeb2f689e7284a1c987a03/d3a0e2ffac0bb33cc243004975d242d07d6d0bff).

```diff
-index.spec.js
+index.test.js
```

## rename-test-to-spec

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/28e4d3a847f0968401da67fff04fb784/1e3bfd4ddb241dd0de6c2402f49252af0806b719).

```diff
-index.test.js
+index.spec.js
```

## rename-referenced-file

Update `.putout.json` to enable rule:

```json
{
    "rules": {
        "filesystem/rename-referenced-file": ["on", {
            "from": "hello.js",
            "to": "world.js"
        }]
    }
}
```

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/688ef036984ed06a6b2ba349fdb84409/5597aa2b224d572b9204288f986ed06226a7c541).

Before:

```js
// hello.spec.js
import hello from './hello.js';
```

```js
// hello.js
export const hello = 'world';
```

After:

```diff
-hello.js
+world.js
```

```js
// hello.spec.js
import hello from './world.js';
```

```js
// world.js
export const hello = 'world';
```

## move-referenced-file

Update `.putout.json` to enable rule:

```json
{
    "rules": {
        "filesystem/move-referenced-file": ["on", {
            "name": "hello.js",
            "directory": "lib"
        }]
    }
}
```

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/02d0fefd171f6552c611dc6c11d0bbec/2b530c289e16e3fae375d44ce69ab3f8143e092e).

Before:

```
/
|-- test/
|  `-- hello.spec.js
|-- src/
|   `-- hello.js
`-- lib/
```

```js
// test/hello.spec.js
import hello from '../src/hello.js';
```

```js
// src/hello.js
export const hello = 'world';
```

After:

```
/
|-- test/
|   `-- hello.spec.js
|-- src/
`-- lib/
    `-- hello.js
```

```diff
-src/hello.js
+lib/hello.js
```

```js
// test/hello.spec.js
import hello from '../lib/hello.js';
```

```js
// lib/hello.js
export const hello = 'world';
```

## convert-simple-filesystem-to-filesystem

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/e15d077626f832dd0b98458b1b8ff284/e2d9d2767c9bfab3e4d337f149069666d2aafe79).

### ❌ Example of incorrect code

```js
__putout_processor_filesystem([
    '/',
    '/hello.txt',
    [
        '/world.txt',
        'hello world',
    ],
    '/abc/',
]);
```

### ✅ Example of correct code

```js
__putout_processor_filesystem({
    type: 'directory',
    filename: '/',
    files: [{
        type: 'file',
        filename: '/hello.txt',
    }, {
        type: 'file',
        filename: '/world.txt',
        content: 'hello world',
    }, {
        type: 'directory',
        filename: '/abc',
        files: [],
    }],
});
```

## convert-filesystem-to-simple-filesystem

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/79ce3ebdd5878d9fdcf80b762ceb8e76/52c9a16861c541abd601b83ad1c2ae988f97b28f).

### ❌ Example of incorrect code

```js
__putout_processor_filesystem({
    type: 'directory',
    filename: '/',
    files: [{
        type: 'file',
        filename: '/hello.txt',
    }, {
        type: 'file',
        filename: '/world.txt',
        content: 'hello world',
    }, {
        type: 'directory',
        filename: '/abc',
        files: [],
    }],
});
```

### ✅ Example of correct code

```js
__putout_processor_filesystem([
    '/',
    '/hello.txt',
    [
        '/world.txt',
        'hello world',
    ],
    '/abc/',
]);
```

## bundle-css

Bundle and minify `css` files.

```json
{
    "rules": {
        "filesystem/bundle-css": ["on", {
            "groups": [
                ["__:columns/__", [
                    "name-size-date.css",
                    "name-size.css"
                ]],
                ["main.css", [
                    "hello.css",
                    "world.css"
                ]],
                "1:1"
            ]
        }]
    }
}
```

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/547738d2faf984e50f12a1379c221c83/3f77d711f8acc4da50899d6ef0ebe5e7c0df1479).

Before:

```
/
|-- css/
|  `-- hello.css
|  `-- world.css
```

After:

```
/
|-- css/
|  `-- hello.css
|  `-- world.css
|-- dist/
|   `-- main.css
```

Just minify styles:

```json
{
    "rules": {
        "filesystem/bundle-css": ["on", {
            "groups": ["1:1"]
        }]
    }
}
```

```
/
|-- css/
|  `-- hello.css
|  `-- world.css
```

After:

```
/
|-- css/
|  `-- hello.css
|  `-- world.css
|-- dist/
|   `-- hello.css
|   `-- world.css
```

Create subdirectory:

```json
{
    "rules": {
        "filesystem/bundle-css": ["on", {
            "groups": [
                ["__:columns/__", [
                    "name-size-date.css",
                    "name-size.css"
                ]]
            ]
        }]
    }
}
```

```
/
|-- css/
|  `-- hello.css
|  `-- world.css
```

After:

```
/
|-- css/
|  `-- hello.css
|  `-- world.css
|-- dist/
|   `-- columns
|       `-- hello.css
|       `-- world.css
```

Filter css files by mask:

```json
{
    "rules": {
        "filesystem/bundle-css": ["on", {
            "mask": "*.good.css",
            "groups": ["1:1"]
        }]
    }
}
```

```
/
|-- css/
|  `-- hello.css
|  `-- world.good.css
```

After:

```
/
|-- css/
|  `-- hello.css
|  `-- world.css
|-- dist/
|   `-- world.good.css
```

You can even override `transform` with your own `config`:

```ts
putout(filesystem, {
    rules: {
        'filesystem/bundle-css': ['on', {
            transform: (source: string | string[], config) => string,
        }],
    },
});
```

Concreate files:

```json
{
    "rules": {
        "filesystem/bundle-css": ["on", {
            "groups": ["hello.css"]
        }]
    }
}
```

```
/
|-- css/
|  `-- hello.css
|  `-- world.css
```

After:

```
/
|-- css/
|  `-- hello.css
|  `-- world.css
|-- dist/
|   `-- hello.css
```

## License

MIT
