# @putout/plugin-gitignore [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-gitignore.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-gitignore"npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/plugin-gitignore
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-gitignore

`putout` plugin helps with `putout` plugins development.

## Install

```
npm i @putout/plugin-gitignore -D
```

## Rules

By default, all files enebled, if you want disable some of them use `dissmiss` property:

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

## License

MIT
