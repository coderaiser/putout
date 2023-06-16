'use strict';

const {operator} = require('putout');
const {compare, remove} = operator;

module.exports.report = () => 'Avoid using duplicates in Union';

module.exports.fix = (path) => {
    remove(path);
};

module.exports.traverse = ({push, pathStore}) => ({
    TSUnionType(path) {
        const types = path.get('types');
        
        for (const type of types) {
            const foundTypes = contains(type, types);
            
            if (foundTypes.length === 1)
                continue;
            
            pathStore(foundTypes.pop());
        }
    },
    Program: {
        exit() {
            for (const path of pathStore())
                push(path);
        },
    },
});

function contains(type, types) {
    const result = [];
    
    for (const currentType of types) {
        if (compare(type, currentType))
            result.push(currentType);
    }
    
    return result;
}
