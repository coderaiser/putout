namespace __putout_processor_wasm {
    function sum1(a: i32, b: i32) {
        i32.add(local.get(a), local.get(b));
    }
}


// this statement exports the function to the host environment
function sum2(a: i32, b: i32) {
    i32.add(get_local(a), get_local(b));
}
