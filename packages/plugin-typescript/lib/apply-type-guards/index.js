import {
    types,
    operator,
    template,
} from 'putout';

const {replaceWith} = operator;
const {identifier} = types;

const create = template('(__a): __a is __c => typeof __a === "__b"', {
    placeholderPattern: /__/,
});

export const report = () => `Use 'type guards'`;

export const match = () => ({
    '(__a) => typeof __a === "__b"': (vars, path) => !path.node.returnType,
});

export const replace = () => ({
    '(__a) => typeof __a === "__b"': ({__a, __b}, path) => {
        replaceWith(path, create({
            __a,
            __b,
            __c: identifier(__b.value),
        }));
        
        return path;
    },
});
