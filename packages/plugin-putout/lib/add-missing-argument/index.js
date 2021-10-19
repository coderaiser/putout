'use strict';

const {operator} = require('putout');
const {addArgs} = operator;

module.exports = addArgs({
    comparePlaces: ['{comparePlaces}', 'test("__a", (__args) => __body)'],
    compare: ['{compare}', 'test("__a", (__args) => __body)'],
});

