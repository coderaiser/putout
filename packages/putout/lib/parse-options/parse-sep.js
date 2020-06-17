'use strict';

const {platform} = process;

module.exports = (a) => {
    a = wild(a);
    
    if (platform !== 'win32')
        return a;
    
    return a.replace(RegExp('/', 'g'), `\\\\`);
};

function wild(str) {
    const wildcard = str
        .replace(/\./g, `\\.`)
        .replace(/\*/g, `.*`);
    
    return wildcard;
}

