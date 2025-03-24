import {types} from 'putout';

const {
    isArrayExpression,
    isStringLiteral,
} = types;

export const report = () => `Avoid useless array when pass arguments to 'run()'`;

export const match = () => ({
    'run(__args)': ({__args}) => {
        if (__args.length !== 1)
            return false;
        
        const [array] = __args;
        
        if (!isArrayExpression(array))
            return false;
        
        if (array.elements.length !== 2)
            return false;
        
        const [, second] = array.elements;
        
        if (isStringLiteral(second))
            return second.value.includes(' ');
        
        return false;
    },
});

export const replace = () => ({
    'run(__args)': ({__args}, path) => {
        const {elements} = __args[0];
        
        path.node.arguments = elements;
        
        return path;
    },
});
