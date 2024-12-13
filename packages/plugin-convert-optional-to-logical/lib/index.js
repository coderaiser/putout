'use strict';

const call = require('./call');
const assign = require('./assign');

module.exports.rules = {
    assign,
    call: ['off', call],
};
