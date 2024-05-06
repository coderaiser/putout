const MyInput = function MyInput({ref: ref, ...props}) {
    return (
        <input {...props} ref={ref}/>
    );
};

const MyInput2 = function MyInput({ref: ref, value}) {
    return (
        <input value={value} ref={ref}/>
    );
};
