(module
    ;; this statement exports the function to the host environment
    (func $add (export "add") (param $a i32) (param $b i32)
        (i32.add (get.local $b) (get.local $a))
    )
)
