await hello();
world();

function hello(): Promise<Response> {
    return fetch('/');
}

function world(): Promise.x<string> {
    return 'hello';
}
