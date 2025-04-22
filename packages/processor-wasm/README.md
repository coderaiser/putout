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

### convert-get-local-to-local-get

> The `local.get` instruction returns the value of the local at index `$id` in the locals vector of the current function execution. The type parameter is bound to the type of the local.
>
> (c) [Wasm Reference Manual](https://github.com/sunfishcode/wasm-reference-manual/blob/master/WebAssembly.md#get-local)

`get_local` is DEPRECATED.

```diff
-get_local $a
+local.get $a
```

### convert-set-local-to-local-set

> The `local.set` instruction returns the value of the local at index `$id` in the locals vector of the current function execution. The type parameter is bound to the type of the local.
>
> (c) [Wasm Reference Manual](https://github.com/sunfishcode/wasm-reference-manual/blob/master/WebAssembly.md#set-local)

`set_local` is DEPReCATED.

```diff
-set_local $a
+local.set $a
```

### apply-nesting

#### ❌ Example of incorrect code

```wast
(func (param $a i32) (param $b i32)
    (get_local $a)
    (get_local $b)
    (i32.add)
)
```

#### ✅ Example of correct code

```wast
(func (param $a i32) (param $b i32)
    (i32.add (get_local $a) (get_local $b))
)
```

### remove-unused

```diff
(module
-   (func $answer (result i32)
-       i32.const 0x2A
-   )
)
```

## License

MIT
