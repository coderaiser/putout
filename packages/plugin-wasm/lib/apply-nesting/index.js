import {operator} from 'putout';

const {
    remove,
    compare,
    __wasm,
} = operator;

export const report = () => 'Use nestging';

export const match = () => ({
    '__a.__b()': (vars, path) => {
        const {parentPath} = path;
        return compare(parentPath.parentPath, __wasm);
    },
});

export const replace = () => ({
    '__a.__b()': (vars, path) => {
        const prev = path.parentPath.getPrevSibling();
        const prevPrev = prev.getPrevSibling();
        const {node} = path;
        
        node.arguments = [
            prevPrev.node.expression,
            prev.node.expression,
        ];
        
        remove(prev);
        remove(prevPrev);
        
        return path;
    },
});
