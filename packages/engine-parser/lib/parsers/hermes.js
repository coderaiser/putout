'use strict';

const once = require('once');
const initHermes = once(() => require('hermes-parser'));

module.exports.parse = function hermesParse(source) {
    const parser = initHermes();
    
    const options = {
        babel: true,
        allowReturnOutsideFunction: true,
        flow: 'detect',
        locations: true,
        tokens: true,
    };
    
    return parser.parse(source, options);
};
