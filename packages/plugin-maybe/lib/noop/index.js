'use strict';

const {types} = require('putout');
const {isBlockStatement} = types;

module.exports.report = () => `Use 'noop()'`;

module.exports.exclude = () => [
    'const __a = () => {}',
];

module.exports.match = () => ({
    '() => __body': ({__body}) => {
        return isBlockStatement(__body) && !__body.body.length;
    },
});

module.exports.replace = () => ({
    '() => __body': 'noop',
});
