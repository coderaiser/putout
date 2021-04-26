'use strict';

module.exports.report = () => 't.notOk should be used instead of t.equal';

module.exports.replace = () => ({
    't.equal(__a, null)': 't.notOk(__a)',
    't.equal(__a, null, __b)': 't.notOk(__a, __b)',
});

