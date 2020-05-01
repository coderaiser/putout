'use strict';

const {entries} = Object;

module.exports = (parentPath) => {
    let current = {
        parentPath,
    };
    const path = [];
    
    while (current = current.parentPath) {
        path.unshift(findKey(current, current.parentPath));
    }
    
    return path.join('.');
};
function findKey(next, parentPath) {
    parentPath = parentPath || {};
    
    for (const [key, value] of entries(parentPath)) {
        if (value === next)
            return key;
    }
    
    return '';
}

