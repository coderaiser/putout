# @putout/plugin-package-json [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-package-json.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-package-json"npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin helps to automate fixing `package.json`.

## Install

```
npm i @putout/plugin-package-json -D
```

## Rules

```json
{
    "rules": {
        "package-json/add-type": "on",
        "package-json/remove-nyc": "on",
        "package-json/remove-commit-type": "on"
    }
}
```

## add-type

Add [`type`](https://nodejs.org/dist/latest-v17.x/docs/api/packages.html#type) field to `package.json`:

```diff
{
    "name": "hello",
    "version": "1.0.0",
+   "type": "commonjs"
}
```

## remove-nyc

- additional fields in `package.json` produces more traffic then users of your package really need;
- [c8](https://github.com/bcoe/c8) uses [same config name and format](https://github.com/bcoe/c8/blob/v7.3.5/lib/parse-args.js#L8) so transition between tools will be much easier;

### ❌ Example of incorrect code

`nyc` section in `package.json`:

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

### ✅ Example of correct code

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

## remove-commit-type

Since 🎁**Wisdom** [v14](https://github.com/coderaiser/wisdom/releases/tag/v14.0.0) `commitType` set to `colon` be default, so it can be dropped from `package.json` if it's value not `paren`:
Check out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/eb12c902c8e99effc91ae44119d625d7/8e60d60b2c2e7bb28ca5b2eba61715a062ac5319).

```diff
{
    "name": "hello",
    "version": "1.0.0",
    "commitType": "colon"
}
```

## License

MIT
