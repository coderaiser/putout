# @putout/operator-wasm [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/operator-wasm.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/operator-wasm "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) operator adds ability to lint wasm.

## Install

```
npm i putout @putout/operator-wasm
```

## API

### `__wasm`

```js
import {operator} from 'putout';

const {__wasm} = operator;

export const traverse = ({push}) => ({
    [__wasm]: push,
});
```

### `wrapInNamespace(source: string, name?: string)`;

```js
import {montag} from 'montag';
import {operator} from 'putout';

const {wrapInNamespace} = operator;

wrapInNamespace(montag`
    export function add(a: i32, b: i32) {
        i32.add(get.local(b), get.local(a));
    }
`);
// returns
`namespace __putout_processor_wasm {
    export function add(a: i32, b: i32) {
        i32.add(get.local(b), get.local(a));
    }
}`;
```

### `unwrapNamespace(source: string, name?: string)`;

```js
import {montag} from 'montag';
import {operator} from 'putout';

const {unwrapNamespace} = operator;

unwrapNamespace(montag`
    namespace __putout_processor_wasm {
        export function add(a: i32, b: i32) {
            i32.add(get.local(b), get.local(a));
        }
    }
`);
// returns
`export function add(a: i32, b: i32) {
    i32.add(get.local(b), get.local(a));
}`;
```

## License

MIT
