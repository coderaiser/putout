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

## `ignore`

[`@putout/operator-ignore`](/packages/operator-ignore#readme) builds plugins that add missing entries to ignore lists (`.gitignore`, `.npmignore`, etc.).

The `ignore()` function takes options (`name`, `list`, `type`, `property`) and returns a plugin using `PutoutPlugin` (from `putout`). The `fix()` helper inserts new names and removes replaced entries.

It powers:
- ✅ [gitignore](https://github.com/coderaiser/putout/tree/master/packages/plugin-gitignore#readme)
- ✅ [npmignore](https://github.com/coderaiser/putout/tree/master/packages/plugin-npmignore#readme)
- ✅ [docker](https://github.com/coderaiser/putout/tree/master/packages/plugin-docker#readme)

## Built-in operators

Here is list of built-in operators

| Package | Version |
|---------|---------|
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
| [`@putout/operator-type-checker`](/packages/operator-type-checker#readme) | [![npm](https://img.shields.io/npm/v/@putout/operator-type-checker.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/operator-type-checker) |

## TypeScript Support

TypeScript type annotations help catch bugs early and provide better IDE autocompletion.
Every operator should expose its types and validate them with `check-dts`.

### Requirements

Each operator package must include:

| # | Artifact          | Description                                                                        |
|---|-------------------|------------------------------------------------------------------------------------|
| 1 | `lib/<name>.d.ts` | TypeScript declaration file exporting all public function signatures               |
| 2 | `test/errors.ts`  | A `check-dts` test that verifies type errors for invalid calls                     |
| 3 | `.madrun.js`      | A `test:dts` script: `'test:dts': () => 'check-dts test/*.ts'`                     |
| 4 | `package.json`    | `check-dts` in `devDependencies` and `test:dts` in `scripts` (via `madrun --init`) |

### Type declaration file (`lib/<name>.d.ts`)

- Import types from `@putout/babel` (e.g. `Node`, `NodePath`)
- When a function returns a plugin object (`report`, `traverse`, `fix`), use `import type {PutoutPlugin} from 'putout'`
- Declare each export with full type signatures
- Use `typeof` for aliases (e.g. `export const superTraverse: typeof traverse`)

### Test file (`test/errors.ts`)

- Import every exported function from the JS module (e.g. `'../lib/traverse.js'`)
- Call each function with an invalid argument (e.g. a number `5`)
- Annotate each call with `// THROWS <expected error message>`
- Add a blank line before each `// THROWS` comment for readability
- Test at least:

### Integration in `putout`

The `putout` package re-exports all operator functions via `lib/operator.js`.
Types are re-exported via `types/operator.ts`.

To add a new operator's types to 🐊**Putout**:

1. Add `export * from '@putout/<name>'` to `types/operator.ts`
2. Add destructured imports and `// THROWS` checks to `test/operator.errors.ts`

### Validation

Run both the regular tests and the type tests to validate:

```
redrun test:dts
redrun test
```

### Example

For `@putout/traverse`:

```ts
// lib/traverse.d.ts
import {Node, NodePath} from '@putout/babel';

type Visitor = Record<string, (path: NodePath, variables?: Record<string, Node>) => void>;

export function traverse(path: Node | NodePath | {
    node: Node;
}, visitor: Visitor): void;
export const superTraverse: typeof traverse;
export function contains(path: Node | NodePath | {
    node: Node;
}, items: string[]): boolean;
```

```ts
// test/errors.ts
import {
    traverse,
    superTraverse,
    contains,
} from '../lib/traverse.js';

// THROWS Expected 2 arguments, but got 1
traverse(5);

// THROWS Expected 2 arguments, but got 1
superTraverse(5);

// THROWS Expected 2 arguments, but got 1
contains(5);
```

For `@putout/operator-ignore` (plugin return type):

```ts
// lib/ignore.d.ts
import {NodePath} from '@putout/babel';
import type {PutoutPlugin} from 'putout';

type IgnoreOptions = {
    name: string;
    list: string[];
    type?: string;
    property?: string;
};

export function ignore(options: IgnoreOptions): PutoutPlugin;
export function fix(options: {
    path: NodePath;
    name: string;
    matchedElements: NodePath[];
}): void;
```

```ts
// test/errors.ts
import {ignore, fix} from '../lib/ignore.js';

// THROWS Argument of type 'number' is not assignable to parameter of type 'IgnoreOptions'
ignore(5);

ignore({
    name: '.npmignore',
    // THROWS Type 'string' is not assignable to type 'string[]'.
    list: 'hello',
});

// THROWS Argument of type 'number' is not assignable to parameter of type
fix(5);
```
