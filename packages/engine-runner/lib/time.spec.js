import process from 'node:process';
import {test} from 'supertape';
import {
    addCall,
    addFile,
    addFind,
    addMatch,
    addPass,
    addReport,
    addSetup,
    addTraverse,
    addVisit,
    getInnerNs,
    getReportNs,
    getTime,
    isTime,
    markMatch,
    now,
    parseTime,
    resetTime,
    setTime,
    setType,
} from '#time';

const isUndefined = (a) => typeof a === 'undefined';

const reset = () => {
    resetTime();
    setTime(false);
};

const first = () => {
    const [rule] = getTime().rules;
    
    reset();
    
    return rule;
};

test('putout: runner: time: parseTime: off', (t) => {
    const result = [
        undefined,
        '',
        '0',
        'false',
    ].map(parseTime);
    
    const expected = [
        'off',
        'off',
        'off',
        'off',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: runner: time: parseTime: all, file', (t) => {
    const result = [
        parseTime('all'),
        parseTime('file'),
    ];
    
    const expected = [
        'all',
        'file',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: runner: time: parseTime: on', (t) => {
    const result = [
        parseTime('1'),
        parseTime('x'),
    ];
    
    const expected = [
        'on',
        'on',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: runner: time: isTime: default', (t) => {
    reset();
    
    t.notOk(isTime());
    t.end();
});

test('putout: runner: time: setTime: on', (t) => {
    reset();
    setTime(true);
    
    const result = isTime();
    
    reset();
    
    t.ok(result);
    t.end();
});

test('putout: runner: time: setTime: falsy', (t) => {
    reset();
    setTime(true);
    setTime(0);
    
    t.notOk(isTime());
    t.end();
});

test('putout: runner: time: now: bigint', (t) => {
    const result = typeof now();
    const expected = 'bigint';
    
    t.equal(result, expected);
    t.end();
});

test('putout: runner: time: PUTOUT_TIME is set', async (t) => {
    const {PUTOUT_TIME} = process.env;
    
    process.env.PUTOUT_TIME = '1';
    
    const {isTime} = await import('./time.js?env-on');
    
    if (isUndefined(PUTOUT_TIME))
        delete process.env.PUTOUT_TIME;
    else
        process.env.PUTOUT_TIME = PUTOUT_TIME;
    
    t.ok(isTime());
    t.end();
});

test('putout: runner: time: PUTOUT_TIME is zero', async (t) => {
    const {PUTOUT_TIME} = process.env;
    
    process.env.PUTOUT_TIME = '0';
    
    const {isTime} = await import('./time.js?env-zero');
    
    if (isUndefined(PUTOUT_TIME))
        delete process.env.PUTOUT_TIME;
    else
        process.env.PUTOUT_TIME = PUTOUT_TIME;
    
    t.notOk(isTime());
    t.end();
});

test('putout: runner: time: PUTOUT_TIME is not set', async (t) => {
    const {PUTOUT_TIME} = process.env;
    
    delete process.env.PUTOUT_TIME;
    
    const {isTime} = await import('./time.js?env-off');
    
    if (!isUndefined(PUTOUT_TIME))
        process.env.PUTOUT_TIME = PUTOUT_TIME;
    
    t.notOk(isTime());
    t.end();
});

test('putout: runner: time: getTime: empty', (t) => {
    reset();
    
    const expected = {
        files: 0,
        traverse: 0,
        rules: [],
        passes: [],
    };
    
    const result = getTime();
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: runner: time: getTime: seconds', (t) => {
    reset();
    
    addTraverse(1_500_000_000n);
    
    const {traverse} = getTime();
    
    reset();
    
    t.equal(traverse, 1.5);
    t.end();
});

test('putout: runner: time: addSetup, addMatch: accumulate', (t) => {
    reset();
    
    addSetup('a', 1_000_000_000n);
    addSetup('a', 2_000_000_000n);
    addMatch('a', 4_000_000_000n);
    
    const {
        setup,
        match,
        total,
    } = first();
    
    const result = {
        setup,
        match,
        total,
    };
    
    const expected = {
        setup: 3,
        match: 4,
        total: 7,
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: runner: time: addReport', (t) => {
    reset();
    
    addReport('a', 5_000_000_000n);
    addReport('a', 5_000_000_000n);
    
    const {report} = first();
    
    t.equal(report, 10);
    t.end();
});

test('putout: runner: time: getReportNs', (t) => {
    reset();
    
    addReport('a', 7n);
    
    const result = getReportNs('a');
    
    reset();
    
    t.equal(result, 7n);
    t.end();
});

test('putout: runner: time: getReportNs: unknown rule: no entry', (t) => {
    reset();
    
    const result = getReportNs('unknown');
    const {rules} = getTime();
    
    reset();
    
    const expected = [
        0n,
        [],
    ];
    
    t.deepEqual([result, rules], expected);
    t.end();
});

test('putout: runner: time: addCall', (t) => {
    reset();
    
    addCall('a');
    addCall('a');
    
    const {calls} = first();
    
    t.equal(calls, 2);
    t.end();
});

test('putout: runner: time: addVisit: exclusive of report', (t) => {
    reset();
    
    addReport('a', 30_000_000_000n);
    addVisit('a', 100_000_000_000n, 0n);
    
    const {visit, hits} = first();
    const result = {
        visit,
        hits,
    };
    
    const expected = {
        visit: 70,
        hits: 1,
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: runner: time: addVisit: report before is not subtracted', (t) => {
    reset();
    
    addReport('a', 30_000_000_000n);
    
    const reportBefore = getReportNs('a');
    
    addVisit('a', 10_000_000_000n, reportBefore);
    
    const {visit} = first();
    
    t.equal(visit, 10);
    t.end();
});

test('putout: runner: time: getInnerNs: match and visit', (t) => {
    reset();
    
    addMatch('a', 3n);
    addVisit('a', 4n, 0n);
    
    const result = getInnerNs('a');
    
    reset();
    
    t.equal(result, 7n);
    t.end();
});

test('putout: runner: time: getInnerNs: no match', (t) => {
    reset();
    
    addVisit('a', 4n, 0n);
    
    const result = getInnerNs('a');
    
    reset();
    
    t.equal(result, 4n);
    t.end();
});

test('putout: runner: time: getInnerNs: unknown rule', (t) => {
    reset();
    
    const result = getInnerNs('unknown');
    const {rules} = getTime();
    
    reset();
    
    const expected = [
        0n,
        [],
    ];
    
    t.deepEqual([result, rules], expected);
    t.end();
});

test('putout: runner: time: addFind: without inner time', (t) => {
    reset();
    
    setType('a', 'finder');
    addFind('a', 100_000_000_000n, 0n);
    
    const {find} = first();
    
    t.equal(find, 100);
    t.end();
});

test('putout: runner: time: addFind: subtract inner time', (t) => {
    reset();
    
    setType('a', 'finder');
    
    const before = getInnerNs('a');
    
    addMatch('a', 10_000_000_000n);
    addVisit('a', 20_000_000_000n, 0n);
    addFind('a', 100_000_000_000n, before);
    
    const {find} = first();
    
    t.equal(find, 70);
    t.end();
});

test('putout: runner: time: addFind: negative result is zero', (t) => {
    reset();
    
    setType('a', 'finder');
    addMatch('a', 50n);
    addFind('a', 10n, 0n);
    
    const {find} = first();
    
    t.equal(find, 0);
    t.end();
});

test('putout: runner: time: addFind: accumulate', (t) => {
    reset();
    
    setType('a', 'finder');
    addFind('a', 1_000_000_000n, 0n);
    addFind('a', 2_000_000_000n, 0n);
    
    const {find} = first();
    
    t.equal(find, 3);
    t.end();
});

test('putout: runner: time: setType: finder has find, no setup', (t) => {
    reset();
    
    setType('a', 'finder');
    const result = first();
    
    const expected = {
        rule: 'a',
        type: 'finder',
        total: 0,
        visit: 0,
        report: 0,
        find: 0,
        calls: 0,
        hits: 0,
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: runner: time: setType: replacer has setup, no find', (t) => {
    reset();
    
    setType('a', 'replacer');
    const result = first();
    
    const expected = {
        rule: 'a',
        type: 'replacer',
        total: 0,
        setup: 0,
        visit: 0,
        report: 0,
        calls: 0,
        hits: 0,
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: runner: time: setType: keep setup', (t) => {
    reset();
    
    addSetup('a', 1_000_000_000n);
    setType('a', 'traverser');
    
    const {setup} = first();
    
    t.equal(setup, 1);
    t.end();
});

test('putout: runner: time: setType: keep find', (t) => {
    reset();
    
    setType('a', 'finder');
    addFind('a', 1_000_000_000n, 0n);
    setType('a', 'finder');
    
    const {find} = first();
    
    t.equal(find, 1);
    t.end();
});

test('putout: runner: time: markMatch: add match', (t) => {
    reset();
    
    markMatch('a');
    
    const {match} = first();
    
    t.equal(match, 0);
    t.end();
});

test('putout: runner: time: markMatch: keep value', (t) => {
    reset();
    
    addMatch('a', 2_000_000_000n);
    markMatch('a');
    
    const {match} = first();
    
    t.equal(match, 2);
    t.end();
});

test('putout: runner: time: no markMatch: no match', (t) => {
    reset();
    
    addVisit('a', 1n, 0n);
    
    const rule = first();
    
    t.notOk('match' in rule);
    t.end();
});

test('putout: runner: time: default type is unknown', (t) => {
    reset();
    
    addCall('a');
    
    const {type} = first();
    
    t.equal(type, 'unknown');
    t.end();
});

test('putout: runner: time: total: sum of existing keys', (t) => {
    reset();
    
    addSetup('a', 1_000_000_000n);
    addVisit('a', 2_000_000_000n, 0n);
    addReport('a', 4_000_000_000n);
    
    const {total} = first();
    
    t.equal(total, 7);
    t.end();
});

test('putout: runner: time: addTraverse, addFile', (t) => {
    reset();
    
    addTraverse(1_000_000_000n);
    addTraverse(2_000_000_000n);
    addFile();
    addFile();
    
    const {traverse, files} = getTime();
    
    reset();
    
    const result = {
        traverse,
        files,
    };
    
    const expected = {
        traverse: 3,
        files: 2,
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: runner: time: addPass: same pass', (t) => {
    reset();
    
    addPass(0, 1_000_000_000n);
    addPass(0, 2_000_000_000n);
    
    const {passes} = getTime();
    
    reset();
    
    const expected = [{
        pass: 1,
        runs: 2,
        total: 3,
    }];
    
    t.deepEqual(passes, expected);
    t.end();
});

test('putout: runner: time: addPass: hole is skipped', (t) => {
    reset();
    
    addPass(1, 1_000_000_000n);
    
    const {passes} = getTime();
    
    reset();
    
    const expected = [{
        pass: 2,
        runs: 1,
        total: 1,
    }];
    
    t.deepEqual(passes, expected);
    t.end();
});

test('putout: runner: time: getTime: sort by total, descending', (t) => {
    reset();
    
    addVisit('slow', 9_000_000_000n, 0n);
    addVisit('fast', 1_000_000_000n, 0n);
    addVisit('middle', 5_000_000_000n, 0n);
    const names = [];
    
    for (const {rule} of getTime().rules) {
        names.push(rule);
    }
    
    reset();
    const result = names;
    
    const expected = [
        'slow',
        'middle',
        'fast',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: runner: time: resetTime', (t) => {
    reset();
    
    addSetup('a', 1n);
    addPass(0, 1n);
    addTraverse(1n);
    addFile();
    resetTime();
    
    const expected = {
        files: 0,
        traverse: 0,
        rules: [],
        passes: [],
    };
    
    const result = getTime();
    
    t.deepEqual(result, expected);
    t.end();
});
