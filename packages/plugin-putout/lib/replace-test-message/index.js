'use strict';

const {types} = require('putout');

const {isCallExpression} = types;

module.exports.report = ({correct, operatorPath}) => {
    const calleePath = operatorPath.get('callee');
    return `Use '${correct}' in test message when using '${calleePath}()'`;
};

module.exports.fix = ({path, incorrect, correct}) => {
    path.node.value = path.node.value.replace(incorrect, correct);
};

module.exports.traverse = ({push}) => ({
    't.transform(__a)': convert({
        push,
        incorrect: /: no transform/,
        correct: ': transform',
    }),
    't.noTransform(__a)': convert({
        push,
        incorrect: /: transform/,
        correct: ': no transform',
    }),
    't.report(__a)': convert({
        push,
        incorrect: /: no report/,
        correct: ': report',
    }),
    't.noReport(__a)': convert({
        push,
        incorrect: /: (report|transform|no transform)/,
        correct: ': no report',
    }),
});

const convert = ({push, correct, incorrect}) => (path) => {
    const [is, messagePath] = isCorrect({
        incorrect,
        path,
    });
    
    if (is)
        return;
    
    push({
        path: messagePath,
        operatorPath: path,
        incorrect,
        correct,
    });
};

const CORRECT = true;

function isCorrect({path, incorrect}) {
    const calleePath = path.findParent(isCallExpression);
    
    if (!calleePath)
        return [CORRECT];
    
    const messagePath = calleePath.get('arguments.0');
    
    if (!messagePath.isStringLiteral())
        return [CORRECT];
    
    const {value} = messagePath.node;
    const is = !incorrect.test(value);
    
    return [is, messagePath];
}

