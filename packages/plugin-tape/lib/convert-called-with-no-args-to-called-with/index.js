'use strict';

module.exports.report = () => '"calledWithArgs" should be used when arguments are present';

module.exports.replace = () => ({
    't.calledWithNoArgs(__a, __array)': 't.calledWith(__a, __array)',
    't.calledWithNoArgs(__a, __array, __b)': 't.calledWith(__a, __array, __b)',
});

