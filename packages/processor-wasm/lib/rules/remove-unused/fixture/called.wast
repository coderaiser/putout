(module
    (func $one (result i32)
        i32.const 1
    )

    (func $oneTwo (result i32 i32)
        (call $one)
        i32.const 2
    )
    
    (export "theAnswer" (func $oneTwo))
)
