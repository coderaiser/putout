'use strict';

const {
    isIdentifier,
    Identifier,
} = require('putout').types;

module.exports.report = () => {
    return `"noTransformCode" should be called instead of using same arguments twice in "transformCode"`;
};

module.exports.find = (ast, {push, traverse}) => {
    traverse(ast, {
        CallExpression(chunk) {
            const {callee} = chunk;
            
            if (!callee.isMemberExpression())
                return;
            
            const {object, property} = callee;
            
            if (object.name !== 't' || property.name !== 'transformCode')
                return;
            
            const [a, b] = chunk.arguments;
            
            if (!isIdentifier(a) || !isIdentifier(b))
                return;
            
            if (a.name !== b.name)
                return;
            
            push({
                chunk,
                callee,
            });
        },
    });
};

module.exports.fix = ({chunk, callee}) => {
    callee.property = Identifier('noTransformCode');
    
    const [arg] = chunk.arguments;
    chunk.arguments = [arg];
};

