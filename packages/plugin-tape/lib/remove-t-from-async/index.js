import {types, operator} from 'putout';

const {remove} = operator;
const {objectProperty, objectPattern} = types;

export const report = () => `Use 'if condition' instead of 'ternary expression'`;

export const replace = () => ({
    'await t.__a(__args)': ({__a}, path) => {
        const next = path.parentPath.getNextSibling();
        
        path.scope.block.params = [
            objectPattern([
                objectProperty(__a, __a),
            ]),
        ];
        
        remove(next);
        
        return 'await __a(__args)';
    },
});
