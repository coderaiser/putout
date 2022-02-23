'use strict';

const {types} = require('putout');
const {isIdentifier} = types;

module.exports.report = () => `Pass 'fn', then 'args' splited by coma`;

module.exports.match = () => ({
    'tryCatch(__a(__args))': check,
    'tryToCatch(__a(__args))': check,
});

module.exports.replace = () => ({
    'tryCatch(__a(__args))': convert,
    'tryToCatch(__a(__args))': convert,
});

function check({__a}) {
    return isIdentifier(__a);
}

function convert({__a, __args}, path) {
    path.node.arguments = [
        __a,
        ...__args,
    ];
    
    return path;
}
