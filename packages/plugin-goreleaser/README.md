# @putout/plugin-goreleaser [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-goreleaser.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-goreleaser "npm"

> Release engineering, simplified.
>
> (c) <https://goreleaser.com>

🐊[**Putout**](https://github.com/coderaiser/putout) plugin helps with [**GoReleaser**](https://goreleaser.com/).

## Install

```
npm i @putout/plugin-goreleaser -D
```

## Rules

- ✅ [apply-formats](#add-continue-on-error-to-add-and-commit);

## Config

```json
{
    "rules": {
        "gorelease/apply-formats": "on"
    }
}
```

## apply-formats

> Format was renamed to formats, and now accepts a list of formats.
>
> (c) [goreleaser.com](https://goreleaser.com/resources/deprecations/#archivesformat)

Checkout int 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/e1cc1210ed78cd95a4156afe210bdf34/8ee05a3106b8b7ecdb5e6b05f2b121c0618fa6f9).

```diff
archives:
- - format: zip
+ - format_overrides:
+     - formats: ["zip"]
```

## License

MIT
