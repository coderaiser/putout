import {
    types,
    operator,
    template,
} from 'putout';

const {identifier} = types;
const {replaceWith} = operator;

const create = template('(__a: unknown): __a is __c => typeof __a === "__b"', {
    placeholderPattern: /__/,
});

const createLogical = template('(__a: unknown): __a is __c => __d && typeof __a === "__b"', {
    placeholderPattern: /__/,
});

export const report = () => `Use 'type guards'`;

export const match = () => ({
    '(__a) => typeof __a === "__b"': (vars, path) => !path.node.returnType,
    '(__a) => __d && typeof __a === "__b"': (vars, path) => !path.node.returnType,
});

export const replace = () => ({
    '(__a) => __d && typeof __a === "__b"': ({__a, __b, __d}, path) => {
        const __c = parseGuard(__b);
        
        replaceWith(path, createLogical({
            __a,
            __b,
            __c,
            __d,
        }));
        
        return path;
    },
    '(__a) => typeof __a === "__b"': ({__a, __b}, path) => {
        const __c = parseGuard(__b);
        
        replaceWith(path, create({
            __a,
            __b,
            __c,
        }));
        
        return path;
    },
});

function parseGuard({value}) {
    if (value === 'function')
        return identifier('Function');
    
    return identifier(value);
}
