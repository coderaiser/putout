'use strict';

const {types, operator} = require('putout');

const {compare} = operator;
const {logicalExpression} = types;

module.exports.report = () => `Merge 'if' with 'else' when the body is the same`;

module.exports.fix = (path) => {
    const {test: testFirst, alternate} = path.node;
    const {test: testSecond} = alternate;
    
    path.node.test = logicalExpression('||', testFirst, testSecond);
    delete path.node.alternate;
};
module.exports.traverse = ({push}) => ({
    IfStatement: (path) => {
        if (!path.node.alternate)
            return;
        
        if (!compare(path.node.consequent, path.node.alternate.consequent))
            return;
        
        push(path);
    },
});
