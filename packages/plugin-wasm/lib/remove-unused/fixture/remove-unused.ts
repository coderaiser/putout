namespace __putout_processor_wasm {
    function one(): i32 {
        i32.const(1);
    }

    export function oneTwo(): i32 {
        i32.const(2);
    }
}

function oneTwo(): i32 {
    one();
    i32.const(2);
}

namespace other {
    function one(): i32 {
        i32.const(1);
    }
}
