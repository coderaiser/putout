namespace __putout_processor_wasm {
    export function oneTwo(): i32 {
        i32.const(2);
    }
}

function oneTwo(): i32 {
    one();
    i32.const(2);
}
