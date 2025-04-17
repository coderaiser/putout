import {operator} from 'putout';

const {compare, remove} = operator;

export const report = () => 'Avoid using duplicates in Union';

export const fix = (path) => {
    remove(path);
};

export const traverse = ({push, pathStore}) => ({
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
