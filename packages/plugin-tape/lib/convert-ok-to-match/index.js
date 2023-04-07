'use strict';

module.exports.report = () => `Use 't.match()' instead of 't.ok()'`;

module.exports.exclude = () => [
    't.ok(keys(__a).includes(__b))',
];

module.exports.replace = () => ({
    't.ok(__a.includes(__b))': 't.match(__a, __b)',
    't.ok(__a.includes(__b), __c)': 't.match(__a, __b, __c)',
    't.ok(__a.test(__b))': 't.match(__b, __a)',
    't.ok(__a.test(__b), __c)': 't.match(__b, __a, __c)',
});
