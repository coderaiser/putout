await hello();
world();

function hello() {
    return fetch('/');
}

function world() {
    return 'hello';
}
