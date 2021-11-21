# @putout/putout-formatter-json [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/formatter-json.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/formatter-json "npm"

🐊[`Putout`](https://github.com/coderaiser/putout) formatter output json on end.

## Install

```
npm i putout @putout/formatter-json
```

## Usage

```sh
putout --format json lib
```

Result example:

```json
{
    "errors": [{
        "name": "/home/coderaiser/putout/packages/putout/lib/putout.js",
        "places": [{
            "rule": "remove-debugger",
            "message": "Unexpected \"debugger\" statement",
            "position": {
                "line": 3,
                "column": 0
            }
        }]
    }],
    "filesCount": 1,
    "errorsCount": 1
}
```

## License

MIT
