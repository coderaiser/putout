'use strict';

const once = require('once');
const initTenko = once(() => require('tenko'));

module.exports.parse = (source) => {
    const {Tenko} = initTenko();
    const {ast} = Tenko(source, {
        goalMode: 'module',
        allowGlobalReturn: true,
        exposeScopes: true,
    });
    
    return ast;
};

