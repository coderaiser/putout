'use strict';

module.exports = (source, parser) => {
    if (parser === 'babel')
        return babelParse(source);
    
    return espreeParse(source);
};

function babelParse(source) {
    const {parse} = require('@babel/parser');
    
    return parse(source, {
        sourceType: 'module',
        tokens: true,
        plugins: [
            'estree',
            'jsx',
        ],
    });
}

function espreeParse(source) {
    const {parse} = require('espree');
    const preventUsingEsprima = true;
   
    return parse(source, {
        loc: true,
        tokens: preventUsingEsprima,
        comment: true,
        ecmaVersion: 2019,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    });
}

