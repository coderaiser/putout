'use strict';

const {isArray} = Array;
const maybeArray = (a) => isArray(a) ? a : [a];

module.exports = (a) => {
    if (!a)
        return [];
    
    return maybeArray(a);
};
