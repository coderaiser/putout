'use strict';

const {operator} = require('putout');
const {hasParens, removeParens} = operator;

module.exports.report = () => 'Avoid useless parens';

module.exports.fix = (path) => {
    removeParens(path);
    return;
};

module.exports.traverse = ({push}) => ({
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
