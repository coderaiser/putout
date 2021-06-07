# @putout/plugin-package-json [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-package-json.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-package-json"npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/package-json?path=packages/plugin-package-json
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/package-json.svg?path=packages/plugin-package-json

`putout` plugin helps to automate fixing `package-json` config.

## Install

```
npm i @putout/plugin-package-json -D
```

## Rules

```json
{
    "rules": {
        "package-json/remove-nyc": "on"
    }
}
```

## remove-nyc

- additional fields in `package.json` produces more traffic then users of your package really need;
- [c8](https://github.com/bcoe/c8) uses [same config name and format](https://github.com/bcoe/c8/blob/v7.3.5/lib/parse-args.js#L8) so transition between tools will be much easier;

### ❌ Incorrect code example

`nyc` section in "package.json":

```json
{
    "nyc": {
        "check-coverage": "on",
        "all": "on",
        "exclude": [
            "**/*.spec.js",
            "**/fixture",
            "test",
            ".*.js"
        ],
        "branches": 100,
        "lines": 100,
        "functions": 100,
        "statements": 100
    }
}
```

### ✅ Correct code Example

File `.nycrc.json`:

```json
{
    "check-coverage": "on",
    "all": "on",
    "exclude": [
        "**/*.spec.js",
        "**/fixture",
        "test",
        ".*.js"
    ],
    "branches": 100,
    "lines": 100,
    "functions": 100,
    "statements": 100
}
```

## License

MIT
