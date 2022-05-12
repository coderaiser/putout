# @putout/plugin-gitignore [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-gitignore.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-gitignore"npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin helps with 🐊[**Putout**](https://github.com/coderaiser/putout) plugins development.

## Install

```
npm i @putout/plugin-gitignore -D
```

## Rules

By default, all files enebled, if you want disable some of them use `dismiss` property:

```json
{
    "rules": {
        "gitignore": ["on", {
            "dismiss": [
                "*.swp",
                "coverage"
            ]
        }]
    }
}
```

## Add Putoutcache

Adds `.putoutcache` into .gitignore.

```diff
node_modules
+.putoutcache
```

## Add Vim Files

Adds `*.swp` into .gitignore.

```diff
+*.swp
node_modules
```

## Add `.idea` Files

Adds `*.swp` into .gitignore.

```diff
+.idea
node_modules
```

## License

MIT
