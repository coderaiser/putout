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

```json
{
    "rules": {
        "npmignore": ["on", {
            "dismiss": [
                ".nyc_output",
                ".putoutcache",
                "*.swp",
                "coverage",
                "*.config.*"
            ]
        }]
    }
}
```

## Add dot files

Adds `.*` into .npmignore.

```diff
+.*
test
```

## License

MIT
