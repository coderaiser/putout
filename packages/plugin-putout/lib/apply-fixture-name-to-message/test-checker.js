import {operator} from 'putout';

const {compare} = operator;

const buildTestChecker = (a) => (b) => compare(b, a, {
    findUp: false,
});

export const isTest = buildTestChecker('test(__a, (t) => __body)');
export const isTestAsync = buildTestChecker('test(__a, async (__b) => __body)');
export const isTestDestructuring = buildTestChecker('test(__a, ({__b}) => __body)');
export const isTestOnly = buildTestChecker('test.only(__a, (t) => __body)');
