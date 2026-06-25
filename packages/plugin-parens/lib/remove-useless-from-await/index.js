import {operator} from 'putout';

const {hasParens} = operator;

export const report = () => `Remove useless parens around 'await'`;

export const fix = (path) => {
    path.node.extra = {
        parenthesized: false,
    };
};

export const traverse = ({push}) => ({
    AwaitExpression(path) {
        if (!hasParens(path))
            return;
        
        if (path.parentPath.isVariableDeclarator())
            push(path);
    },
});
