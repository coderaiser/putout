# Putout [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

[NPMIMGURL]: https://img.shields.io/npm/v/putout.svg?style=flat&longCache=true

[BuildStatusIMGURL]: https://img.shields.io/travis/coderaiser/putout/master.svg?style=flat&longCache=true

[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/putout.svg?path=packages/putout

[NPMURL]: https://npmjs.org/package/putout "npm"

[BuildStatusURL]: https://travis-ci.org/coderaiser/putout "Build Status"

[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/putout "Dependency Status"

[CoverageURL]: https://coveralls.io/github/coderaiser/putout?branch=master

[CoverageIMGURL]: https://coveralls.io/repos/coderaiser/putout/badge.svg?branch=master&service=github

Putout is a tool for identifying, reporting and fixing patterns found in JavaScript/JSX/Typescript/Flow code. It can:

- remove unused `variables`;
- remove unused `for-of variables`;
- remove unused `typescripts` types;
- remove unreferenced `variables`;
- remove unused `private fields`;
- remove unused `expressions`;
- remove useless `variables`;
- remove useless `type convertion`;
- remove useless `functions`;
- remove useless `Array.from`;
- remove useless `spread`;
- remove useless `arguments`;
- remove useless `escape`;
- remove useless `async`;
- remove useless `await`;
- remove useless `typeof`;
- remove useless `template expressions`;
- remove useless `for-of`;
- remove `debugger` statement;
- remove `iife`;
- remove nested blocks;
- remove `process.exit` call;
- remove `console.log` calls;
- remove `empty block statements`;
- remove `empty patterns`;
- remove `strict mode` directive from `esm`;
- remove `constant conditions`;
- remove `boolean` from `logical expressions`;
- remove `double negations`;
- remove `unreachable code`;
- remove `duplicate keys`;
- remove useless `typescripts` types;
- remove duplicate `interface keys` for `typescript` (disabled, because of additional `semicolon`);
- replace `test.only` to `test` calls;
- replace `test.skip` to `test` calls;
- reuse duplicate `init`;
- split `variable declarations`;
- split `nested destructuring`;
- simplify ternary;
- if absent `strict mode` directive in `commonjs` add it;
- convert `esm` to `commonjs` (disabled);
- convert `commonjs` to `esm` (disabled);
- convert `template` with one `expression` to `string`;
- convert `equal` to `strict equal`;
- convert `indexOf` to `includes`;
- apply destructuring;
- apply `top-level await` (disabled, [stage 3](https://github.com/tc39/proposal-top-level-await));
- convert `throw` statement into expression (disabled, [stage 2](https://github.com/tc39/proposal-throw-expressions));
- apply shorthand properties;
- apply `optional chaining` (disabled [stage4](https://github.com/tc39/proposal-optional-chaining));
- apply `nullish coalescing` (disabled [stage4](https://github.com/tc39/proposal-nullish-coalescing));
- apply `numeric separators` ([stage4](https://github.com/tc39/proposal-numeric-separator));
- merge destructuring properties;
- merge duplicate imports;
- merge `if` statements;
- convert `Math.pow` to `exponentiation operator`;
- convert `anonymous` to `arrow function`;
- convert `for` to `for-of`;
- convert `forEach` to `for-of`;
- convert `for-in` to `for-of`;
- convert `apply` to `spread`;
- convert `arguments` to `rest`;
- convert `Object.assign` to `merge spread`;
- convert `binary expression` to `boolean`;
- convert `top-level return` into `process.exit()`;
- convert `array copy` to `slice`;
- convert typescripts' generic `<Array>` to shorthand `[]`;
- extract sequence expressions;
- extract object properties;
- add `return await`;
- remove useless `Promise.resolve`;
- convert `Promise.reject` to `throw`;

## Why?

- because [eslint](https://eslint.org) avoids [fixes that could change the runtime behavior](https://eslint.org/docs/developer-guide/working-with-rules#applying-fixes).
- because [babel](https://babeljs.io) produces [throw-away code](https://github.com/babel/babel/issues/5139);
- because [pretier](https://github.com/prettier/prettier) it is a formatter;
- because [jscodeshift](https://github.com/facebook/jscodeshift) has no `config` and `plugins` support.

The main difference of `putout` is saving code transformation results directly into source code in a day-to-day baisis.

## Install

```
npm i putout -D
```

## Usage

```
Usage: putout [options] [path]
Options
   -h, --help                  display this help and exit
   -v, --version               output version information and exit
   -f, --format                use a specific output format - default: progress-bar/dump on CI
   -s, --staged                add staged files when in git repository
   --fix                       apply fixes of errors to code
   --fix-count                 count of fixes rounds (defaults to 10)
   --rulesdir                  use additional rules from directory
   --transform                 apply inline transform
   --plugins                   plugins to use splited by comma
   --enable                    enable rule by name in .putout.json
   --disable                   disable rule by name in .putout.json
   --enable-all                enable all rules in .putout.json
   --disable-all               disable all rules in .putout.json
   --ext                       specify JavaScript file extensions
   --jsx                       enable jsx (try to determine by default)
   --flow                      enable flow
   --no-jsx                    disable jsx
   --no-flow                   disable flow (default)
   --cache                     enable .putoutcache to speed up processing (default)
   --fresh                     generate a fresh .putoutcache
   --no-config                 avoid reading config file (.putout.json)
   --no-ci                     disable CI detection
   --no-cache                  disable .putoutcache
```

To find erros:

```
putout lib test
```

To fix errors:

```
putout lib test --fix
```

## Plugins

By default `putout` uses all enabled by default plugins, anyways it can be run with a couple mentioned plugins (splitted with ","):

```sh
putout lib --plugins remove-debugger,remove-unused-variables
```

## Environment variables

`Putout` supports next `environment variables`:

- `PUTOUT_FILES` - files that should be processed by putout, divided by ",";

```sh
PUTOUT_FILES=lib,test putout --fix
```

## Configuration

To configure create `.putout.json` file and override any of [default options](/packages/putout/putout.json).

### Match

When you need to match paths to rules you can use `match` section for this purpose in `.putout.json`:

```json
{
    "match": {
        "server": {
            "remove-process-exit": true
        }
    }
}
```

### Ignore

When you need to ignore some routes no metter what, you can use `ignore` section in `.putout.json`:

```json
{
    "ignore": [
        "test/fixture"
    ]
}
```

## Plugins

`Putout` supports `plugins`, there is two types: with prefix official `@putout/plugin-` and user plugins with prefix `putout-plugin-`. To use your plugin create plugin as `npm` package with keywords `putout`, `putout-plugin` and add it to `.putout.json`.

For example if you need to `remove-something` create `putout` plugin with name `putout-plugin-remove-something` and it to `package.json`:

```json
{
    "plugins": [
        "remove-something"
    ]
}
```

## Codemods

`putout` supports `codemodes` in the similar to plugins way, just create a directory `~/.putout` and put your plugins there. Here is example: [convert-tape-to-supertape](https://github.com/coderaiser/putout/tree/master/codemods/plugin-convert-tape-to-supertape) and [this is example of work](https://github.com/coderaiser/putout/commit/ad02cebc344ce73cdee668cffc5078bf08830d52).

## API

### putout(source, options)

```js
const putout = require('putout');

const source = `
const t = 'hello';
const m = t + '!';
console.log(t);
`;

putout(source, {
    plugins: [
        'remove-unused-variables',
    ],
});
// returns
`
const t = 'hello';
console.log(t);
`;
```

## License

MIT
