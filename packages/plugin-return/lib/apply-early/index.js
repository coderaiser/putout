import {operator, types} from 'putout';

const {isIdentifier} = types;
const {compare, remove} = operator;

export const report = () => `Apply early return`;

const FROM = `
    if (__a)
        __b = __c;
    else
        __b = __e;
`;

const TO = `{
    if (__a)
        return __c;
    
    return __e;
}`;

export const match = () => ({
    [FROM]: ({__b}, path) => {
        if (!isIdentifier(__b))
            return;
        
        const nextNode = path.getNextSibling();
        
        return compare(nextNode, `return ${__b.name}`);
    },
});

export const replace = () => ({
    [FROM]: (vars, path) => {
        remove(path.getNextSibling());
        
        return TO;
    },
});
