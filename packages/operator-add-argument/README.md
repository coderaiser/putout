# @putout/operator-add-argument [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/operator-add-argument.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/operator-add-argument "npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/operator-add-argument
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/putout.svg?path=packages/operator-add-argument

`putout` operator adds ability to add-argument variable that was not defined before:

## Install

```
npm i putout @putout/operator-add-argument
```

## API

If you want to create `putout plugin` that will add-argument variables according to your needs just:

```js
const {
    operator,
    addArgument,
} = require('putout');

module.exports = addArgument({
    comparePlaces: ['{comparePlaces}', 'test("__a", (__args) => __body)'],
});
```
If you have a file `index.spec.js`:

```diff
-test('', () => {
+test('', ({comparePlaces}) => {
    comparePlaces();
});
```

## License

MIT
