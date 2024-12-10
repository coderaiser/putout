'use strict';

const {is} = require('../is');

const isPrimitive = (a) => typeof a !== 'object' || a === null;

module.exports.comparePrimitives = (node, template) => {
    return isPrimitive(template) && !is(template) && template === node;
};
