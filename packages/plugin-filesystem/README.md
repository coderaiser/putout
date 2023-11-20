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
        "filesystem/rename-file": "off",
        "filesystem/rename-spec-to-test": "off"
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

### ❌ Example of incorrect code

```diff
-README.md
+readme.md
```

## remove-vim-swap-file

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/a495c6782ed8b512f37e757bafd02b08/5d0dc03f6be2653639bb22ea00c3ce91e8454940).

### ❌ Example of incorrect code

```diff
-readme.md.swap
```

## rename-spec-to-test

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/ab52a74195eeb2f689e7284a1c987a03/d3a0e2ffac0bb33cc243004975d242d07d6d0bff).

### ❌ Example of incorrect code

```diff
-index.spec.js
+index.test.js
```

## License

MIT
