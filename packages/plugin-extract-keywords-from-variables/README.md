# @putout/plugin-extract-keywords-from-variables [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-extract-keywords-from-variables.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-extract-keywords-from-variables "npm"

> The JavaScript exceptions "unexpected token" occur when the parser does not see a token it recognizes at the given position, so it cannot make sense of the structure of the program. This might be a simple typo.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Unexpected_token)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to extract `keywords` from variables. Check out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/785d072fc20d0a3854f6ced093918b06/483b359357ebc04232f4a321bd3db627dc6a15cb).

## Install

```
npm i @putout/plugin-extract-keywords-from-variables -D
```

## Rule

```json
{
    "rules": {
        "extract-keywords-from-variables": "on"
    }
}
```

```diff
-export const isTemplateMiddle = (a) => a?.type === 'TemplateMiddle',
+export const isTemplateMiddle = (a) => a?.type === 'TemplateMiddle';
export const isTemplateTail = (a) => a?.type === 'TemplateTail';
```

## License

MIT
