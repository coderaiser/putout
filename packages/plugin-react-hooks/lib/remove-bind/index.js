'use strict';

const {
    findClass,
} = require('../common');

module.exports.report = () => 'bind should not be used';

module.exports.fix = (path) => {
    path.remove();
};

module.exports.find = (ast, {push, traverse}) => {
    findClass(traverse, ast, {
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

