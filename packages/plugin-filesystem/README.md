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
        "filesystem/rename-file": ["on", {
            "from": "README.md",
            "to": "readme.md"
        }]
    }
}
```

## rename-file

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/0614c2da35a1864b59ac284f18656328/66daa5b325666a0d5befa586965c56e9636a5db4).

### ❌ Example of incorrect code

```diff
-README.md
+readme.md
```

## License

MIT
