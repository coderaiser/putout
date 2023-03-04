# @putout/plugin-jest [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-jest.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-jest "npm"

> Jest is a delightful JavaScript Testing Framework with a focus on simplicity.
>
> (c) [jestjs.io](https://jestjs.io/)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin helps to migrate to [latest](https://jestjs.io/blog/2021/05/25/jest-27) **Jest** API.

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

### ❌ Example of incorrect code

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

### ✅ Example of correct code

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
