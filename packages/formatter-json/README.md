# putout-formatter-json [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/formatter-json.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/formatter-json "npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/formatter-json
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/formatter-json

`putout` formatter output json on end.

## Install

```
npm i putout @putout/formatter-json -g
```

## Usage

```sh
putout --format json lib
```

Result example:

```json
{
    "errors": [
        {
            "name": "/home/coderaiser/putout/packages/putout/lib/putout.js",
            "places": [
                {
                    "rule": "remove-debugger",
                    "message": "Unexpected \"debugger\" statement",
                    "position": {
                        "line": 3,
                        "column": 0
                    }
                }
            ]
        }
    ],
    "filesCount": 1,
    "errorsCount": 1
}
```

## License

MIT

