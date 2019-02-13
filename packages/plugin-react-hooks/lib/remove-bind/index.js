'use strict';

const {traverseClass} = require('../common');

module.exports.report = () => 'bind should not be used';

module.exports.fix = (path) => {
    path.remove();
};

module.exports.find = (ast, {push}) => {
    traverseClass(ast, {
        CallExpression(path) {
            const isBind = path
                .get('callee.property')
                .isIdentifier({name: 'bind'});
            
            const {parentPath} = path;
            
            if (isBind)
                push(parentPath);
        },
    });
};

