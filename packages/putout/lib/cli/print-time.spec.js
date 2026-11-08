import {test, stub} from 'supertape';
import {montag} from 'montag';
import {formatTime, printTime} from './print-time.js';

const replacer = {
    rule: 'destructuring/apply-array',
    type: 'replacer',
    total: 9.903,
    setup: 0.001,
    match: 9.9,
    visit: 0.001,
    report: 0.001,
    calls: 4_210_000,
    hits: 0,
};

const declarator = {
    rule: 'putout/declare',
    type: 'declarator',
    total: 1,
    setup: 0.5,
    match: 0.001,
    visit: 0.001,
    report: 0.25,
    calls: 40_000,
    hits: 38_627,
};

const finder = {
    rule: 'example/finder-rule',
    type: 'finder',
    total: 0.7,
    visit: 0.001,
    report: 0.001,
    find: 0.6,
    calls: 12,
    hits: 12,
};

const traverser = {
    rule: 'plain',
    type: 'traverser',
    total: 0.0004,
    setup: 0.0001,
    visit: 0.0003,
    report: 0.001,
    calls: 3,
    hits: 3,
};

const small = (rule, name) => ({
    ...rule,
    rule: name,
    total: 0.1,
    setup: 0.001,
    match: 0.001,
    visit: 0.001,
    report: 0.001,
});

const quiet = (name) => ({
    ...finder,
    rule: name,
    total: 0.101,
    find: 0.001,
});

const base = {
    files: 2,
    traverse: 20,
    passes: [{
        pass: 1,
        runs: 2,
        total: 15,
    }],
};

const crowd = [
    small(replacer, 'a'),
    small(replacer, 'b'),
    small(replacer, 'c'),
    small(replacer, 'd'),
    small(replacer, 'e'),
];

const withFinders = () => ({
    ...base,
    rules: [finder, quiet('f2'), quiet('f3')],
});

const withCrowd = (rules) => ({
    ...base,
    rules: [...rules, ...crowd],
});

