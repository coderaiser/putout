'use strict';

const {binaryExpression} = require('putout').types;

module.exports.report = () => 'operator "**" should be used instead of Math.pow';

module.exports.fix = ({chunk, left, right}) => {
    chunk.replaceWith(binaryExpression('**', left, right));
};

module.exports.find = (ast, {push, traverse}) => {
    traverse(ast, {
        CallExpression(chunk) {
            const {callee} = chunk;
            
            if (!callee.isMemberExpression())
                return;
            
            const isMath = callee.object.isIdentifier({
                name: 'Math',
            });
            
            const isPow = callee.property.isIdentifier({
                name: 'pow',
            });
            
            if (!isMath || !isPow)
                return;
            
            const [left, right] = chunk.arguments;
            
            push({
                chunk,
                left,
                right,
            });
        },
    });
};

