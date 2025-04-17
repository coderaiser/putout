import {operator} from 'putout';

const {replaceWith} = operator;

export const report = (path) => `Avoid useless non null expression: '${path.parentPath}' -> '${path}'`;

export const fix = (path) => {
    replaceWith(path, path.node.expression);
};

export const traverse = ({push}) => ({
    TSNonNullExpression(path) {
        const expressionPath = path.get('expression');
        
        if (expressionPath.isTSNonNullExpression())
            push(expressionPath);
        
        if (path.parentPath.isOptionalMemberExpression())
            push(path);
    },
});
