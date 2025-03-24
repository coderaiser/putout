import {types, operator} from 'putout';

const {
    isObjectExpression,
    isStringLiteral,
} = types;

const {extract} = operator;

export const report = () => `Pass an array when you want to run a list of scripts`;

export const match = () => ({
    'run(__args)': ({__args}, path) => {
        const [, ...names] = __args;
        
        if (!names.length)
            return false;
        
        if (hasDash(names))
            return false;
        
        return hasScript(__args, path);
    },
});

export const replace = () => ({
    'run(__args)': 'run([__args])',
});

function hasDash(names) {
    for (const name of names) {
        if (!isStringLiteral(name))
            return true;
        
        if (name.value.startsWith('-'))
            return true;
    }
    
    return false;
}

function hasScript(names, path) {
    const object = path.find(isObjectExpression);
    const properties = object.get('properties');
    
    for (const name of names) {
        const value = extract(name);
        let is = false;
        
        for (const prop of properties) {
            const propValue = extract(prop.node.key);
            
            if (propValue === value) {
                is = true;
                break;
            }
        }
        
        if (!is)
            return false;
    }
    
    return true;
}
