'use strict';

const {
    types,
    operator,
    template,
} = require('putout');

const {
    traverse,
    compare,
} = operator;

const {ExpressionStatement} = types;

module.exports.report = () => `Call 'stopAll()' at the end of test when 'mockImport()' used`;

module.exports.fix = (path) => {
    const assertionPath = getAssertionsPath(path);
    const stopAllNode = template.ast('stopAll()');
    
    assertionPath.insertBefore(ExpressionStatement(stopAllNode));
};

const TEST = 'test("__a", (t) => __body)';
const TEST_ASYNC = 'test("__a", async (t) => __body)';

module.exports.traverse = ({push}) => ({
    [TEST]: createTraverse(push),
    [TEST_ASYNC]: createTraverse(push),
});

const createTraverse = (push) => (path) => {
    const {
        hasMockImport,
        hasStopAll,
        hasAssertions,
    } = check(path);
    
    if (!hasMockImport)
        return;
    
    if (!hasAssertions)
        return;
    
    if (hasStopAll)
        return;
    
    push(path);
};

function check(path) {
    let hasStopAll = false;
    let hasMockImport = false;
    let hasAssertions = false;
    
    traverse(path, {
        'mockImport(__a, __b)': () => {
            hasMockImport = true;
        },
        'stopAll()': () => {
            hasStopAll = true;
        },
        't.__(__args)': () => {
            hasAssertions = true;
        },
    });
    
    return {
        hasStopAll,
        hasMockImport,
        hasAssertions,
    };
}

function getAssertionsPath(path) {
    const bodyPath = path.get('arguments.1.body.body');
    let resultPath = null;
    
    for (const pathEl of bodyPath) {
        if (compare(pathEl, 't.__(__args)')) {
            resultPath = pathEl;
            break;
        }
    }
    
    return resultPath;
}

