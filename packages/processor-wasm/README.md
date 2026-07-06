# @putout/processor-wasm [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/processor-wasm.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/processor-wasm "npm"

> **WebAssembly** is a low-level assembly-like language with a compact binary format that runs with near-native performance. It designed to run alongside JavaScript, allowing both to work together.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/WebAssembly/)

🐊[**Putout**](https://github.com/coderaiser/putout) processor adds ability to lint `wasm`.

## Install

```
npm i @putout/processor-wasm -D
```

## Usage

```json
{
    "processors": ["wasm"]
}
```

## Rules

### remove-unused

```diff
(module
    (func $one (result i32)
        i32.const 1
    )
    (func $oneTwo (param $y) (result i32 i32)
-       (call $one (local.get $y))
+       (call $one)
        i32.const 2
    )
)
```

### remove-useless-args

```diff
(module
-   (func $answer (result i32)
-       i32.const 0x2A
-   )
)
```

## License

MIT
