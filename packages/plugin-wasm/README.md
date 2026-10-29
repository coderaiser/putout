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
- ✅ [convert-set-local-to-local-set](#convert-set-local-to-local-set);
- ✅ [remove-unused](#remove-unused);

## Config

```json
{
    "rules": {
        "wasm/apply-nesting": "on",
        "wasm/convert-get-local-to-local-get": "on",
        "wasm/convert-set-local-to-local-set": "on",
        "wasm/remove-unused": "on"
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

### convert-set-local-to-local-set

> The `local.set` instruction returns the value of the local at index `$id` in the locals vector of the current function execution. The type parameter is bound to the type of the local.
>
> (c) [Wasm Reference Manual](https://github.com/sunfishcode/wasm-reference-manual/blob/master/WebAssembly.md#set-local)

`set_local` is DEPReCATED.

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/629581ade8233839b6ed5484c5e2e345/1d83a197eb511cfc8859845f35fad4f3282e5783).

```diff
-set_local $a
+local.set $a
```

### remove-unused

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/2cb80fb438d251ce9e8d9b2ba3d2929e/fd7f6419123b7f86a5eaaa426dd19fbdaceafb14).

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

## License

MIT
