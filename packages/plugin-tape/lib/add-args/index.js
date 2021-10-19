'use strict';

const {operator} = require('putout');
const {addArgs} = operator;

module.exports = addArgs({
    t: ['t', 'test("__a", (__args) => __body)'],
});
