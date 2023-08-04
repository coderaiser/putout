'use strict';

module.exports.report = () => 'Avoid useless parens';

module.exports.fix = ({path}) => {
    path.node.extra.parenthesized = false;
    return;
};

module.exports.traverse = ({push}) => ({
    TSTypeReference(path) {
        if (!path.node.extra?.parenthesized)
            return;
        
        push({
            path,
        });
    },
    TSUnionType(path) {
        if (!path.node.extra?.parenthesized)
            return;
        
        if (path.parentPath.isTSArrayType())
            return;
        
        push({
            path,
        });
    },
});
