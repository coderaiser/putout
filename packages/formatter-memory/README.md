# @putout/putout-formatter-memory [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/formatter-memory.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/formatter-memory "npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/formatter-memory
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/formatter-memory

`putout` formatter shows memory used.

## Install

```
npm i putout @putout/formatter-memory
```

## Usage

```
putout --format memory lib
```

## Options

Formatters takes options, that can be set in `.putout.json` with:

```json
{
    "formatter": ["memory", {
        "minCount": 0,
        "color": "#6fbdf1"
    }]
}
```

## Env

- `PUTOUT_PROGRESS_BAR`:
  - `0` - disable
  - `1` - enable

## License

MIT

