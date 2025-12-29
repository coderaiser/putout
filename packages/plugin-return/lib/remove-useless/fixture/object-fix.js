const a = (x) => ({
    'hello': 'world',
}[x]);

const notOk = (result, message = 'should be falsy') => ({
    is: !result,
    expected: false,
    result: result && stringify(result),
    message,
});
