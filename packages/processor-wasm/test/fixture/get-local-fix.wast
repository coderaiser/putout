(module
  ;; this is simple function that adds a couple of parameters

  (func $add (param $a i32) (param $b i32) (result i32)
    (i32.add (local.get $a) (local.get $b))
  )
  ;; this statement exports the function to the host environment

  (export "add" (func $add))
)
