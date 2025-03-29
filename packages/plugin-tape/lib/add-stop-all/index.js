import {
    types,
    operator,
    template,
} from 'putout';
import {
    TEST,
    TEST_ONLY,
    TEST_SKIP,
    TEST_ASYNC,
    TEST_ASYNC_ONLY,
    TEST_ASYNC_SKIP,
} from '../test-signatures.js';

const {compare, insertBefore} = operator;

const {expressionStatement} = types;

export const report = () => `Call 'stopAll()' at the end of test when 'mockImport()' used`;

export const fix = (path) => {
    const assertionPath = getAssertionsPath(path);
    const stopAllNode = template.ast('stopAll()');
    
    insertBefore(assertionPath, expressionStatement(stopAllNode));
};

export const traverse = ({push}) => ({
    [TEST]: createTraverse(push),
    [TEST_ONLY]: createTraverse(push),
    [TEST_SKIP]: createTraverse(push),
    [TEST_ASYNC]: createTraverse(push),
    [TEST_ASYNC_ONLY]: createTraverse(push),
    [TEST_ASYNC_SKIP]: createTraverse(push),
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
    
    operator.traverse(path, {
        'mockImport(__a, __b)': () => {
            hasMockImport = true;
        },
        'mockRequire(__a, __b)': () => {
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
