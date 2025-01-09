# @putout/plugin-remove-useless-functions [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-functions.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-functions "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to find and remove `useless functions`.

## Install

```
npm i @putout/plugin-remove-useless-functions -D
```

## Rule

```json
{
    "rules": {
        "remove-useless-functions": "on"
    }
}
```

## ❌ Example of incorrect code

```js
const y = (...a) => {
    alert(...a);
};

[1, 2, null].filter((a) => a);
```

## ✅ Example of correct code

```js
const y = alert;
[1, 2, null].filter(Boolean);
```

## Open Questions

Why there is no transform for such case:

```js
const f = (a) => alert(a);
```

Isn't is the same as:

```js
const f = alert;
```

Actually it is the same, and this example can be converted without an issue,
but there is also cases like:

```js
const one = (f) => (a) => f(a);

[
    1,
    2,
    3,
    4,
].map(one(console.log));

// output
1;
2;
3;
```

And if it will be simplified:

```js
const one = (f) => f;

[
    1,
    2,
    3,
    4,
].map(one(console.log));

// output
'1 0 [1, 2, 3]';
'2 1 [1, 2, 3]';
'3 2 [1, 2, 3]';
```

So behaviour is totally different. The same result for:

```js
[
    1,
    2,
    3,
    4,
].map(console.log);
```

Because `map` calls a function with 3 arguments, and `console.log` receives any count of arguments,
to cut redundant args there is a need to use something like:

```js
const one = (f) => (a) => f(a);
```

There is a lot such cases in the wild. While we have no syntax to set the count of `arguments` we are going to receive,
and a way to avoid returning result we don't want function to return, there is no need in such a dengerous transform.

## License

MIT
