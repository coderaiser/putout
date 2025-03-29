export const report = () => '"result" should be before "expected"';

export const replace = () => ({
    't.equal(expected, __a)': 't.equal(__a, expected)',
    't.equal(expected, __a, __b)': 't.equal(__a, expected, __b)',
    't.deepEqual(expected, __a)': 't.deepEqual(__a, expected)',
    't.deepEqual(expected, __a, __b)': 't.deepEqual(__a, expected, __b)',
});
