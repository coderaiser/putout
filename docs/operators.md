# 🐃 Operators

Operator - is main building block for 🐊**Putout** plugins. When same logic repeated in couple plugins it is moved out to `operator` to avoid duplication and reuse logic. When you need something specific, most likely it is already implemented as operator.

## `declare`

When you need to `declare` something specific, no need to implement this logic again and again: just use `@putout/operator-declare`. This logic already implemented in next plugins:

- ✅ [declare](https://github.com/coderaiser/putout/tree/master/packages/plugin-declare#readme)
- ✅ [tape/declare](https://github.com/coderaiser/putout/tree/master/packages/plugin-tape#declare)
- ✅ [putout/declare](https://github.com/coderaiser/putout/tree/master/packages/plugin-putout#declare)
- ✅ [nodejs/declare](https://github.com/coderaiser/putout/blob/master/packages/plugin-montag/#declare)
- ✅ [react-hooks/declare](https://github.com/coderaiser/putout/blob/master/packages/plugin-react-hooks/README.md#declare)
- ✅ [try-catch/declare](https://github.com/coderaiser/putout/blob/master/packages/plugin-try-catch/#declare)
- ✅ [montag/declare](https://github.com/coderaiser/putout/blob/master/packages/plugin-montag/#declare)
- ✅ [madrun/declare](https://github.com/coderaiser/putout/blob/master/packages/plugin-madrun/#declare)
- ✅ [maybe/declare](https://github.com/coderaiser/putout/tree/master/packages/plugin-maybe#declare)

This is so common type of plugin that there is type of plugin called [`Declarator`](https://github.com/coderaiser/putout/tree/master/packages/engine-runner#Declarator) it is appeared in 🐊[**Putout v29**](https://github.com/coderaiser/putout/releases/tag/v29.0.0/).

## Built-in operators

Here is list of built-in operators

| Package | Version |
|--------|-------|
| [`@putout/operate`](/packages/operate#readme) | [![npm](https://img.shields.io/npm/v/@putout/operate.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/operate) |
| [`@putout/operator-add-args`](/packages/operator-add-args#readme) | [![npm](https://img.shields.io/npm/v/@putout/operator-add-args.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/operator-add-args) |
| [`@putout/operator-declare`](/packages/operator-declare#readme) | [![npm](https://img.shields.io/npm/v/@putout/operator-declare.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/operator-declare) |
| [`@putout/operator-filesystem`](/packages/operator-filesystem#readme) | [![npm](https://img.shields.io/npm/v/@putout/operator-filesystem.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/operator-filesystem) |
| [`@putout/operator-find-file-up`](/packages/operator-find-file-up#readme) | [![npm](https://img.shields.io/npm/v/@putout/operator-find-file-up.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/operator-find-file-up) |
| [`@putout/operator-ignore`](/packages/operator-ignore#readme) | [![npm](https://img.shields.io/npm/v/@putout/operator-ignore.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/operator-ignore) |
| [`@putout/operator-json`](/packages/operator-json#readme) | [![npm](https://img.shields.io/npm/v/@putout/operator-json.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/operator-json) |
| [`@putout/operator-jsx`](/packages/operator-jsx#readme) | [![npm](https://img.shields.io/npm/v/@putout/operator-jsx.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/operator-jsx) |
| [`@putout/operator-keyword`](/packages/operator-keyword#readme) | [![npm](https://img.shields.io/npm/v/@putout/operator-keyword.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/operator-keyword) |
| [`@putout/operator-match-files`](/packages/operator-match-files#readme) | [![npm](https://img.shields.io/npm/v/@putout/operator-match-files.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/operator-match-files) |
| [`@putout/operator-parens`](/packages/operator-parens#readme) | [![npm](https://img.shields.io/npm/v/@putout/operator-parens.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/operator-parens) |
| [`@putout/operator-regexp`](/packages/operator-regexp#readme) | [![npm](https://img.shields.io/npm/v/@putout/operator-regexp.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/operator-regexp) |
| [`@putout/operator-rename-files`](/packages/operator-rename-files#readme) | [![npm](https://img.shields.io/npm/v/@putout/operator-rename-files.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/operator-rename-files) |
| [`@putout/operator-rename-properties`](/packages/operator-rename-properties#readme) | [![npm](https://img.shields.io/npm/v/@putout/operator-rename-properties.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/operator-rename-properties) |
| [`@putout/operator-remove-files`](/packages/operator-remove-files#readme) | [![npm](https://img.shields.io/npm/v/@putout/operator-remove-files.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/operator-remove-files) |
| [`@putout/operator-sort-ignore`](/packages/operator-sort-ignore#readme) | [![npm](https://img.shields.io/npm/v/@putout/operator-sort-ignore.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/operator-sort-ignore) |
| [`@putout/operator-watermark`](/packages/operator-watermark#readme) | [![npm](https://img.shields.io/npm/v/@putout/operator-watermark.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/operator-watermark) |
