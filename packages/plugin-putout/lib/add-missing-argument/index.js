'use strict';

const {operator} = require('putout');
const {addArgument} = operator;

module.exports = addArgument({
    comparePlaces: ['{comparePlaces}', 'test("__a", (__args) => __body)'],
    compare: ['{compare}', 'test("__a", (__args) => __body)'],
});

