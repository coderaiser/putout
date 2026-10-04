import {
    template,
    operator,
    types,
} from 'putout';
import {getLogical} from '../get-logical.js';

export const report = () => `Use Logical Expression instead of Optional Chaining`;

const {replaceWith} = operator;
const {isBinaryExpression} = types;

export const fix = (path) => {
    const {parentPath} = path;
    const notEqual = isBinaryExpression(parentPath.node, {
        operator: '!==',
    });
    
    const logical = getLogical(path, {
        notEqual,
    });
    
    replaceWith(path, template.ast(logical));
};

export const include = () => [
    'OptionalMemberExpression',
    'OptionalCallExpression',
];

export const filter = ({parentPath}) => {
    if (parentPath.isOptionalMemberExpression())
        return false;
    
    if (parentPath.isAssignmentExpression())
        return false;
    
    return !parentPath.isOptionalCallExpression();
};
