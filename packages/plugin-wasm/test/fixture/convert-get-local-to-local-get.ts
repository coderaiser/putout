function sum1(a: i32, b: i32) {
    get_local(a);
    get_local(b);
    i32.add();
}


// this statement exports the function to the host environment
function sum2(a: i32, b: i32) {
    i32.add(get_local(a), get_local(b));
}