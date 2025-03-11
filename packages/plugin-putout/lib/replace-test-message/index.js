'use strict';

const {types} = require('putout');
const {isCallExpression} = types;

module.exports.report = ({correct, operatorPath}) => {
    const calleePath = operatorPath.get('callee');
    return `Use '${correct}' in test message when using '${calleePath}()'`;
};

module.exports.fix = ({path, incorrect, correct}) => {
    path.node.value = path.node.value.replace(incorrect, correct);
    path.node.raw = path.node.raw.replace(incorrect, correct);
};

const INCORRECT = {
    TRANSFORM: /: (no transform|report|no report)/,
    NO_TRANSFORM: /: (transform|report|no report)/,
    REPORT: /: (no report|transform|no transform)/,
    NO_REPORT: /: (report|transform|no transform)/,
};

module.exports.traverse = ({push}) => ({
    't.transform(__a)': convert({
        push,
        incorrect: INCORRECT.TRANSFORM,
        correct: ': transform',
    }),
    't.transform(__a, __b)': convert({
        push,
        incorrect: INCORRECT.TRANSFORM,
        correct: ': transform',
    }),
    't.noTransform(__a)': convert({
        push,
        incorrect: INCORRECT.NO_TRANSFORM,
        correct: ': no transform',
    }),
    't.report(__a, __b)': convert({
        push,
        incorrect: INCORRECT.REPORT,
        correct: ': report',
    }),
    't.noReport(__a)': convert({
        push,
        incorrect: INCORRECT.NO_REPORT,
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
