import {operator} from 'putout';
import {
    TEST,
    TEST_ONLY,
    TEST_SKIP,
    TEST_ASYNC,
    TEST_ASYNC_ONLY,
    TEST_ASYNC_SKIP,
} from '../test-signatures.js';

const {remove} = operator;

export const report = () => `Remove 'stopAll()' when you not calling 'reImport()'`;

export const fix = (path) => {
    remove(path);
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
        hasReImport,
        hasMockImport,
        stopAllPath,
    } = check(path);
    
    if (hasReImport)
        return;
    
    if (hasMockImport)
        return;
    
    if (!stopAllPath)
        return;
    
    push(stopAllPath);
};

function check(path) {
    let hasReImport = false;
    let hasMockImport = false;
    let stopAllPath = null;
    
    operator.traverse(path, {
        'reImport(__a)': () => {
            hasReImport = true;
        },
        'mockRequire(__a, __b)': () => {
            hasMockImport = true;
        },
        'mockImport(__a, __b)': () => {
            hasMockImport = true;
        },
        'traceImport(__a, __b)': () => {
            hasReImport = true;
        },
        'reRequire(__a)': () => {
            hasReImport = true;
        },
        'stopAll()': (path) => {
            stopAllPath = path;
        },
    });
    
    return {
        hasReImport,
        hasMockImport,
        stopAllPath,
    };
}
