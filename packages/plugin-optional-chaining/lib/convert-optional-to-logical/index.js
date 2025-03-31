import {template, operator} from 'putout';
import {getLogical} from '../get-logical.js';

export const report = () => `Use Logical Expression instead of Optional Chaining`;

const {replaceWith} = operator;

export const fix = (path) => {
    const logical = getLogical(path);
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
