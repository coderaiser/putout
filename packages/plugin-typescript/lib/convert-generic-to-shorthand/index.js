'use strict';

const {types, operator} = require('putout');
const {replaceWith} = operator;
const {
    tsArrayType,
    isTSUnionType,
    isTSFunctionType,
} = types;

module.exports.report = () => `Use shorthand '[]' instead of generic 'Array'`;

module.exports.fix = ({path, typeReference}) => {
    if (isTSFunctionType(typeReference) || isTSUnionType(typeReference)) {
        const ref = tsArrayType(typeReference);
        
        typeReference.extra = typeReference.extra || {};
        typeReference.extra.parenthesized = true;
        
        replaceWith(path, ref);
        
        return;
    }
    
    replaceWith(path, tsArrayType(typeReference));
};

module.exports.traverse = ({push}) => ({
    TSTypeReference(path) {
        if (!path.get('typeName').isIdentifier({name: 'Array'}))
            return;
        
        const {typeArguments} = path.node;
        
        if (!typeArguments)
            return;
        
        const {params} = typeArguments;
        
        if (!params || params.length > 1)
            return;
        
        const [typeReference] = params;
        
        push({
            path,
            typeReference,
        });
    },
});
