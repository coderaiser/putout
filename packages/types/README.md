# @putout/types [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/types.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/types "npm"

## Install

```
npm i @putout/types
```

## TypeScript Support

Every 🐊**Putout** operator ships TypeScript types written by TDD for types. Write a `.d.ts` and a `test/errors.ts`, validate with `check-dts`.

### Quick start

Add `test:dts` script to `.madrun.js` then to update `package.json` run:

```sh
madrun --init
```

Add `check-dts` to devDependencies with `nupdate check-dts -aD`. Then you need:

- `lib/<name>.d.ts` — export function signatures with types
- `test/errors.ts` — call each export with invalid args, mark with `// THROWS`

```sh
redrun test:dts
```

### Example

```ts
// test/errors.ts
import {addArgs} from '../lib/add-args.js';

// THROWS Argument of type 'number' is not assignable to parameter of type 'AddArgsOptions'
addArgs(5);
```

Every `// THROWS` is a test. `check-dts` compiles the file and checks the error matches.

## License

MIT
