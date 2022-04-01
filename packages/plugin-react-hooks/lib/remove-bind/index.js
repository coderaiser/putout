'use strict';

const {operator} = require('putout');
const {traverseClass} = require('../common');

const {remove} = operator;

module.exports.report = () => 'bind should not be used';

module.exports.fix = (path) => {
    remove(path);
};

module.exports.find = (ast, {traverse, push}) => {
    traverseClass(traverse, ast, {
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

