(module
  ;; this is simple function that adds a couple of parameters

  (func (param $a i32) (param $b i32)
    (i32.add (get.local $a) (get.local $b))
  )
  ;; this statement exports the function to the host environment

  (export "add" (func $add))
)
