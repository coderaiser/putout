'use strict';

const deepmerge = require('deepmerge');

const {isArray} = Array;
const isObject = (a) => typeof a === 'object';
const isNested = (a) => isArray(a[0]) && a[0].length > 1;
const isStringObjectTuple = (a) => isArray(a) && isString(a[0]) && isObject(a[1]);

const isString = (a) => typeof a === 'string';
const arrayUnion = (a, b) => {
    if (/^(on|off)$/.test(a[0]))
        return a;
    
    if (isNested(a))
        return a;
    
    let flatten = [];
    
    if (isStringObjectTuple(a) && isStringObjectTuple(b))
        flatten = [
            a[0],
            b[0],
            deepmerge(a[1], b[1]),
        ];
    else
        flatten = [
            ...a,
            ...b,
        ].flat();
    
    return mergeIgnore(Array.from(new Set(flatten)));
};

const arrayMerge = (a, b) => arrayUnion(b, a);

module.exports.mergeOptions = (...args) => {
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
