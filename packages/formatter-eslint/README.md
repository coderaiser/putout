# @putout/formatter-eslint [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/formatter-eslint.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/formatter-eslint "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) formatter for using **ESLint** formatters.

## Install

```
npm i putout @putout/formatter-eslint
```

## Usage

To output results in **ESLint** format use:

```sh
putout --format eslint lib
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

To use `eslint formatter` set it with help of env variable `ESLINT_FORMATTER`.
For example to use `eslint-formatter-pretty` run:

```sh
ESLINT_FORMATTER=pretty putout --format eslint lib
```

## License

MIT
