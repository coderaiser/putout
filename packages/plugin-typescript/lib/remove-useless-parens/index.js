'use strict';

const {types, operator} = require('putout');
const {replaceWith} = operator;

const {
    tSArrayType,
    isTSUnionType,
    isTSArrayType,
} = types;

module.exports.report = () => 'Avoid useless parens';

function getTopArrayType(path) {
    let i = 1;
    let prevPath;
    
    while (isTSArrayType(path)) {
        ++i;
        prevPath = path;
        path = path.parentPath;
    }
    
    return [i, prevPath];
}

const createArrayType = (count) => (element) => {
    let i = count;
    
    while (--i) {
        element = tSArrayType(element);
    }
    
    return element;
};

module.exports.fix = ({path, parentPath, typeAnnotation}) => {
    const [count, topParentPath] = getTopArrayType(path.parentPath);
    
    if (isTSArrayType(parentPath) && isTSUnionType(typeAnnotation)) {
        const {types} = typeAnnotation;
        typeAnnotation.types = types.map(createArrayType(count));
        replaceWith(topParentPath, typeAnnotation);
        
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

