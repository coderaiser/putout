import {operator} from 'putout';

const {compare} = operator;

export const report = () => `Use 'Array.at()'`;

export const filter = (path) => {
    const {parentPath} = path;
    
    if (parentPath.isAssignmentExpression())
        return false;
    
    if (compare(path, '__a[length - __b]'))
        return compare(parentPath.parentPath.getPrevSibling(), 'const {length} = __a');
    
    return true;
};

export const replace = () => ({
    '__a[__a.length - __b]': '__a.at(-__b)',
    '__a[length - __b]': '__a.at(-__b)',
});
