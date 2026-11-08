import {test} from 'supertape';
import {getAnomalies, getThreshold} from './time-threshold.js';

// The expected value comes from an independent Python implementation.
const MATCH = [
    0.038,
    1.821,
    0.001,
    0.568,
    1.006,
    0.003,
    0.226,
    0.439,
    0.091,
    0.89,
    0.278,
    0.003,
    0.628,
    0.628,
    0.129,
    0.011,
    0.09,
    0.07,
    0.127,
    0.487,
    0.423,
    0.4,
    0.396,
    0.368,
    0.369,
    0.345,
    0.208,
    0.288,
    0.004,
    0.037,
    0.047,
    0.249,
    0.096,
    0.223,
    0.027,
    0.256,
    0.256,
    0.01,
    0.055,
    0.215,
];

test('putout: cli: time-threshold: fewer than 3 values', (t) => {
    const result = getThreshold([1, 2]);
    
    t.notOk(result);
    t.end();
});

test('putout: cli: time-threshold: all values are equal', (t) => {
    const result = getThreshold([
        2,
        2,
        2,
        2,
    ]);
    
    t.notOk(result);
    t.end();
});

test('putout: cli: time-threshold: one high group', (t) => {
    const result = getThreshold([
        1,
        10,
        1,
        9,
        1,
        1,
    ]);
    
    t.equal(result, 9);
    t.end();
});

test('putout: cli: time-threshold: high group is larger than half', (t) => {
    const result = getThreshold([
        5,
        5,
        4,
        4,
        1,
        1,
    ]);
    
    t.notOk(result);
    t.end();
});

test('putout: cli: time-threshold: group of equal values is not split', (t) => {
    const result = getThreshold([
        10,
        10,
        1,
        1,
        1,
    ]);
    
    t.equal(result, 10);
    t.end();
});

test('putout: cli: time-threshold: same variance: first split wins', (t) => {
    const result = getThreshold([
        10,
        5,
        5,
        5,
        0,
    ]);
    
    t.equal(result, 10);
    t.end();
});

test('putout: cli: time-threshold: reference data', (t) => {
    const result = getThreshold(MATCH);
    const expected = 0.89;
    
    t.equal(result, expected);
    t.end();
});

test('putout: cli: time-threshold: getAnomalies: rule without field gives no value', (t) => {
    const rules = [{
        rule: 'a',
        match: 10,
        visit: 1,
    }, {
        rule: 'b',
        match: 1,
        visit: 1,
    }, {
        rule: 'c',
        match: 1,
        visit: 1,
    }, {
        rule: 'd',
        visit: 1,
    }, {
        rule: 'e',
        visit: 1,
    }];
    
    const {thresholds} = getAnomalies(rules);
    
    t.equal(thresholds.match, 10);
    t.end();
});

test('putout: cli: time-threshold: getAnomalies: field that no rule has', (t) => {
    const rules = [{
        rule: 'a',
        visit: 1,
    }];
    
    const {thresholds} = getAnomalies(rules);
    const result = thresholds;
    
    const expected = {
        setup: null,
        match: null,
        visit: null,
        report: null,
        find: null,
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: cli: time-threshold: getAnomalies: total has no threshold', (t) => {
    const {thresholds} = getAnomalies([]);
    
    t.notOk('total' in thresholds);
    t.end();
});

test('putout: cli: time-threshold: getAnomalies: flags', (t) => {
    const rules = [{
        rule: 'a',
        total: 11,
        match: 10,
        visit: 1,
    }, {
        rule: 'b',
        total: 2,
        match: 1,
        visit: 1,
    }, {
        rule: 'c',
        total: 2,
        match: 1,
        visit: 1,
    }, {
        rule: 'd',
        total: 2,
        match: 1,
        visit: 1,
    }];
    
    const {flags} = getAnomalies(rules);
    const result = [];
    
    for (const set of flags) {
        result.push([...set]);
    }
    
    const expected = [
        ['match'],
        [],
        [],
        [],
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: cli: time-threshold: getAnomalies: value that shows as 0.000s is not an anomaly', (t) => {
    const rules = [{
        rule: 'a',
        setup: 0.0004,
    }, {
        rule: 'b',
        setup: 0.0001,
    }, {
        rule: 'c',
        setup: 0.0001,
    }, {
        rule: 'd',
        setup: 0.0001,
    }];
    
    const {flags} = getAnomalies(rules);
    const result = [];
    
    for (const set of flags) {
        result.push(set.size);
    }
    
    const expected = [
        0,
        0,
        0,
        0,
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: cli: time-threshold: getAnomalies: threshold is not zero', (t) => {
    const rules = [{
        rule: 'a',
        setup: 0.0004,
    }, {
        rule: 'b',
        setup: 0.0001,
    }, {
        rule: 'c',
        setup: 0.0001,
    }];
    
    const {thresholds} = getAnomalies(rules);
    
    t.notOk(thresholds.setup);
    t.end();
});

test('putout: cli: time-threshold: getAnomalies: values are compared as milliseconds', (t) => {
    const rules = [{
        rule: 'a',
        setup: 0.0104,
    }, {
        rule: 'b',
        setup: 0.0001,
    }, {
        rule: 'c',
        setup: 0.0002,
    }, {
        rule: 'd',
        setup: 0.0003,
    }];
    
    const {thresholds} = getAnomalies(rules);
    
    t.equal(thresholds.setup, 0.01);
    t.end();
});
