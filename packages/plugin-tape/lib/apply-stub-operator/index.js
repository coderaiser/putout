'use strict';

module.exports.report = () => 'Stub operator should be used';

module.exports.replace = () => ({
    't.ok(__a.calledWith(__b))': 't.calledWith(__a, [__b])',
    't.ok(__a.calledWith(__b, __c))': 't.calledWith(__a, [__b, __c])',
    't.ok(__a.calledWith(...__b))': 't.calledWith(__a, __b)',
    't.ok(__a.calledWith(__b), __c)': 't.calledWith(__a, [__b], __c)',
    't.ok(__a.calledWith(__b, __c), __d)': 't.calledWith(__a, [__b, __c], __d)',
    't.ok(__a.calledWith(...__b), __c)': 't.calledWith(__a, __b, __c)',
});
