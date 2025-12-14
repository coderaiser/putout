import {operator} from 'putout';

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
    'transform with options',
    'no transform with options',
    'no report',
    'no transform',
    'no report after transform',
    'no report with options',
];

export const report = () => `Apply 'fixture' name to 'message'`;

export const match = () => ({
    't.noReport(__a)': check,
    't.noReport(__a, __b)': check,
    't.noReportAfterTransform(__a)': check,
    't.report(__a, __b)': check,
    't.transform(__a)': check,
    't.transform(__a, __b)': check,
    't.transformWithOptions(__a, __b)': check,
    't.noTransformWithOptions(__a, __b)': check,
    't.noTransform(__a)': check,
    't.noReportWithOptions(__a, __b)': check,
});

export const replace = () => ({
    't.noReport(__a)': transform,
    't.noReport(__a, __b)': transform,
    't.report(__a, __b)': transform,
    't.transform(__a)': transform,
    't.transform(__a, __b)': transform,
    't.transformWithOptions(__a, __b)': transform,
    't.noTransformWithOptions(__a, __b)': transform,
    't.noTransform(__a)': transform,
    't.noReportAfterTransform(__a)': transform,
    't.noReportWithOptions(__a, __b)': transform,
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
    
    if (!name)
        return;
    
    if (name.includes(')'))
        return false;
    
    const encodedName = encode(name);
    
    const regEnd = RegExp(`: ${encodedName}$`);
    const regMiddle = RegExp(`: ${encodedName}: .*`);
    
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
    
    const [first] = testPath.node.arguments;
    
    return first;
};

const encode = (a) => a.replaceAll('+', '\\+');
