const a = (x) => {
    return {
        'hello': 'world',
    }[x];
};

const notOk = (result, message = 'should be falsy') => {
    return {
        is: !result,
        expected: false,
        result: result && stringify(result),
        message,
    };
};
