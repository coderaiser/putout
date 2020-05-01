'use strict';

const {entries} = Object;
const {isArray} = Array;

module.exports = (parentPath) => {
    let current = {
        parentPath,
    };
    const path = [];
    
    while (current = current.parentPath) {
        path.unshift(findKey(current, current.parent));
    }
    
    return path.join('.');
};
function findKey(path, parent) {
    const {node} = path;
    
    for (const [key, value] of entries(parent)) {
        if (isArray(value)) {
            const index = value.indexOf(node);
            
            if (index >= 0)
                return `${key}.${index}`;
            
            continue;
        }
        
        if (value === node)
            return key;
    }
}

