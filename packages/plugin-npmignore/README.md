# @putout/plugin-npmignore [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-npmignore.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-npmignore "npm"

> Use a `.npmignore` file to keep stuff out of your package. If there's no `.npmignore` file, but there is a `.gitignore` file, then npm will ignore the stuff matched by the `.gitignore` file.
>
> (c) [npmjs.com](https://docs.npmjs.com/cli/v9/using-npm/developers#keeping-files-out-of-your-package)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin helps with `.npmignore`.

## Install

```
npm i @putout/plugin-npmignore -D
```

## Rules

- ✅ [add](#add);
- ✅ [sort](#sort);

## Config

```json
{
    "rules": {
        "npmignore/add": ["on", {
            "dismiss": [
                ".nyc_output",
                ".putoutcache",
                "*.swp",
                "coverage",
                "*.config.*"
            ]
        }],
        "npmignore/sort": "on"
    }
}
```

## add

Adds `.*` into .npmignore.

```diff
+.*
test
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
