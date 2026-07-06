(module
    (func $one (result i32)
        (i32.const 1)
    )
    (func $oneTwo (export "oneTwo") (result i32 i32)
        (call $one (local.get $y))
        (i32.const 2)
    )
)
