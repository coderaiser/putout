'use strict';

module.exports = async (promise, count, array) => {
    const {length} = array;
    const result = [];
    
    if (length < count) {
        const promises = [];
        
        for (const el of array)
            promises.push(promise(el));
        
        return Promise.all(promises);
    }
    
    const n = Math.trunc(length / count);
    const k = n * count;
    
    for (let i = 0; i < n; i++) {
        const promises = [];
        
        for  (let j = 0; j < count; j++) {
            const index = i * 10 + j
            const el = array[index];
            
            promises.push(promise(el));
        }
        
        result.push(...await Promise.all(promises));
    }
    
    const promises = [];
    for (let i = k; i < length; i++) {
        const el = array[i];
        promises.push(promise(el));
    }
    
    return [
        ...result,
        ...await Promise.all(promises),
    ];
};

