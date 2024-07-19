# @putout/cli-validate-args [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/cli-validate-args.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/cli-validate-args"npm"

Validate args and propose the closes variaint found by [fastest-levenshtein](https://www.npmjs.com/package/fastest-levenshtein):

```
Invalid option '--fi'. Perhaps you meant '--fix'`
```

## Install

```
npm i @putout/cli-validate-args
```

## Examples

```js
// validate-args.js
import {validateArgs} from '@putout/cli-validate-args';
import parse from 'yargs-parser';

const argv = process.argv.slice(2);

const yargsConfig = {
    configuration: {
        'strip-aliased': true,
        'strip-dashed': true,
    },
    number: ['fix-count'],
    boolean: ['fix'],
};

const args = parse(argv, yargsConfig);

const error = await validateArgs(args, [
    ...yargsConfig.boolean,
    ...yargsConfig.number,
]);

if (error) {
    console.error(error.message);
    process.exit(1);
}
```

```sh
$ node validate-args.js --fi
Invalid option '--fi'. Perhaps you meant '--fix'`
```

## License

MIT
