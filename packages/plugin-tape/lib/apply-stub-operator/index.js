'use strict';

module.exports.report = () => 'Use Stub operator';

module.exports.replace = () => ({
    't.ok(__a.calledWith(__b))': 't.calledWith(__a, [__b])',
    't.ok(__a.calledWith(__b, __c))': 't.calledWith(__a, [__b, __c])',
    't.ok(__a.calledWith(...__b))': 't.calledWith(__a, __b)',
    't.ok(__a.calledWith(__b), __c)': 't.calledWith(__a, [__b], __c)',
    't.ok(__a.calledWith(__b, __c), __d)': 't.calledWith(__a, [__b, __c], __d)',
    't.ok(__a.calledWith(...__b), __c)': 't.calledWith(__a, __b, __c)',
    't.notOk(__a.called, __b)': 't.notCalled(__a, __b)',
    't.ok(__a.calledWith(), __b)': 't.calledWithNoArgs(__a, __b)',
});
