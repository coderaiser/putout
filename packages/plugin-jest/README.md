# @putout/plugin-jest [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-jest.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-jest"npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/jest?path=packages/plugin-jest
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/jest.svg?path=packages/plugin-jest

`jest` plugin helps to migrate to [latest](https://jestjs.io/blog/2021/05/25/jest-27) [jest](https://jestjs.io/) API.

## Install

```
npm i @putout/plugin-jest -D
```

## Rules

```json
{
    "rules": {
        "jest": "on"
    }
}
```

### ❌ Incorrect code example

```js
jest.addMatchers({
    fail: (a, b, c) => {
        return {
            pass: false,
        };
    },
});

jest.resetModuleRegistry();
jest.runTimersToTime(1000);
```

### ✅ Correct code Example

```js
expect.extend({
    fail: (a, b, c) => {
        return {
            pass: false,
        };
    },
});

jest.resetModules();
jest.advanceTimersByTime(1000);
```

## License

MIT
