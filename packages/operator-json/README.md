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
import {operator} from 'putout';

const {__json} = operator;

export const traverse = ({push}) => ({
    [__json]: push,
});
```

### `__yaml`

```js
import {operator} from 'putout';

const {__yaml} = operator;

export const traverse = ({push}) => ({
    [__yaml]: push,
});
```

### `__ignore`

```js
import {operator} from 'putout';

const {__ignore} = operator;

export const traverse = ({push}) => ({
    [__ignore]: push,
});
```

### `__filesystem`

```js
import {operator} from 'putout';

const {__filesystem} = operator;

export const traverse = ({push}) => ({
    [__filesystem]: (path) => {
        push(path);
    },
});
```

### `isJSON(source: string)`

```js
isJSON(`__putout_processor_json({"hello": "world"});`);
// returns
true;

isJSON(`hello({"hello": "world"});`);
// returns
false;
```

### `toJS(source: string, name?: string)`;

```js
import {operator} from 'putout';

const {__filesystem, toJS} = operator;
toJS('{"hello": "world"}');
// returns
`__putout_processor_json('{"hello": "world"});`;

toJS('{"hello": "world"}', __filesystem);
// returns
`__putout_processor_filesystem('{"hello": "world"});`;
```

### `fromJS(source: string, name?: string)`;

```js
import {operator} from 'putout';

const {fromJS} = operator;
fromJS(`__putout_processor_json('{"hello": "world"}'`);
// returns
`{"hello": "world"}`;
```

## License

MIT
