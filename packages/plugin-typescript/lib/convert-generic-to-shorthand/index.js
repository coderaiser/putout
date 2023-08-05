'use strict';

const {types, operator} = require('putout');
const {replaceWith} = operator;
const {
    tSArrayType,
    isTSUnionType,
    isTSFunctionType,
} = types;

module.exports.report = () => `Use shorthand '[]' instead of generic 'Array'`;

module.exports.fix = ({path, typeReference}) => {
    if (isTSFunctionType(typeReference) || isTSUnionType(typeReference)) {
        const ref = tSArrayType(typeReference);
        
        typeReference.extra = typeReference.extra || {};
        typeReference.extra.parenthesized = true;
        
        replaceWith(path, ref);
        
        return;
    }
    
    replaceWith(path, tSArrayType(typeReference));
};

module.exports.traverse = ({push}) => ({
    TSTypeReference(path) {
        if (!path.get('typeName').isIdentifier({name: 'Array'}))
            return;
        
        const {typeParameters} = path.node;
        
        if (!typeParameters)
            return;
        
        const {params} = typeParameters;
        
        if (!params || params.length > 1)
            return;
        
        const [typeReference] = params;
        
        push({
            path,
            typeReference,
        });
    },
});
