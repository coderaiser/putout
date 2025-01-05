'use strict';

const {operator} = require('putout');
const {remove, replaceWith} = operator;

module.exports.report = () => 'Avoid empty statement in if condition';

module.exports.filter = (path) => {
    const nextPath = path.getNextSibling();
    
    if (!nextPath.node)
        return false;
    
    return path.get('consequent').isEmptyStatement();
};

module.exports.include = () => [
    'IfStatement',
];

module.exports.fix = (path) => {
    const nextPath = path.getNextSibling();
    const consequentPath = path.get('consequent');
    
    replaceWith(consequentPath, nextPath);
    remove(nextPath);
};
