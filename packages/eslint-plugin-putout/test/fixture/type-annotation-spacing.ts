// with no spaces
let foo:string = "bar";

// with spaces before and after the fat arrow (default if no option is specified)
type Foo = (string :name)=> string;

const fn : Foo = (a) => a;
fn(foo);
