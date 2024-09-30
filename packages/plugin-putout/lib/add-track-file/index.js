'use strict';

const {operator} = require('putout');
const {addArgs} = operator;

module.exports = addArgs({
    trackFile: ['{trackFile}', [
        '(__a, __b) => __body',
        '(__a) => __body',
    ]],
});
