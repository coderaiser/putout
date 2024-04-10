# @putout/plugin-npmignore [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-npmignore.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-npmignore"npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin helps with 🐊[**Putout**](https://github.com/coderaiser/putout) plugins development.

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
