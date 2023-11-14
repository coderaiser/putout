# @putout/operator-json [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/operator-json.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/operator-json "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) operator adds ability to lint json.

## Install

```
npm i putout @putout/operator-json
```

## API

### `__json`

```js
export const traverse = ({push}) => ({
    [__json]: push,
});
```

### `__filesystem`

```js
export const traverse = ({push}) => ({
    [__filesystem]: (path) => {
        push(path);
    },
});
```

### `toJS(source: string, name?: string)`;

```js
toJS('{"hello": "world"}');
// returns
`__putout_processor_json('{"hello": "world"});`;

toJS('{"hello": "world"}', __filesystem);
// returns
`__putout_processor_filesystem('{"hello": "world"});`;
```

### `fromJS(source: string, name?: string)`;

```js
fromJS(`__putout_processor_json('{"hello": "world"}'`);
// returns
`{"hello": "world"}`;
```

## License

MIT
