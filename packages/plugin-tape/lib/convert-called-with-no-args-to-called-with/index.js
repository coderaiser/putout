export const report = () => '"calledWithArgs" should be used when arguments are present';

export const replace = () => ({
    't.calledWithNoArgs(__a, __array)': 't.calledWith(__a, __array)',
    't.calledWithNoArgs(__a, __array, __b)': 't.calledWith(__a, __array, __b)',
    't.calledWithNoArgs(__a, __identifier)': 't.calledWith(__a, __identifier)',
    't.calledWithNoArgs(__a, __identifier, __b)': 't.calledWith(__a, __identifier, __b)',
});
