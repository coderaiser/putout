# @putout/plugin-extract-keywords-from-variables [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-extract-keywords-from-variables.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-extract-keywords-from-variables "npm"

> The JavaScript exceptions "unexpected token" occur when the parser does not see a token it recognizes at the given position, so it cannot make sense of the structure of the program. This might be a simple typo.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Unexpected_token)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to extract `keywords` from variables. Check out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/fcaedaa9daf7f3a771274aca0da9ab1b/4496811b3f092b8124703fd69c84c51be86cf90a).

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
