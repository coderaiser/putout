# @putout/formatter-progress-bar [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/formatter-progress-bar.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/formatter-progress-bar "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) formatter shows progress bar.

## Install

```
npm i putout @putout/formatter-progress-bar
```

## Usage

```
putout --format progress-bar lib
```

## Options

Formatters takes options, that can be set in `.putout.json` with:

```json
{
    "formatter": ["progress-bar", {
        "minCount": 0,
        "color": "#6fbdf1"
    }]
}
```

## Env variables

`PUTOUT_PROGRESS_BAR` - could be used to disable or enable `progress bar` using `0` and `1`.

## License

MIT
