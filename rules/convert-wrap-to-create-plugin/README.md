# @putout/rule-set-commit-type

While writing plugins for **ESLint** using [`createPlugin()`](https://github.com/coderaiser/putout/tree/master/packages/eslint#create-plugin) can help a lot!
Check it out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/9ffe0a9c6a1b128704d6f5f76f1af6d9/ccf504a7556d3ab3f4c9ec40e3d42d9c5e8c0dcc).

```diff
-const wrap = require('./wrap');
-wrap(x);
+const {createPlugin} = require('@putout/eslint/create-plugin');
+createPlugin(x);
```

# License

MIT
