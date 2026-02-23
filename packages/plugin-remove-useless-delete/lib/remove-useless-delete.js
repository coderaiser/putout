import {operator, types} from 'putout';

const {
    isMemberExpression,
    isOptionalMemberExpression,
} = types;

const {remove} = operator;

export const report = () => `Avoid useless 'delete'`;

export const fix = (path) => {
    remove(path);
};

export const traverse = ({push}) => ({
    UnaryExpression(path) {
        const {argument, operator} = path.node;
        
        if (operator !== 'delete')
            return;
        
        if (isMemberExpression(argument))
            return;
        
        if (isOptionalMemberExpression(argument))
            return;
        
        push(path);
    },
});
