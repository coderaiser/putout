'use strict';

const {types, operator} = require('putout');
const {replaceWith} = operator;

const {tSArrayType} = types;

module.exports.report = () => 'Shorthand [] should be used instead of Array';

module.exports.fix = ({path, typeReference}) => {
    replaceWith(path, tSArrayType(typeReference));
};

module.exports.traverse = ({push}) => {
    return {
        TSTypeReference(path) {
            if (!path.get('typeName').isIdentifier({name: 'Array'}))
                return;
            
            const {params} = path.node.typeParameters;
            
            if (!params || params.length > 1)
                return;
            
            const [typeReference] = params;
            push({
                path,
                typeReference,
            });
        },
    };
};
