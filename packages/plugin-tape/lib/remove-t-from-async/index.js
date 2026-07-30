import {types, operator} from 'putout';

const {remove} = operator;
const {
    objectProperty,
    objectPattern,
    isReturnStatement,
} = types;

export const report = () => `Avoid 't' in async`;

export const match = () => ({
    'await t.__a(__args)': (vars, path) => {
        const {parentPath} = path;
        
        return !isReturnStatement(parentPath);
    },
});

export const replace = () => ({
    'await t.__a(__args)': ({__a}, path) => {
        const {parentPath} = path;
        const next = parentPath.getNextSibling();
        
        path.scope.block.params = [
            objectPattern([
                objectProperty(__a, __a),
            ]),
        ];
        
        remove(next);
        
        return 'await __a(__args)';
    },
});
