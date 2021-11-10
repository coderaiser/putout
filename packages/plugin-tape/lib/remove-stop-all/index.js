'use strict';

const {operator} = require('putout');

const {traverse} = operator;

module.exports.report = () => `Remove 'stopAll()' when you not calling 'reImport()'`;

module.exports.fix = (path) => {
    path.remove();
};

const TEST = 'test("__a", (t) => __body)';
const TEST_ASYNC = 'test("__a", async (t) => __body)';

module.exports.traverse = ({push}) => ({
    [TEST]: createTraverse(push),
    [TEST_ASYNC]: createTraverse(push),
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

