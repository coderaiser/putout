(module
  ;; this is simple function that adds a couple of parameters
  (func (param $a i32) (param $b i32)
    (get_local $a)
    (get_local $b)
    (i32.add)
  )
  
  (func (param $a i32) (param $b i32)
   (i32.add (get_local $a)(get_local $b))
    
  )
  
  ;; this statement exports the function to the host environment
  (export "add" (func $add))
)
