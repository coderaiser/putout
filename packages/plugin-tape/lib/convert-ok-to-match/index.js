'use strict';

module.exports.report = () => 't.match should be used instead of t.ok with includes';

module.exports.replace = () => ({
    't.ok(__a.includes(__b))': 't.match(__a, __b)',
    't.ok(__a.includes(__b), __c)': 't.match(__a, __b, __c)',
});

