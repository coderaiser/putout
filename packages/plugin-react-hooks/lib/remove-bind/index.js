'use strict';

const {traverseClass} = require('../common');

module.exports.report = () => 'bind should not be used';

module.exports.fix = (chunk) => {
    chunk.remove();
};

module.exports.find = (ast, {push}) => {
    traverseClass(ast, {
        CallExpression(chunk) {
            const isBind = chunk.callee.property
                .isIdentifier({name: 'bind'});
            
            const {parentPath} = chunk;
            
            if (isBind)
                push(parentPath);
        },
    });
};

