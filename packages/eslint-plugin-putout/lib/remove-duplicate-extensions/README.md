# remove-duplicate-extension

Check if path has duplicate extension `.js.js` can be resolved and fix if cannot.
Duplicates can happen when **IDE** like **WebStorm** inserts filename and mistakenly adds duplicate.

Part of [`eslint-plugin-putout`](https://github.com/coderaiser/putout/tree/master/packages/eslint-plugin-putout#rules).

## ❌ Example of incorrect code

```js
import x from './y.js.js';
export * from './y.js.js';
export * as dir from './dir.js.js';
export {m} from './y.js.js';
```

## ✅ Example of correct code

```js
import x from './y.js';
export * from './y.js';
export * as dir from './dir.js';
export {m} from './y.js';
```
