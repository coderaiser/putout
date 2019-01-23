'use strict';

const espree = require('espree');
const babel = require('@babel/parser');

module.exports = (source, parser = 'babel') => {
    if (parser === 'babel')
        return babelParse(source);
    
    return espreeParse(source);
};

function babelParse(source) {
    return babel.parse(source, {
        sourceType: 'module',
        tokens: true,
        plugins: [
            'estree',
        ],
    });
}

function espreeParse(source) {
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
}

