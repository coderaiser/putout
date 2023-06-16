'use strict';

const {operator} = require('putout');

const {
    TEST,
    TEST_ONLY,
    TEST_SKIP,
    TEST_ASYNC,
    TEST_ASYNC_ONLY,
    TEST_ASYNC_SKIP,
} = require('../test-signatures');

const {traverse, remove} = operator;

module.exports.report = () => `Remove 'stopAll()' when you not calling 'reImport()'`;

module.exports.fix = (path) => {
    remove(path);
};

module.exports.traverse = ({push}) => ({
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
    
    traverse(path, {
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
