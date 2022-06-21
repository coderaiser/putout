'use strict';

const {types, operator} = require('putout');
const {replaceWith} = operator;

const {
    tSArrayType,
    isTSUnionType,
    isTSArrayType,
} = types;

module.exports.report = () => 'Avoid useless parens';

module.exports.fix = ({path, parentPath, typeAnnotation}) => {
    if (isTSArrayType(parentPath) && isTSUnionType(typeAnnotation)) {
        const {types} = typeAnnotation;
        typeAnnotation.types = types.map(tSArrayType);
        replaceWith(parentPath, typeAnnotation);
        
        return;
    }
    
    if (isTSUnionType(typeAnnotation)) {
        replaceWith(path, typeAnnotation);
        return;
    }
    
    if (parentPath.isTSArrayType()) {
        replaceWith(path.parentPath, tSArrayType(typeAnnotation));
        return;
    }
    
    replaceWith(path, typeAnnotation);
};

module.exports.traverse = ({push}) => ({
    TSParenthesizedType(path) {
        const {parentPath} = path;
        
        if (!parentPath.isTSTypeAnnotation() && !parentPath.isTSArrayType())
            return;
        
        const typeAnnotation = path.get('typeAnnotation').node;
        
        push({
            path,
            parentPath,
            typeAnnotation,
        });
    },
});

