import {types} from 'putout';

const {isFunction} = types;

export const report = () => `Call 'reImport()' using await`;

export const match = () => ({
    'reImport(__a)': (vars, path) => {
        const {parentPath} = path;
        
        return !parentPath.isAwaitExpression();
    },
});

export const replace = () => ({
    'reImport(__a)': (vars, path) => {
        const fnPath = path.findParent(isFunction);
        
        if (fnPath)
            fnPath.node.async = true;
        
        return 'await reImport(__a)';
    },
});
