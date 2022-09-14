'use strict';

module.exports.report = () => 'Useless functions should be avoided';

module.exports.exclude = () => [
    '(__args__a) => __args__a()',
];

module.exports.replace = () => ({
    '(__args__a) => __identifier__a(__args__a)': '__identifier__a',
    '(__args__a) => {__identifier__a(__args__a)}': '__identifier__a',
});

