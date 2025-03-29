export const report = () => 'Remove useless "notCalled" args';

export const replace = () => ({
    't.notCalled(__a, __array)': 't.notCalled(__a)',
});
