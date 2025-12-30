'use strict';

const process = require('node:process');

module.exports = (a) => {
    a = wild(a);
    
    if (process.platform !== 'win32')
        return a;
    
    return a.replace(/\//g, `\\\\`);
};

function wild(str) {
    const wildcard = str
        .replace(/\./g, `\\.`)
        .replace(/\*/g, `.*`);
    
    return wildcard;
}
