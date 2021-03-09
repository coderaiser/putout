await hello();
await world();

function hello(): Promise<string> {
    return Promise.resolve('hello');
}
function world(): Promise.first<string> {
    return Promise.resolve('hello');
}
