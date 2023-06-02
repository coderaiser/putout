'use strict';

const SMALL_A = 97;
const SMALL_Z = 122;

module.exports.computeName = (uid) => {
    const number = Number(uid.replace('_temp', '') || 0);
    const small = number + SMALL_A;
    
    if (small <= SMALL_Z)
        return String.fromCharCode(small);
    
    return uid;
};
