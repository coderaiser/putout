'use strict';

const types = require('./types');
const operator = require('./operator');

module.exports = {
    template: `const {template} = require('putout')`,
    ...operator,
    ...types,
};

