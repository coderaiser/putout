'use strict';

const espree = require('espree');

module.exports = (source) => {
    const preventUsingEsprima = true;
    
    return espree.parse(source, {
        loc: true,
        tokens: preventUsingEsprima,
        comment: true,
        ecmaVersion: 2019,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    });
};

