


const MyInput = forwardRef(function MyInput(props, ref) {
  return <input {...props} ref={ref} />;
});

const MyInput2 = forwardRef(function MyInput({value}, ref) {
  return <input value={value} ref={ref} />;
});

