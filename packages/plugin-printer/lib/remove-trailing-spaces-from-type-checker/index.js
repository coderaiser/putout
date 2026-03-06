import {operator, types} from 'putout';

const {
    isIdentifier,
    isCallExpression,
} = types;

const {setLiteralValue} = operator;

export const report = (path) => {
    const {value} = path.node;
    const trimmed = value.trim();
    
    return `Avoid trailing spaces: '${value}' -> '${trimmed}'`;
};

export const fix = (path) => {
    setLiteralValue(path, path.node.value.trim());
};
export const traverse = ({push}) => ({
    StringLiteral(path) {
        const call = path.find(isCallExpression);
        
        if (!call)
            return;
        
        if (!isIdentifier(call.node.callee, {name: 'createTypeChecker'}))
            return;
        
        const {value} = path.node;
        
        if (value.endsWith(' '))
            push(path);
    },
});
