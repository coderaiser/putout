test('', (t, {expectedArg}) => {
    t.deepEqual(result, expected);
    t.deepEqual(result, expectedArg);
});
