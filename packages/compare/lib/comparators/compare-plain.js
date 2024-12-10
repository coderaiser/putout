'use strict';

const {types} = require('@putout/babel');
const {isObject, isArrays} = require('../is');
const {comparePrimitives} = require('./compare-primitives');

const {isIdentifier} = types;

module.exports.comparePlain = (node, template, {add}) => {
    if (!node && node === template)
        return true;
    
    if (!node)
        return false;
    
    if (comparePrimitives(node, template))
        return true;
    
    if (isIdentifier(node) && node.name === template.name)
        return true;
    
    if (isObject(template) && !Array.isArray(template))
        return add(node, template, {
            plain: true,
        });
    
    if (isArrays(node, template))
        return add(node, template, {
            plain: true,
        });
    
    return false;
};
