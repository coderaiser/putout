'use strict';

const {operator} = require('putout');
const {
    setLiteralValue,
    compare,
} = operator;

const FIXTURE = [
    'report',
    'transform',
];

const NAMES = [
    ...FIXTURE,
    'no report',
    'no transform',
];

module.exports.report = () => `Apply 'fixture' name to 'message'`;

module.exports.match = () => ({
    't.noReport(__a)': check,
    't.report(__a, __b)': check,
    't.transform(__a)': check,
    't.noTransform(__a)': check,
});

module.exports.replace = () => ({
    't.noReport(__a)': transform,
    't.report(__a, __b)': transform,
    't.transform(__a)': transform,
    't.noTransform(__a)': transform,
});

const isTest = (path) => compare(path, 'test(__a, (t) => __body)');

const check = ({__a}, path) => {
    const name = __a.value;
    
    if (FIXTURE.includes(name))
        return false;
    
    const testPath = path.find(isTest);
    
    if (!testPath)
        return false;
    
    const [str] = testPath.parentPath.parentPath.node.arguments;
    
    return !str.value.includes(name);
};

const transform = ({__a}, path) => {
    const name = __a.value;
    const testPath = path.find(isTest);
    const [str] = testPath.parentPath.parentPath.node.arguments;
    
    const values = str.value.split(':');
    const last = values
        .at(-1)
        .trim();
    
    if (!NAMES.includes(last))
        values.pop();
    
    setLiteralValue(str, `${values.join(':')}: ${name}`);
    
    return path;
};
