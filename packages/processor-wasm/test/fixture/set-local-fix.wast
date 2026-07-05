(module
    ;; this statement exports the function to the host environment
    (func $add (export "add") (param $a i32) (param $b i32) (result i32)
        (i32.add (local.set $b) (local.set $a))
    )
)
