# @putout/plugin-filesystem [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-filesystem.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-filesystem"npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin helps to lint filesystem.

## Install

```
npm i @putout/plugin-filesystem -D
```

## Rules

- ✅ [bundle](#bundle);
- ✅ [convert-filesystem-to-simple-filesystem](#convert-filesystem-to-simple-filesystem);
- ✅ [convert-js-to-json](#convert-js-to-json);
- ✅ [convert-json-to-js](#convert-json-to-js);
- ✅ [convert-simple-filesystem-to-filesystem](#convert-simple-filesystem-to-filesystem);
- ✅ [move-referenced-file](#move-referenced-file);
- ✅ [read-all-files](#read-all-files);
- ✅ [rename-file](#rename-file);
- ✅ [remove-empty-directory](#remove-empty-directory);
- ✅ [remove-travis-yml-file](#remove-travis-yml-file);
- ✅ [remove-vim-swap-file](#remove-vim-swap-file);
- ✅ [remove-nyc-output-files](#remove-nyc-output-files);
- ✅ [remove-files](#remove-files);
- ✅ [rename-referenced-file](#rename-referenced-file);
- ✅ [rename-spec-to-test](#rename-spec-to-test);
- ✅ [rename-test-to-spec](#rename-test-to-spec);
- ✅ [replace-cwd](#replace-cwd);
- ✅ [write-all-files](#write-all-files);

## Config

```json
{
    "rules": {
        "filesystem/remove-empty-directory": "on",
        "filesystem/remove-travis-yml-file": "on",
        "filesystem/remove-vim-swap-file": "on",
        "filesystem/remove-nyc-output-files": "on",
        "filesystem/bundle": "off",
        "filesystem/read-all-files": ["off", {
            "mask": "*"
        }],
        "filesystem/write-all-files": "off",
        "filesystem/rename-file": "off",
        "filesystem/remove-files": "off",
        "filesystem/rename-spec-to-test": "off",
        "filesystem/rename-test-to-spec": "off",
        "filesystem/rename-referenced-file": "off",
        "filesystem/move-referenced-file": "off",
        "filesystem/convert-simple-filesystem-to-filesystem": "off",
        "filesystem/replace-cwd": ["off", {
            "from": "/home/coderaiser/putout",
            "to": "/"
        }],
        "filesystem/convert-json-to-js": ["off", {
            "filename": "package.json"
        }],
        "filesystem/convert-js-to-json": ["off", {
            "filename": "package.js"
        }]
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

## remove-empty-directory

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/52d8126f3e41b687c6028852a1925db7/5efcb17493ad5ebe8f1786075a985e1dd35ea59e).

```diff
/
-|-- hello/
-|  `-- abc/
-|      `-- def/
```

## remove-nyc-output-files

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/52d8126f3e41b687c6028852a1925db7/5efcb17493ad5ebe8f1786075a985e1dd35ea59e).

```diff
-.nyc_output
```

## remove-travis-yml-file

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/a495c6782ed8b512f37e757bafd02b08/5d0dc03f6be2653639bb22ea00c3ce91e8454940).

```diff
-.travis.yml
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

## bundle

Bundle and minify `css` files.

```json
{
    "rules": {
        "filesystem/bundle": ["on", {
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
        "filesystem/bundle": ["on", {
            "groups": ["1:1"]
        }]
    }
}
```

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
|   `-- hello.css
|   `-- world.css
```

Create subdirectory:

```json
{
    "rules": {
        "filesystem/bundle": ["on", {
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
|   `-- columns
|       `-- hello.css
|       `-- world.css
```

Filter css files by mask:

```json
{
    "rules": {
        "filesystem/bundle": ["on", {
            "mask": "*.good.css",
            "groups": ["1:1"]
        }]
    }
}
```

Before:

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
        'filesystem/bundle': ['on', {
            transform: (source: string | string[], config) => string,
        }],
    },
});
```

Concreate files:

```json
{
    "rules": {
        "filesystem/bundle": ["on", {
            "groups": ["hello.css"]
        }]
    }
}
```

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
|   `-- hello.css
```

## replace-cwd

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/97a4cb9bc9f79abc9585bf5b47392450/b6b9de0a407258643bfa469453d967e089648a59).

When `from=/home/coderaiser/putout` and `to=/`:

```json
{
    "rules": {
        "filesystem/replace-cwd": ["on", {
            "from": "/home/coderaiser/putout",
            "to": "/"
        }]
    }
}
```

### ❌ Example of incorrect code

```js
__putout_processor_filesystem(['/home/coderaiser/putout/', '/home/coderaiser/putout/README.md']);
```

### ✅ Example of correct code

```js
__putout_processor_filesystem(['/', '/README.md']);
```

## read-all-files

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/fb221770d2f35e89faf19d70eb945a1c/c857e8c2bf0511157f30a36f167266da3ea31647).

### ❌ Example of incorrect code

```json
["/", "/hello.xyz"]
```

### ✅ Example of correct code

```json
["/", [
    "/hello.xyz",
    "hello world"
]]
```

## write-all-files

Write all files that was read before to Filesystem.

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/2dda6b05987bbf91a1b18d7032489c05/286d2f04eb0e002cef14d102fa3e59bdf17bda47).

```json
["/", [
    "/hello.xyz",
    "hello world"
]]
```

## convert-json-to-js

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/f0b2fc640398820c5c25c13bcbfe8ae4/170eff778a433dc809e75158a6d8a9a0578c9cfd).

Filesystem:

```diff
-["/", "/package.json"]
+["/", "/package.js"]
```

### ❌ Example of incorrect code

```json
{
    "plugins": []
}
```

### ✅ Example of correct code

```js
export default {
    plugins: [],
};
```

## convert-js-to-json

Checkout in 🐊**Putout Editor**:

- [**Replacer**](https://putout.cloudcmd.io/#/gist/1d24f6b52a49cfecbfe104982d292244/a469d79ca6bc296eeb94af0712e5841d79aac237);
- [**Scanner**](https://putout.cloudcmd.io/#/gist/f0f290d79b06d718d13252d05ee739e7/3f063d9b62fe20fd26579792549a7deb32cd987a);

Filesystem:

```diff
-["/", "/package.js"]
+["/", "/package.json"]
```

### ❌ Example of incorrect code

```json
{
    "plugins": []
}
```

### ✅ Example of correct code

```js
export default {
    plugins: [],
};
```

## License

MIT
