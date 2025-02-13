# @putout/plugin-putout-config [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-putout-config.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-putout-config"npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin helps with 🐊[**Putout Config**](https://github.com/coderaiser/putout#-configuration).

## Install

```
npm i @putout/plugin-putout-config -D
```

## Rules

- ✅ [apply-conditions](#apply-conditions);
- ✅ [apply-esm](#apply-esm);
- ✅ [apply-return](#apply-return);
- ✅ [apply-parens](#apply-parens);
- ✅ [apply-for-of](#apply-for-of);
- ✅ [apply-labels](#apply-labels);
- ✅ [apply-math](#apply-math);
- ✅ [apply-nodejs](#apply-nodejs);
- ✅ [apply-optional-chaining](#apply-optional-chaining);
- ✅ [apply-promises](#apply-promises);
- ✅ [apply-tape](#apply-tape);
- ✅ [apply-types](#apply-types);
- ✅ [convert-boolean-to-string](#convert-boolean-to-string);
- ✅ [move-formatter-up](#move-formatter-up);
- ✅ [remove-empty](#remove-empty);
- ✅ [remove-empty-file](#remove-empty-file);
- ✅ [rename-property](#rename-property);
- ✅ [rename-rules](#rename-rules);

## Config

```json
{
    "rules": {
        "putout-config/apply-conditions": "on",
        "putout-config/apply-esm": "on",
        "putout-config/apply-for-of": "on",
        "putout-config/apply-labels": "on",
        "putout-config/apply-math": "on",
        "putout-config/apply-nodejs": "on",
        "putout-config/apply-optional-chaining": "on",
        "putout-config/apply-parens": "on",
        "putout-config/apply-return": "on",
        "putout-config/apply-tape": "on",
        "putout-config/apply-types": "on",
        "putout-config/apply-promises": "on",
        "putout-config/convert-boolean-to-string": "on",
        "putout-config/move-formatter-up": "on",
        "putout-config/remove-empty": "on",
        "putout-config/remove-empty-file": "off",
        "putout-config/rename-rules": "on"
    }
}
```

## apply-return

Apply [`return`](https://github.com/coderaiser/putout/tree/master/packages/plugin-return#readme) according to:

- 🐊[**Putout v38**](https://github.com/coderaiser/putout/releases/tag/v38.0.0):

```diff
{
    "rules": {
-       "apply-early-return": "off",
+       "return/apply-early": "off",
-       "simplify-boolean-return": "off",
+       "return/simplify-boolean": "off",
-       "convert-break-to-return": "off",
+       "return/convert-from-break": "off"
-       "remove-useless-return": "off"
+       "return/remove-useless": "off"
  }
}
```

## apply-esm

Apply [`esm`](https://github.com/coderaiser/putout/tree/master/packages/plugin-esm#readme) according to:

- 🐊[**Putout v37**](https://github.com/coderaiser/putout/releases/tag/v37.0.0):

```diff
{
    "rules": {
-       "remove-empty/import": "on",
-       "remove-empty/export": "on",
+       "esm/remove-empty-import": "on",
+       "esm/remove-empty-export": "on",
-       "convert-assert-to-with": "off",
-       "group-imports-by-source": "on",
-       "declare-imports-first": "on",
-       "remove-quotes-from-import-assertions": "on",
-       "merge-duplicate-imports": "on",
-       "sort-imports-by-specifiers": "on"
+       "esm/convert-assert-to-with": "off",
+       "esm/group-imports-by-source": "on",
+       "esm/declare-imports-first": "on",
+       "esm/remove-quotes-from-import-assertions": "on",
+       "esm/merge-duplicate-imports": "on",
+       "esm/sort-imports-by-specifiers": "on"
  }
}
```

## apply-parens

Apply [`parens`](https://github.com/coderaiser/putout/tree/master/packages/plugin-parens#readme) according to:

- 🐊[**Putout v37**](https://github.com/coderaiser/putout/releases/tag/v37.0.0):

```diff
{
    "rules": {
-       "add-missing-parens": "on"
+       "parens/add-missing": "on"
  }
}
```

## apply-optional-chaining

Apply [`optional-chaining`](https://github.com/coderaiser/putout/tree/master/packages/plugin-optional-chaining#readme) according to:

- 🐊[**Putout v37**](https://github.com/coderaiser/putout/releases/tag/v37.0.0):

```diff
{
    "rules": {
-       "convert-optional-to-logical/assign": "on",
-       "convert-optional-to-logical/call": "off",
+       "optional-chaining/convert-optional-assign-to-logical": "on",
+       "optional-chaining/convert-optional-to-logical": "off"
-       "apply-optional-chaining/assign": "off"
-       "apply-optional-chaining/use": "on"
+       "optional-chaining/convert-logical-assign-to-optional": "off",
+       "optional-chaining/convert-logical-to-optional": "off"
  }
}
```

## apply-conditions

Apply [`conditions`](https://github.com/coderaiser/putout/tree/master/packages/plugin-conditions#readme) according to:

- 🐊[**Putout v29**](https://github.com/coderaiser/putout/releases/tag/v29.0.0):

```diff
{
    "rules": {
-       "apply-comparison-order": "off" ,
-       "apply-if-condition": "off",
-       "convert-comparison-to-boolean": "off",
-       "convert-equal-to-strict-equal": "off",
-       "remove-useless-conditions/evaluate": "off",
-       "remove-useless-conditions/simplify": "off",
-       "convert-comparison-to-boolean": "off",
-       "remove-constant-conditions": "off",
-       "remove-boolean-from-assertions": "off",
+       "conditions/apply-comparison-order": "off",
+       "conditions/apply-if": "off",
+       "conditions/convert-comparison-to-boolean": "off",
+       "conditions/convert-equal-to-strict-equal": "off",
+       "conditions/evaluate": "off"
+       "conditions/simplify": "off",
+       "conditions/convert-comparison-to-boolean": "off",
+       "conditions/remove-constant": "off",
+       "conditions/remove-boolean": "off"
  }
}
```

- 🐊[**Putout v32**](https://github.com/coderaiser/putout/releases/tag/v32.0.0):

```diff
{
    "rules": {
-        "remove-useless-else": "off",
-        "merge-if-statements": "off"
+        "conditions/remove-useless-else": "off",
+        "conditions/merge-if-statements": "off"
    }
}
```

## apply-for-of

Apply [`for-of`](https://github.com/coderaiser/putout/tree/master/packages/plugin-for-of#readme) according to 🐊[**Putout v29**](https://github.com/coderaiser/putout/releases/tag/v29.0.0).

```diff
{
    "rules": {
-       "convert-for-to-for-of": "off",
-       "convert-for-each-to-for-of": "off",
-       "convert-for-in-to-for-of": "off",
-       "convert-map-to-for-of": "off",
-       "remove-useless-for-of": "off",
-       "remove-unused-for-of-variables": "off",
-       "remove-useless-array-from": "off",
-       "remove-useless-variables/for-of": "off"
-       "convert-reduce-to-for-of": "off",
+       "for-of/for": "off",
+       "for-of/for-each": "off",
+       "for-of/for-in": "off",
+       "for-of/map": "off",
+       "for-of/remove-useless": "off",
+       "for-of/remove-unused-variables": "off",
+       "for-of/remove-useless-array-from": "off",
+       "for-of/remove-useless-variables": "off",
+       "for-of/reduce": "off"
    }
}
```

## apply-labels

Apply [`labels`](https://github.com/coderaiser/putout/tree/master/packages/plugin-labels#readme) according to 🐊[**Putout v36**](https://github.com/coderaiser/putout/releases/tag/v36.0.0). Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/9a3493fedfafdb25e86cf76af69dd003/8678f3b271ee6f6d13bceeedbe3b143f34be9f55).

### ❌ Example of incorrect code

```json
{
    "rules": {
        "remove-unused-labels": "on",
        "convert-label-to-object": "on"
    }
}
```

### ✅ Example of correct code

```json
{
    "rules": {
        "labels/remove-unused": "on",
        "labels/convert-to-object": "on"
    }
}
```

## apply-math

Apply [`math`](https://github.com/coderaiser/putout/tree/master/packages/plugin-labels#readme) according to 🐊[**Putout v28**](https://github.com/coderaiser/putout/releases/tag/v28.0.0).

```diff
{
    "rules": {
-        "convert-math-pow": "off",
-        "apply-numeric-separators": "off",
-        "convert-imul-to-multiplication": "off",
-        "convert-sqrt-to-hypot": "off"
+        "math/apply-exponential": "off",
+        "math/apply-numeric-separators": "off",
+        "math/apply-multiplication": "off",
+        "math/convert-sqrt-to-hypot": "off"
    }
}
```

## apply-nodejs

Apply [`nodejs`](https://github.com/coderaiser/putout/tree/master/packages/plugin-nodejs#readme) according to:

- 🐊[**Putout v28**](https://github.com/coderaiser/putout/releases/tag/v33.0.0):

```diff
{
    "rules": {
-       "convert-top-level-return": "off",
+       "nodejs/convert-top-level-return": "off"
-       "remove-process-exit": "off"
+       "nodejs/remove-process-exit": "off"
    }
}
```

- 🐊[**Putout v33**](https://github.com/coderaiser/putout/releases/tag/v33.0.0):

```diff
{
    "rules": {
-    "convert-esm-to-commonjs": "on",
-    "convert-commonjs-to-esm": "on'
+    "nodejs/convert-esm-to-commonjs": "on",
+    "nodejs/convert-commonjs-to-esm": "on'
    }
}
```

- 🐊[**Putout v34**](https://github.com/coderaiser/putout/releases/tag/v34.0.0):

```diff
{
    "rules": {
-       "strict-mode/add-missing": "off",
-       "strict-mode/remove-useless": "off"
+       "nodejs/remove-useless-strict-mode": "off",
+       "nodejs/add-missing-strict-mode": "off"
}
```

## apply-promises

Apply [`promises`](https://github.com/coderaiser/putout/tree/master/packages/plugin-promises#readme) according to:

- 🐊[**Putout v30**](https://github.com/coderaiser/putout/releases/tag/v30.0.0);

```diff
{
    "rules": {
-       "remove-useless-variables/await": "off",
+       "promises/remove-useless-variables": "off"
    }
}
```

## apply-tape

Apply [`tape`](https://github.com/coderaiser/putout/tree/master/packages/plugin-tape#readme) according to:

- 🐊[**Putout v33**](https://github.com/coderaiser/putout/releases/tag/v33.0.0);

### ❌ Example of incorrect code

```json
{
    "rules": {
        "convert-mock-require-to-mock-import": "off"
    }
}
```

### ✅ Example of correct code

```json
{
    "rules": {
        "tape/convert-mock-require-to-mock-import": "off"
    }
}
```

## apply-types

Apply [`types`](https://github.com/coderaiser/putout/tree/master/packages/plugin-types#readme) according to:

- 🐊[**Putout v29**](https://github.com/coderaiser/putout/releases/tag/v29.0.0);

```diff
{
    "rules": {
-       "convert-typeof-to-is-type": "off" ,
-       "remove-useless-type-conversions": "off",
-       "remove-useless-typeof": "off",
-       "apply-is-array": "off",
-       "remove-useless-type-conversion/with-double-negations": "off",
+       "types/convert-typeof-to-is-type": "off",
+       "types/remove-useless-conversion": "off",
+       "types/remove-double-negations": "off",
+       "types/remove-useless-typeof": "off",
+       "types/apply-is-array": "off",
+       "types/remove-double-negations": "off"
  }
}
```

## convert-boolean-to-string

### ❌ Example of incorrect code

```json
{
    "rules": {
        "remove-unused-variables": true,
        "remove-debugger": false
    }
}
```

### ✅ Example of correct code

```json
{
    "rules": {
        "remove-unused-variables": "on",
        "remove-debugger": "off"
    }
}
```

## move-formatter-up

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/48ce05b358a9118250acdc0b35df0fc8/50aeb680193ab4cd5d247e098ff90be8d4092111).

### ❌ Example of incorrect code

```json
{
    "parser": "babel",
    "rules": {
        "remove-unused-variables": "off"
    },
    "formatter": "progress-bar"
}
```

### ✅ Example of correct code

```json
{
    "parser": "babel",
    "formatter": "progress-bar",
    "rules": {
        "remove-unused-variables": "off"
    }
}
```

## remove-empty

### ❌ Example of incorrect code

```json
{
    "rules": {},
    "plugins": [],
    "match": {
        "*.js": {
            "remove-unused-variables": "off"
        }
    }
}
```

### ✅ Example of correct code

```json
{
    "match": {
        "*.js": {
            "remove-unused-variables": "off"
        }
    }
}
```

## remove-empty-file

Checkout in 🐊[**Putout Editor**](https://putout.vercel.app/#/gist/3d4878a71fe3fe5a2676b2f1380bad2e/071b8db5c4c8e00f73b2d6d3ded040d0d64d2977).
When `.putout.json` content is:

```js
{}
```

It has no sense and removed:

```diff
 /
 `-- /
-     `-- .putout.json
```

## rename-rules

Rename rules according to:

- 🐊[**Putout v29**](https://github.com/coderaiser/putout/releases/tag/v29.0.0):

```diff
{
    "rules": {
-       "declare-undefined-variables": "off" ,
+       "declare": "off",
-       "apply-maybe": "off" ,
+       "maybe": "off",
-       "apply-array-at": "off",
+       "apply-at": "off",
    }
}
```

- 🐊[**Putout v26**](https://github.com/coderaiser/putout/releases/tag/v26.0.0):

```diff
{
    "rules": {
-       "strict-mode/add": "off",
-       "strict-mode/remove": "off",
+       "strict-mode/add-missing": "off",
+       "strict-mode/remove-useless": "off",
    }
}
```

## License

MIT
