'use strict';

const SMALL_A = 97;
const SMALL_Z = 122;

module.exports.computeName = (i, uid) => {
    const small = i + SMALL_A;
    
    if (small <= SMALL_Z)
        return String.fromCharCode(small);
    
    return uid;
};
