# @putout/plugin-gitignore [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-gitignore.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-gitignore "npm"

> A `.gitignore` file specifies intentionally untracked files that Git should ignore. Files already tracked by Git are not affected.
>
> (c) [git-scm.com](https://git-scm.com/docs/gitignore)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin helps with `.gitignore`.

## Install

```
npm i @putout/plugin-gitignore -D
```

## Rules

By default, all files enabled, if you want disable some of them use `dismiss` property:

```json
{
    "rules": {
        "gitignore": ["on", {
            "dismiss": [
                "*.swp",
                "coverage",
                "*.lock",
                "*.log"
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
