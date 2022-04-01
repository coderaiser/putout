'use strict';

const {operator} = require('putout');
const {compare} = operator;

module.exports.report = () => 'Avoid using duplicates in Union';

module.exports.fix = (path) => {
    path.remove();
};

module.exports.traverse = ({push, listStore}) => ({
    TSUnionType(path) {
        const types = path.get('types');
        
        for (const type of types) {
            const foundTypes = contains(type, types);
            
            if (foundTypes.length === 1)
                continue;
            
            listStore(foundTypes.pop());
        }
    },
    Program: {
        exit() {
            for (const path of listStore())
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

