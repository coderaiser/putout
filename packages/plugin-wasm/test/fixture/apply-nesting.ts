namespace __putout_processor_wasm {
    export function add(a: i32, b: i32) {
        get.local(a);
        get.local(b);
        i32.add();
    }
}

export function add(a: i32, b: i32) {
        get.local(a);
        get.local(b);
        i32.add();
    }