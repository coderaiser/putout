'use strict';

module.exports.report = () => 'Remove useless "notCalled" args';

module.exports.replace = () => ({
    't.notCalled(__a, __array)': 't.notCalled(__a)',
});
