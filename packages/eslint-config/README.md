# @putout/eslint-config [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/eslint-config.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/eslint-config "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) config for **ESLint**. If 🐊**Putout** brakes formatting **ESLint** will fix it back 😉.

## Install

```
npm i @putout/eslint-config eslint madrun -D
```

## Usage

Create file `.eslintrc.json` in root of your project with content:

```json
{
    "extends": [
        "@putout"
    ]
}
```

Add `scripts` section to `package.json`:

```json
{
    "scripts": {
        "lint": "madrun lint",
        "fix:lint": "madrun fix:lint"
    }
}
```

And create [`.madrun.mjs`](https://github.com/coderaiser/madrun):

```js
import {series} from 'madrun';

export default {
    'lint': () => 'putout lib test',
    'fix:lint': () => run('lint', '--fix'),
};
```

```sh
$ npm run lint
$ npm run fix:lint

```

## License

MIT
