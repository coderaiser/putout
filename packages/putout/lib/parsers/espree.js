'use strict';

const once = require('once');
const initEspree = once(() => require('espree'));

module.exports.parse = function espreeParse(source) {
    const {parse} = initEspree();
    const preventUsingEsprima = true;
    
    return parse(source, {
        loc: true,
        tokens: preventUsingEsprima,
        comment: true,
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    });
};

