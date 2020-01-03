'use strict';

const {platform} = process;

module.exports = (a) => {
    if (platform !== 'win32')
        return a;
    
    return a.replace(RegExp('/', 'g'), `\\\\`);
};

