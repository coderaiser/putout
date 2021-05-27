'use strict';

module.exports.report = () => 'Useless functions should be avoided';

module.exports.exclude = () => [
    '(__args__a) => __a.__b(__args__a)',
    '(__args__a) => {__a.__b(__args__a)}',
];

module.exports.replace = () => ({
    '(...__a) => __b(...__a)': '__b',
    '(...__a) => {__b(...__a)}': '__b',
    'async (__a, __b) => {return await __c(__a, __b);}': '__c',
});

