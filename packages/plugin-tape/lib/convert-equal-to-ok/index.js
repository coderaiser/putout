'use strict';

module.exports.report = () => 't.ok should be used instead of t.equal';

module.exports.replace = () => ({
    't.equal(__a, true)': 't.ok(__a)',
    't.equal(__a, true, __b)': 't.ok(__a, __b)',
});

