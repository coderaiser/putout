namespace __putout_processor_wasm {
    function sum1(a: i32, b: i32) {
        local.set(a);
    }
    
    function b(a: i32, b: i32) {
        local.set(a);
    }
}

function sum1(a: i32, b: i32) {
    set_local(a);
}
