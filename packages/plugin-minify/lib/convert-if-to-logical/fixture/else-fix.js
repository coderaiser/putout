a ? console.log('hello') : console.log('world');

!a && console.log('x');

a ? (console.log('hello'), console.log('hello')) : (console.log('world'), console.log('world'));

if (a) {
    for (x of z) {}
} else {}

if (a) {
    console.log('z');
} else {
    for (x of z) {}
}
