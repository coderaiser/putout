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

Check out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/0614c2da35a1864b59ac284f18656328/8236b446363ec7f23f90b8fadd053e57cca7e37d).

### ❌ Example of incorrect code

```diff
-README.md
+readme.md
```

## License

MIT
