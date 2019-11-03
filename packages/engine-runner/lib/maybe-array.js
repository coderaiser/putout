'use strict';

const {isArray} = Array;

module.exports = (a) => {
    if (!a)
        return [];
    
    return isArray(a) ? a : [a];
};

