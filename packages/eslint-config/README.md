# @putout/eslint-config [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/eslint-config.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/eslint-config "npm"

[🐊`Putout`](https://github.com/coderaiser/putout) config for `eslint`. If `putout` brokes formatting `eslint` will fix it 😉.

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

And create file [madrun file](https://github.com/coderaiser/madrun) `.madrun.js`:

```js
const {series} = require('madrun');

module.exports = {
    'eslint': () => `eslint lib test`,
    'putout': () => `putout lib test`,
    'lint': () => series(['putout', 'eslint']),
    'fix:lint': () => series(['putout', 'eslint'], '--fix'),
};
```

```sh
$ npm run lint
$ npm run lint:fix

```

## License

MIT

