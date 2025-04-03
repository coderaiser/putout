import {
    print,
    types,
    operator,
} from 'putout';

const {awaitExpression} = types;
const {replaceWith, addParens} = operator;

export const report = (path) => {
    const line = print(path.get('argument.callee'));
    return `TypeError: '${line}' is not a function`;
};

export const fix = (path) => {
    const {argument} = path.node;
    const newPath = replaceWith(path, argument);
    const objectPath = newPath.get('expression.callee.object');
    
    path = replaceWith(objectPath, awaitExpression(objectPath.node));
    
    addParens(path);
};

export const traverse = ({push}) => ({
    AwaitExpression(path) {
        const argPath = path.get('argument');
        
        if (argPath.isOptionalCallExpression() && argPath.get('callee').isOptionalMemberExpression())
            push(path);
    },
});
