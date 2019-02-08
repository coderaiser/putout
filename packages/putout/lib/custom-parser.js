'use strict';

module.exports = (source, parser) => {
    if (parser === 'babel')
        return babelParse(source);
    
    if (parser === 'espree')
        return espreeParse(source);
    
    return require(parser).parse(source);
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
    /* eslint node/no-unpublished-require: 0 */
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

