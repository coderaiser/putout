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

- ✅ [add](#add);
- ✅ [sort](#sort);

## Config

```json
{
    "rules": {
        "gitignore/add": ["on", {
            "dismiss": [
                "*.swp",
                "coverage",
                "*.lock",
                "*.log"
            ]
        }],
        "gitignore/sort": "on"
    }
}
```

## add

Adds `.putoutcache`, `*.swp`, `.idea`:

```diff
node_modules
+.putoutcache
+*.swp
+.idea
```

## sort

### ❌ Example of incorrect code

```ignore
node_modules
*.swp
yarn-error.log
yarn.lock
.idea
.DS_Store
deno.lock

coverage
.filesystem.json
```

### ✅ Example of correct code

```ignore
.idea
.filesystem.json
.DS_Store

*.swp

yarn-error.log
yarn.lock
deno.lock

node_modules
coverage# sort
```

## License

MIT
