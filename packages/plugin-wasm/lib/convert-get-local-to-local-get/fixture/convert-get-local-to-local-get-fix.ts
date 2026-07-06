namespace __putout_processor_wasm {
    function sum1(a: i32, b: i32) {
        local.get(a);
        local.get(b);
        i32.add();
    }
    
    function sum2(a: i32, b: i32) {
        i32.add(local.get(a), local.get(b));
    }
}

function sum1(a: i32, b: i32) {
    get_local(a);
    get_local(b);
    i32.add();
}
