'use strict';

const object = require('./apply-object-destructuring');
const array = require('./apply-array-destructuring');
const falsy = require('./falsy');

module.exports.rules = {
    object,
    array,
    falsy,
};
