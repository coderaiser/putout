'use strict';

module.exports = (items) => {
    const result = [];
    
    for (const item of items) {
        const entries = Object.entries(item);
        
        for (const entry of entries) {
            result.push(transform(entry));
        }
    }
    
    return result;
};

const transform = ([name, value]) => ({
    name,
    ...value,
});
