# @putout/formatter-time [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/formatter-time.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/formatter-time "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) formatter shows time used.

## Install

```
npm i putout @putout/formatter-time
```

## Usage

```
putout --format time lib
```

## Options

Formatters takes options, that can be set in `.putout.json` with:

```json
{
    "formatter": ["time", {
        "minCount": 0,
        "color": "#40e0d0",
        "clock": "⏳"
    }]
}
```

## Env

- `PUTOUT_PROGRESS_BAR`:
  - `0` - disable
  - `1` - enable

## License

MIT
