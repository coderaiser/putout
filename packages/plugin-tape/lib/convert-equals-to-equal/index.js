'use strict';

module.exports.report = () => `Use 't.equal()' instead of 't.equals()''`;

module.exports.replace = () => ({
    't.equals(__a, __b, __c)': 't.equal(__a, __b, __c)',
});
