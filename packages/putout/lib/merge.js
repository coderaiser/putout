'use strict';

const deepmerge = require('deepmerge');

const isString = (a) => typeof a === 'string';
const arrayUnion = (...a) => {
    const flatten = a.flat();
    return mergeIgnore(Array.from(new Set(flatten)));
};

const arrayMerge = (a, b) => arrayUnion(b, a);

module.exports = (...args) => {
    return deepmerge.all(args, {
        arrayMerge,
    });
};

function mergeIgnore(list) {
    const negatives = [];
    
    for (const current of list) {
        if (isString(current) && current.startsWith('!'))
            negatives.push(current.slice(1));
    }
    
    for (const current of negatives) {
        const index = list.indexOf(current);
        
        if (index >= 0) {
            list.splice(index, 1);
            
            const negIndex = list.indexOf(`!${current}`);
            list.splice(negIndex, 1);
        }
    }
    
    return list;
}
