'use strict';

module.exports.report = () => '"test.only" should not be used';

module.exports.replace = () => ({
    '_a.only(_b, _c)': '_a(_b, _c)',
    '_a["only"](_b, _c)': '_a(_b, _c)',
});

