# no-unresolved

Check if path can be resolved and fix if cannot.
Similar to [`no-unresolved`](https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/no-unresolved.md) from
[`eslint-plugin-import`](https://github.com/import-js/eslint-plugin-import). But supports only `ESM` and have `autofix`.

Part of [`eslint-plugin-putout`](https://github.com/coderaiser/putout/tree/master/packages/eslint-plugin-putout#rules).

[File extension is mandatory](https://nodejs.org/api/esm.html#esm_mandatory_file_extensions) and will produce an error from `node.js`:

```
Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/Users/coderaiser/putout/y' imported from /Users/coderaiser/putout/x.mjs
Did you mean to import ../y.js?
```

## ❌ Example of incorrect code

```js
import x from './y';
import dir from './dir';

export * from './y';
export * as dir from './dir';
export {m} from './y';
```

## ✅ Example of correct code

```js
import x from './y.js';
import dir from './dir/index.js';

export * from './y.js';
export * as dir from './dir/index.js';
export {m} from './y.js';
```