test('putout: cli: print-time: formatTime: default', (t) => {
    const result = formatTime(withCrowd([replacer]));
    
    const expected = montag`
        time:
          files: 2
          traverse: 20.000s
          rules: 10.403s
        anomalies: 1 of 6 rules
        thresholds: setup -, match 9.900s, visit -, report -, find -
        rules:
          destructuring/apply-array[replacer]:
            total: 9.903s
            match: 9.900s [anomaly]
            visit: 0.001s
            calls: 4210000
            hits: 0
        passes:
          - pass: 1
            runs: 2
            total: 15.000s
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('putout: cli: print-time: formatTime: default: setup anomaly is shown', (t) => {
    const result = formatTime(withCrowd([declarator]));
    
    t.match(result, '    setup: 0.500s [anomaly]\n');
    t.end();
});

test('putout: cli: print-time: formatTime: default: setup is hidden when not anomaly', (t) => {
    const result = formatTime(withCrowd([replacer]));
    
    t.notMatch(result, 'setup: 0.001s');
    t.end();
});

test('putout: cli: print-time: formatTime: default: report anomaly', (t) => {
    const result = formatTime(withCrowd([declarator]));
    
    t.match(result, '    report: 0.250s [anomaly]\n');
    t.end();
});

test('putout: cli: print-time: formatTime: default: report is hidden when not anomaly', (t) => {
    const result = formatTime(withCrowd([replacer]));
    
    t.notMatch(result, 'report: 0.001s');
    t.end();
});

test('putout: cli: print-time: formatTime: default: find anomaly', (t) => {
    const result = formatTime(withFinders());
    
    t.match(result, '    find: 0.600s [anomaly]\n');
    t.end();
});

test('putout: cli: print-time: formatTime: default: finder has no setup', (t) => {
    const result = formatTime(withFinders());
    
    t.notMatch(result, '    setup:');
    t.end();
});

test('putout: cli: print-time: formatTime: default: finder has no match', (t) => {
    const result = formatTime(withFinders());
    
    t.notMatch(result, '    match:');
    t.end();
});

test('putout: cli: print-time: formatTime: default: find is hidden when not anomaly', (t) => {
    const result = formatTime(withFinders());
    
    t.notMatch(result, 'f2[finder]');
    t.end();
});

test('putout: cli: print-time: formatTime: all: rule without match has no match line', (t) => {
    const result = formatTime({
        ...base,
        rules: [traverser],
    }, {
        mode: 'all',
    });
    
    t.notMatch(result, 'match');
    t.end();
});

test('putout: cli: print-time: formatTime: default: line order', (t) => {
    const result = formatTime(withCrowd([{
        ...declarator,
        match: 5,
    }]));
    
    const names = result
        .split('putout/declare[declarator]:\n')[1]
        .split('passes:')[0]
        .split('\n')
        .filter(Boolean)
        .map((line) => line
            .trim()
            .split(':')[0]);
    
    const expected = [
        'total',
        'setup',
        'match',
        'visit',
        'report',
        'calls',
        'hits',
    ];
    
    t.deepEqual(names, expected);
    t.end();
});

test('putout: cli: print-time: formatTime: default: hidden values count in rules', (t) => {
    const result = formatTime(withCrowd([replacer]));
    
    t.match(result, '  rules: 10.403s\n');
    t.end();
});

test('putout: cli: print-time: formatTime: all', (t) => {
    const result = formatTime(withCrowd([replacer]), {
        mode: 'all',
    });
    
    const expected = montag`
        destructuring/apply-array[replacer]:
            total: 9.903s
            setup: 0.001s
            match: 9.900s
            visit: 0.001s
            report: 0.001s
            calls: 4210000
            hits: 0
    `;
    
    t.match(result, expected.replace(/^destructuring/, '  destructuring'));
    t.end();
});

test('putout: cli: print-time: formatTime: all: no analysis', (t) => {
    const result = formatTime(withCrowd([replacer]), {
        mode: 'all',
    });
    
    t.notMatch(result, 'anomal');
    t.end();
});

test('putout: cli: print-time: formatTime: all: no thresholds', (t) => {
    const result = formatTime(withCrowd([replacer]), {
        mode: 'all',
    });
    
    t.notMatch(result, 'thresholds');
    t.end();
});

test('putout: cli: print-time: formatTime: all: shows all rules', (t) => {
    const result = formatTime(withCrowd([replacer]), {
        mode: 'all',
    });
    
    t.match(result, '  a[replacer]:\n');
    t.end();
});

test('putout: cli: print-time: formatTime: paint', (t) => {
    const paint = stub().returns('RED');
    
    const result = formatTime(withCrowd([replacer]), {
        paint,
    });
    
    t.match(result, 'match: 9.900s RED\n');
    t.end();
});

test('putout: cli: print-time: formatTime: no anomalies', (t) => {
    const result = formatTime({
        ...base,
        rules: crowd,
    });
    
    t.match(result, 'anomalies: 0 of 5 rules\n');
    t.end();
});

test('putout: cli: print-time: formatTime: no anomalies: empty rules', (t) => {
    const result = formatTime({
        ...base,
        rules: crowd,
    });
    
    t.match(result, 'rules: {}\n');
    t.end();
});

test('putout: cli: print-time: formatTime: no rules', (t) => {
    const result = formatTime({
        files: 0,
        traverse: 0,
        rules: [],
        passes: [],
    });
    
    const expected = montag`
        time:
          files: 0
          traverse: 0.000s
          rules: 0.000s
        anomalies: 0 of 0 rules
        thresholds: setup -, match -, visit -, report -, find -
        rules: {}
        passes: []
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('putout: cli: print-time: formatTime: quote rule name', (t) => {
    const result = formatTime(withCrowd([{
        ...replacer,
        rule: '@scope/rule: x',
    }]));
    
    t.match(result, '  "@scope/rule: x"[replacer]:\n');
    t.end();
});

test('putout: cli: print-time: formatTime: plugin/rule name is not quoted', (t) => {
    const result = formatTime(withCrowd([{
        ...replacer,
        rule: 'nodejs/convert-commonjs-to-esm/require',
    }]));
    
    t.match(result, '  nodejs/convert-commonjs-to-esm/require[replacer]:\n');
    t.end();
});

test('putout: cli: print-time: formatTime: rounding', (t) => {
    const result = formatTime({
        ...base,
        traverse: 1.2346,
        rules: [traverser],
    }, {
        mode: 'all',
    });
    
    t.match(result, '  traverse: 1.235s\n');
    t.end();
});

test('putout: cli: print-time: printTime', async (t) => {
    const log = stub();
    const time = withCrowd([replacer]);
    const getTime = stub().returns(time);
    
    await printTime({
        log,
        getTime,
    });
    
    t.calledWith(log, [
        formatTime(time),
    ]);
    t.end();
});

test('putout: cli: print-time: printTime: all', async (t) => {
    const log = stub();
    const time = withCrowd([replacer]);
    const getTime = stub().returns(time);
    
    await printTime({
        log,
        getTime,
        mode: 'all',
    });
    
    t.calledWith(log, [
        formatTime(time, {
            mode: 'all',
        }),
    ]);
    t.end();
});

test('putout: cli: print-time: printTime: default getTime', async (t) => {
    const log = stub();
    
    await printTime({
        log,
    });
    
    const [[message]] = log.args;
    
    t.match(message, 'time:\n');
    t.end();
});

const fileOptions = (overrides = {}) => ({
    log: stub(),
    writeFile: stub(),
    getTime: stub().returns(withCrowd([replacer])),
    mode: 'file',
    date: new Date(2026, 10, 8, 2, 3, 4),
    pid: 123,
    ...overrides,
});

test('putout: cli: print-time: printTime: file: name', async (t) => {
    const options = fileOptions();
    
    await printTime(options);
    
    const [[name]] = options.writeFile.args;
    
    t.equal(name, '.putout-time-2026-11-08-02-03-04-123.json');
    t.end();
});

test('putout: cli: print-time: printTime: file: log gets name', async (t) => {
    const options = fileOptions();
    
    await printTime(options);
    
    t.calledWith(options.log, ['.putout-time-2026-11-08-02-03-04-123.json']);
    t.end();
});

test('putout: cli: print-time: printTime: file: content', async (t) => {
    const options = fileOptions();
    
    await printTime(options);
    
    const [[, content]] = options.writeFile.args;
    const result = JSON.parse(content);
    
    const expected = {
        unit: 's',
        ...withCrowd([replacer]),
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: cli: print-time: printTime: file: no analysis', async (t) => {
    const options = fileOptions();
    
    await printTime(options);
    
    const [[, content]] = options.writeFile.args;
    
    t.notMatch(content, 'anomal');
    t.end();
});

test('putout: cli: print-time: printTime: file: log once', async (t) => {
    const options = fileOptions();
    
    await printTime(options);
    
    t.calledOnce(options.log);
    t.end();
});

test('putout: cli: print-time: printTime: text: no file', async (t) => {
    const options = fileOptions({
        mode: 'on',
    });
    
    await printTime(options);
    
    t.notCalled(options.writeFile);
    t.end();
});
