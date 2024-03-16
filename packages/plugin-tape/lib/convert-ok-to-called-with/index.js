'use strict';

module.exports.report = () => `Use 't.calledWith()' instead of 't.ok()'`;

module.exports.replace = () => ({
    't.ok(__a.calledWith(__args))': 't.calledWith(__a, [__args])',
    't.ok(__a.calledWith(__args), __b)': 't.calledWith(__a, [__args], __b)',
    't.ok(__a.calledWith(...__b))': 't.calledWith(__a, __b)',
    't.ok(__a.calledWith(...__b), __c)': 't.calledWith(__a, __b, __c)',
});
