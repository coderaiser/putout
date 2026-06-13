import {operator, types} from 'putout';

const {isIdentifier} = types;

const {getBindingPath} = operator;

export const report = () => `Use 'superTraverse' instead of 'traverse'`;

export const match = () => ({
    'traverse(__a, __b)': (vars, path) => {
        const bindingPath = getBindingPath(path, 'traverse');
        
        if (!bindingPath)
            return true;
        
        if (!isIdentifier(bindingPath.node.init))
            return false;
        
        return bindingPath.node.init.name === 'operator';
    },
});

export const replace = () => ({
    'traverse(__a, __b)': 'superTraverse(__a, __b)',
});
