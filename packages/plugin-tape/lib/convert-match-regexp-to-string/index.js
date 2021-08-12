'use strict';

module.exports.report = () => 't.match should be used with string pattern';

module.exports.replace = () => ({
    't.match(__a, RegExp(__b))': 't.match(__a, __b)',
    't.match(__a, RegExp(__b), __c)': 't.match(__a, __b, __c)',
});

