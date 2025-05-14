import {operator, types} from 'putout';

const {isMemberExpression} = types;
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
        
        push(path);
    },
});
