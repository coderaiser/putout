'use strict';

const {operator} = require('putout');
const {compare} = operator;

module.exports.report = () => 'Avoid using duplicates in Union';

module.exports.fix = (path) => {
    path.remove();
};

module.exports.traverse = ({push}) => ({
    TSUnionType(path) {
        const types = path.get('types');
        
        for (const type of types) {
            const foundTypes = contains(type, types);
            
            if (!foundTypes.length)
                continue;
            
            if (foundTypes.length === 1)
                continue;
            
            push(foundTypes.pop());
        }
    },
});

function contains(type, types) {
    const result = [];
    
    for (const currentType of types) {
        if (!currentType.node)
            continue;
        
        if (compare(type, currentType))
            result.push(currentType);
    }
    
    return result;
}

