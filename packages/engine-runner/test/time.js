import {performance} from 'node:perf_hooks';
import {test} from 'supertape';
import putout from 'putout';
import {runPlugins} from '#runner';
import {
    getTime,
    resetTime,
    setTime,
} from '#time';

const sleep = (ms) => {
    const end = performance.now() + ms;
    
    while (performance.now() < end)
        ;
};

const run = (source, plugin, {fix = false} = {}) => {
    resetTime();
    setTime(true);
    
    putout(source, {
        runPlugins,
        fix,
        plugins: [
            ['exp', plugin],
        ],
    });
    
    const result = getTime();
    
    resetTime();
    setTime(false);
    
    return result;
};

const identifiers = {
    report: () => '',
    fix: () => {},
    traverse: ({push}) => ({
        Identifier(path) {
            push(path);
        },
    }),
};

test('putout: runner: time: setup', (t) => {
    const plugin = {
        ...identifiers,
        traverse: (...args) => {
            sleep(2);
            return identifiers.traverse(...args);
        },
    };
    
    const {rules} = run('const a = 5', plugin);
    
    t.ok(rules[0].setup >= 0.002);
    t.end();
});

test('putout: runner: time: hits: count', (t) => {
    const {rules} = run('const a = b', identifiers);
    
    t.equal(rules[0].hits, 2);
    t.end();
});

test('putout: runner: time: report: exclusive of visit', (t) => {
    const plugin = {
        ...identifiers,
        report: () => {
            sleep(5);
            return '';
        },
    };
    
    const {rules: [{
        report,
        visit,
    }]} = run('const a = 5', plugin);
    
    t.ok(report >= 0.005 && visit < report);
    t.end();
});

test('putout: runner: time: report: fix is included', (t) => {
    const plugin = {
        ...identifiers,
        fix: () => sleep(5),
    };
    
    const {rules: [{report}]} = run('const a = 5', plugin, {
        fix: true,
    });
    
    t.ok(report >= 0.005);
    t.end();
});

test('putout: runner: time: traverse', (t) => {
    const plugin = {
        ...identifiers,
        traverse: () => ({
            Identifier: () => sleep(5),
        }),
    };
    
    const {traverse} = run('const a = 5', plugin);
    
    t.ok(traverse >= 0.005);
    t.end();
});

test('putout: runner: time: passes: no fix', (t) => {
    const {passes} = run('const a = 5', identifiers);
    
    const expected = [1];
    const result = [];
    
    for (const {pass} of passes) {
        result.push(pass);
    }
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: runner: time: passes: fix', (t) => {
    const plugin = {
        ...identifiers,
        fix: (path) => path.parentPath.remove(),
    };
    
    const {passes} = run('const a = 5', plugin, {
        fix: true,
    });
    
    const expected = [1, 2];
    const result = [];
    
    for (const {pass} of passes) {
        result.push(pass);
    }
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: runner: time: files', (t) => {
    resetTime();
    setTime(true);
    
    for (const source of ['a', 'b']) {
        putout(source, {
            runPlugins,
            plugins: [
                ['exp', identifiers],
            ],
        });
    }
    
    const {files} = getTime();
    
    resetTime();
    setTime(false);
    
    t.equal(files, 2);
    t.end();
});

test('putout: runner: time: find: report and fix', (t) => {
    const plugin = {
        report: () => {
            sleep(5);
            return '';
        },
        fix: () => sleep(5),
        find: (ast, {traverse, push}) => {
            traverse(ast, {
                Identifier(path) {
                    push(path);
                },
            });
        },
    };
    
    const {rules: [{
        report,
        hits,
    }]} = run('const a = 5', plugin, {
        fix: true,
    });
    
    const result = {
        enough: report >= 0.01 * hits,
        pushed: hits > 0,
    };
    
    const expected = {
        enough: true,
        pushed: true,
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: runner: time: off: nothing collected', (t) => {
    resetTime();
    setTime(false);
    
    putout('const a = 5', {
        runPlugins,
        plugins: [
            ['exp', identifiers],
        ],
    });
    
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

const plain = {
    report: () => '',
    fix: () => {},
};

test('putout: runner: time: type: replacer: setup and match', (t) => {
    const plugin = {
        ...plain,
        replace: () => ({
            'const a = 5': 'const a = 6',
        }),
    };
    
    const {rules: [rule]} = run('const a = 5', plugin);
    const result = {
        type: rule.type,
        setup: 'setup' in rule,
        match: 'match' in rule,
        find: 'find' in rule,
    };
    const expected = {
        type: 'replacer',
        setup: true,
        match: true,
        find: false,
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: runner: time: type: includer: setup and match', (t) => {
    const plugin = {
        ...plain,
        include: () => [
            'const __a = __b',
        ],
    };
    
    const {rules: [rule]} = run('const a = 5', plugin);
    const result = {
        type: rule.type,
        match: 'match' in rule,
    };
    const expected = {
        type: 'includer',
        match: true,
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: runner: time: type: traverser: setup, no match', (t) => {
    const {rules: [rule]} = run('const a = 5', identifiers);
    const result = {
        type: rule.type,
        setup: 'setup' in rule,
        match: 'match' in rule,
    };
    const expected = {
        type: 'traverser',
        setup: true,
        match: false,
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: runner: time: type: finder: find, no setup', (t) => {
    const plugin = {
        ...plain,
        find: () => {},
    };
    
    const {rules: [rule]} = run('const a = 5', plugin);
    const result = {
        type: rule.type,
        setup: 'setup' in rule,
        find: 'find' in rule,
    };
    const expected = {
        type: 'finder',
        setup: false,
        find: true,
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: runner: time: type: unknown plugin: no rule', (t) => {
    const ast = putout.parse('const a = 5');
    
    resetTime();
    setTime(true);
    
    runPlugins({
        ast,
        plugins: [{
            rule: 'keyless',
            plugin: plain,
            options: {},
        }],
    });
    
    const {rules} = getTime();
    
    resetTime();
    setTime(false);
    
    const result = rules;
    const expected = [];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: runner: time: find: time outside of callbacks', (t) => {
    const plugin = {
        ...plain,
        find: (ast, {traverse}) => {
            sleep(5);
            traverse(ast, {
                Identifier: () => sleep(20),
            });
        },
    };
    
    const {rules: [{
        find,
        visit,
    }]} = run('const a = 5', plugin);
    const result = {
        found: find >= 0.005,
        small: find < 0.015,
        visited: visit >= 0.02,
    };
    const expected = {
        found: true,
        small: true,
        visited: true,
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: runner: time: replacer: many calls, no hits, match > 0', (t) => {
    const plugin = {
        ...plain,
        replace: () => ({
            'const a = 7': 'const a = 8',
        }),
    };
    
    const {rules: [rule]} = run('const a = 5; const b = 5;', plugin);
    const result = {
        calls: rule.calls,
        hits: rule.hits,
        match: rule.match > 0,
    };
    const expected = {
        calls: 2,
        hits: 0,
        match: true,
    };
    
    t.deepEqual(result, expected);
    t.end();
});
