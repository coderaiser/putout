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
    't.transform(__a, __b)': check,
    't.noTransform(__a)': check,
});

module.exports.replace = () => ({
    't.noReport(__a)': transform,
    't.report(__a, __b)': transform,
    't.transform(__a)': transform,
    't.transform(__a, __b)': transform,
    't.noTransform(__a)': transform,
});

const isTest = (path) => compare(path, 'test(__a, (t) => __body)', {
    findUp: false,
});

const isTestOnly = (path) => compare(path, 'test.only(__a, (t) => __body)', {
    findUp: false,
});

const check = ({__a}, path) => {
    const name = __a.value;
    
    if (FIXTURE.includes(name))
        return false;
    
    const {value} = getTestNodeArgument(path);
    
    if (!value)
        return false;
    
    const regEnd = RegExp(`: ${name}$`);
    const regMiddle = RegExp(`: ${name}: .*`);
    
    return !regEnd.test(value) && !regMiddle.test(value);
};

const transform = ({__a}, path) => {
    const name = __a.value;
    const str = getTestNodeArgument(path);
    
    const values = str.value.split(':');
    const last = values
        .at(-1)
        .trim();
    
    if (!NAMES.includes(last))
        values.pop();
    
    setLiteralValue(str, `${values.join(':')}: ${name}`);
    
    return path;
};

const getTestNodeArgument = (path) => {
    let testPath = path.find(isTest);
    
    if (!testPath)
        testPath = path.find(isTestOnly);
    
    if (!testPath)
        return {
            value: '',
        };
    
    if (testPath.isExpressionStatement())
        testPath = testPath.get('expression');
    
    return testPath.node.arguments[0];
};
