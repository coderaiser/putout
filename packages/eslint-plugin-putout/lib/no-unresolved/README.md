# Check if path can be resolved and fix if cannot (`no-unresolved`)

Similar to [`no-unresolved`](https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/no-unresolved.md) from
[`eslint-plugin-putout`](https://github.com/import-js/eslint-plugin-import). But supports only `ESM` and have `autofix`.

## Rule Details

This rule aims to fix `unresolved import`:

Examples of **incorrect** code for this rule:

```js
import x from './y';
import dir from './dir';
```

[File extension is mandatory](https://nodejs.org/api/esm.html#esm_mandatory_file_extensions) and will produce an error from `node.js`:

```
Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/Users/coderaiser/putout/y' imported from /Users/coderaiser/putout/x.mjs
Did you mean to import ../y.js?
```

Examples of **correct** code for this rule:

```js
import x from './y.js';
import dir from './dir/index.js';
```
