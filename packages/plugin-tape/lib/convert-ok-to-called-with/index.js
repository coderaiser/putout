'use strict';

const {operator} = require('putout');
const {compare} = operator;

module.exports.report = (path) => {
    if (compare(path, 't.ok(__args)'))
        return `Use 't.calledWith()' instead of 't.ok()'`;
    
    return `Use 't.notCalledWith()' instead of 't.notOk()'`;
};

module.exports.replace = () => ({
    't.ok(__a.calledWith(__args))': 't.calledWith(__a, [__args])',
    't.ok(__a.calledWith(__args), __b)': 't.calledWith(__a, [__args], __b)',
    
    't.ok(__a.calledWith(...__b))': 't.calledWith(__a, __b)',
    't.ok(__a.calledWith(...__b), __c)': 't.calledWith(__a, __b, __c)',
    
    't.notOk(__a.called, __b)': 't.notCalled(__a, __b)',
    't.ok(__a.calledWith(), __b)': 't.calledWithNoArgs(__a, __b)',
});
