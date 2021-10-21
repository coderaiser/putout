'use strict';

const {types, operator} = require('putout');
const {replaceWith} = operator;

const {
    tSArrayType,
    isTSUnionType,
} = types;

module.exports.report = () => 'Shorthand [] should be used instead of Array';

module.exports.fix = ({path, typeReference}) => {
    replaceWith(path, tSArrayType(typeReference));
};

module.exports.traverse = ({push}) => ({
    TSTypeReference(path) {
        if (!path.get('typeName').isIdentifier({name: 'Array'}))
            return;
        
        const {params} = path.node.typeParameters;
        
        if (!params || params.length > 1)
            return;
        
        const [typeReference] = params;
        
        if (isTSUnionType(typeReference))
            return;
        
        push({
            path,
            typeReference,
        });
    },
});
