'use strict';

module.exports.report = () => `Use 'calledWithNoArgs()' when arguments are absent`;

module.exports.replace = () => ({
    't.calledWith(__a)': 't.calledWithNoArgs(__a)',
    't.calledWith(__a, [])': 't.calledWithNoArgs(__a)',
    't.calledWith(__a, [], __b)': 't.calledWithNoArgs(__a, __b)',
});
