'use strict';

const {
    types,
    operator,
} = require('putout');

const {replaceWith} = operator;
const {LogicalExpression} = types;

module.exports.report = () => `If statements should be merged`;

module.exports.fix = ({path, consequentPath}) => {
    const testPath = path.get('test');
    const left = testPath.node;
    const right = consequentPath.node.test;
    
    replaceWith(testPath, LogicalExpression('&&', left, right));
    
    replaceWith(path
        .get('consequent'), consequentPath.get('consequent'));
};

const getConsequent = (path) => {
    const consequentPath = path.get('consequent');
    
    if (consequentPath.isIfStatement())
        return consequentPath;
    
    const {node} = consequentPath;
    
    if (!consequentPath.isBlock() || node.body.length > 1)
        return;
    
    const resultPath = consequentPath.get('body.0');
    const {body} = consequentPath.node;
    
    if (body.length && resultPath.isIfStatement())
        return resultPath;
    
    return null;
};

module.exports.traverse = ({push}) => {
    return {
        'if (__) __': onIfStatement({
            push,
        }),
    };
};

const onIfStatement = ({push}) => (path) => {
    const consequentPath = getConsequent(path);
    
    if (!consequentPath)
        return;
    
    if (consequentPath.node.alternate)
        return;
    
    push({
        path,
        consequentPath,
    });
};

