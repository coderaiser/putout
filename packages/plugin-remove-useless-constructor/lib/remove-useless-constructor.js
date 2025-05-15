import {operator, types} from 'putout';

const {isCallExpression} = types;
const {remove} = operator;

export const report = () => `Avoid useless constructor`;

export const fix = (path) => {
    remove(path);
};

export const traverse = ({push}) => ({
    ClassMethod(path) {
        const {node} = path;
        
        if (node.key.name !== 'constructor')
            return;
        
        if (node.body.body.length > 1)
            return;
        
        const [first] = node.body.body;
        
        if (!isCallExpression(first?.expression) || first.expression.callee.type !== 'Super')
            return;
        
        push(path);
    },
});
