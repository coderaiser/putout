'use strict';

const use = require('./use');
const assign = require('./assign');

module.exports.rules = {
    assign: ['off', assign],
    use,
};
