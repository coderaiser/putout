'use strict';

const array = require('./array');
const emptyArray = require('./empty-array');
const fn = require('./fn');
const noop = require('./noop');
const declare = require('./declare');

module.exports.rules = {
    array,
    'empty-array': emptyArray,
    fn,
    noop,
    declare,
};
