# putout-eslint-config [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/eslint-config.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/eslint-config "npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/eslint-config
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/eslint-config

`putout` config for `eslint`. If `putout` brokes fromatting `eslint` will fix it 😉.

## Install

```
npm i @putout/eslint-config eslint redrun -D
```

## Usage

Create file `.eslintrc.json` in root of your project with content:

```json
{
    "extends": [
        "@putout"
    ]
}
```

Add `scripts` section to `package.json`:

```json
{
    "scripts": {
        "lint": "redrun putout eslint",
        "lint:fix": "redrun putout:fix eslint:fix",
        "eslint": "eslint lib",
        "putout": "putout lib",
        "eslint:fix": "eslint lib --fix"
        "putout:fix": "putout lib --fix"
    }
}
```

Run scripts using [redrun](https://github.com/coderaiser/redrun):

```sh
$ redrun lint
$ redrun lint:fix

```

## License

MIT

