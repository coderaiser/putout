'use strict';

const {types, operator} = require('putout');
const {replaceWith} = operator;

const {
    tSArrayType,
    isTSUnionType,
} = types;

module.exports.report = () => `Use shorthand '[]' instead of generic 'Array'`;

module.exports.fix = ({path, typeReference}) => {
    if (isTSUnionType(typeReference)) {
        const {types} = typeReference;
        typeReference.types = types.map(tSArrayType);
        replaceWith(path, typeReference);
        
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
