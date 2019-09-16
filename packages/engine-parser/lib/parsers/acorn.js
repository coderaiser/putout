'use strict';

const once = require('once');

const initAcorn = once(() => {
    const acorn = require('acorn');
    
    // fix acorn plugins
    // https://github.com/acornjs/acorn/issues/862
    if (acorn.version !== '6.3.0')
        acorn.version = '6.3.0';
    
    const {Parser} = acorn;
    const jsx = require('acorn-jsx');
    const stage3 = require('acorn-stage3');
    
    return Parser.extend(stage3, jsx());
});

module.exports.parse = function acornParse(source) {
    const parser = initAcorn();
    const options = {
        locations: true,
        comment: true,
        ecmaVersion: 2020,
        sourceType: 'module',
        allowAwaitOutsideFunction: true,
        allowReturnOutsideFunction: true,
        allowImportExportEverywhere: true,
    };
    
    const tokensData = parser.tokenizer(source, options);
    const tokensToAvoidEsprima = [
        ...tokensData,
    ];
    
    const result = parser.parse(source, options);
    
    return {
        ...result,
        tokens: tokensToAvoidEsprima,
    };
};

