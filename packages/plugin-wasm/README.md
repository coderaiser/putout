# @putout/plugin-wasm [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-wasm.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-wasm "npm"

> WebAssembly (abbreviated as Wasm) is a low-level bytecode format originally designed for the web.
>
> (c) [MDN.org](https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Concepts)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to improve wasm.

## Install

```
npm i @putout/plugin-wasm -D
```

## Rules

- ✅ [apply-nesting](#apply-nesting);
- ✅ [convert-get-local-to-local-get](#convert-get-local-to-local-get);

## Config

```json
{
    "rules": {
        "wasm/apply-nesting": "on",
        "wasm/convert-get-local-to-local-get": "on"
    }
}
```

### apply-nesting

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/993604e5f66f489d14b268fa3d15a044/49b866b8248256ebcf081e27ea31a0ecb76eecb3).

## ❌ Example of incorrect code

```wast
(module
    (func $add (export "add") (param $a i32) (param $b i32)
        (get.local $a)
        (get.local $b)
        (i32.add)
    )
)
```

## ✅ Example of correct code

```wast
(module
    (func $add (export "add") (param $a i32) (param $b i32)
        (i32.add (get.local $b) (get.local $a))
    )
)
```

### convert-get-local-to-local-get

> The `local.get` instruction returns the value of the local at index `$id` in the locals vector of the current function execution. The type parameter is bound to the type of the local.
>
> (c) [Wasm Reference Manual](https://github.com/sunfishcode/wasm-reference-manual/blob/master/WebAssembly.md#get-local)

`get_local` is DEPRECATED.

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/8f5f7527f22cfc37501da756a0d5f90c/5c6f7cfb39bc0bdae21111c9666bec003a1c5118).

```diff
-get_local $a
+local.get $a
```

## License

MIT
