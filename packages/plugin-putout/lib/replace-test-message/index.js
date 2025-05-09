import {types} from 'putout';

const {isCallExpression} = types;

export const report = ({correct, operatorPath}) => {
    const calleePath = operatorPath.get('callee');
    return `Use '${correct}' in test message when using '${calleePath}()'`;
};

export const fix = ({path, incorrect, correct}) => {
    path.node.value = path.node.value.replace(incorrect, correct);
    path.node.raw = path.node.raw.replace(incorrect, correct);
};

const INCORRECT = {
    TRANSFORM: /: (no report after transform|no transform|report|no report)/,
    NO_TRANSFORM: /: (no report after transform|transform|report|no report)/,
    REPORT: /: (no report after transform|no report|transform|no transform)/,
    NO_REPORT: /: (no report after transform|report|transform|no transform)/,
    NO_REPORT_AFTER_TRANSFORM: /: (report|transform|no transform|no report)/,
};

export const traverse = ({push}) => ({
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
    't.noReportAfterTransform(__a)': convert({
        push,
        incorrect: INCORRECT.NO_REPORT_AFTER_TRANSFORM,
        correct: ': no report after transform',
    }),
});

const convert = ({push, correct, incorrect}) => (path) => {
    const [is, messagePath] = isCorrect({
        incorrect,
        path,
        correct,
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

function isCorrect({path, correct, incorrect}) {
    const calleePath = path.findParent(isCallExpression);
    
    if (!calleePath)
        return [CORRECT];
    
    const messagePath = calleePath.get('arguments.0');
    
    if (!messagePath.isStringLiteral())
        return [CORRECT];
    
    const {value} = messagePath.node;
    
    if (value.includes(correct))
        return [CORRECT];
    
    const is = !incorrect.test(value);
    
    return [is, messagePath];
}
