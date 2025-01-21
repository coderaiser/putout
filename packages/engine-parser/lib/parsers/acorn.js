'use strict';

const once = require('once');

const initAcorn = once(() => {
    const {Parser} = require('acorn');
    
    const stage3 = require('acorn-stage3');
    const typescript = require('acorn-typescript').default;
    
    return Parser.extend(typescript(), stage3);
});

module.exports.parse = function acornParse(source) {
    const parser = initAcorn();
    const options = {
        locations: true,
        comment: true,
        ecmaVersion: 2023,
        sourceType: 'module',
        allowAwaitOutsideFunction: true,
        allowReturnOutsideFunction: true,
        allowImportExportEverywhere: true,
        preserveParens: true,
    };
    
    const tokensToAvoidEsprima = Array.from(parser.tokenizer(source, options));
    const result = parser.parse(source, options);
    
    return {
        ...result,
        tokens: tokensToAvoidEsprima,
    };
};
