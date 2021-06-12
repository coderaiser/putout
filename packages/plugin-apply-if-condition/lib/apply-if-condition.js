'use strict';

const {replaceWith} = require('putout').operator;

module.exports.report = () => 'Avoid empty statement in if condition';

module.exports.filter = (path) => {
    return path.get('consequent').isEmptyStatement();
};

module.exports.include = () => ['IfStatement'];

module.exports.fix = (path) => {
    const nextPath = path.getNextSibling();
    
    replaceWith(path.get('consequent'), nextPath);
    nextPath.remove();
};
