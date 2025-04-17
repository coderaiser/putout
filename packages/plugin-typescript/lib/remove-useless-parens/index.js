import {operator} from 'putout';

const {hasParens, removeParens} = operator;

export const report = () => 'Avoid useless parens';

export const fix = (path) => {
    removeParens(path);
    return;
};

export const traverse = ({push}) => ({
    TSTypeReference(path) {
        if (!hasParens(path))
            return;
        
        push(path);
    },
    TSUnionType(path) {
        if (!hasParens(path))
            return;
        
        if (path.parentPath.isTSArrayType())
            return;
        
        push(path);
    },
});
