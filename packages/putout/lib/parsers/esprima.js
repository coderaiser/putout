'use strict';

const once = require('once');
const initEsprima = once(() => require('esprima'));

module.exports.parse = function esprimaParse(source) {
    const {parse} = initEsprima();
    
    return parse(source, {
        loc: true,
        tokens: true,
        comment: true,
        sourceType: 'module',
        jsx: true,
    });
};

