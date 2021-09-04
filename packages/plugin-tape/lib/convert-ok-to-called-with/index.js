'use strict';

module.exports.report = () => `Use 't.calledWith()' instead of 't.ok()'`;

module.exports.replace = () => ({
    't.ok(__a.calledWith(__args))': 't.calledWith(__a, [__args])',
});
