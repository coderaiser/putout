'use strict';

const process = require('node:process');
const fs = require('node:fs');
const os = require('node:os');
const {join} = require('node:path');

const {test, stub} = require('supertape');
const mockRequire = require('mock-require');
const tryCatch = require('try-catch');

const parseOptions = require('.');

const {reRequire, stopAll} = mockRequire;

const CWD = process.cwd();

test('putout: parse-options: custom options rules overrides default match', (t) => {
    const customOptions = {
        rules: {
            'remove-only': 'on',
        },
    };
    
    const readOptions = stub().returns([
        join(__dirname, '..'),
        customOptions,
    ]);
    
    const {rules} = parseOptions({
        readOptions,
    });
    
    const result = rules['remove-only'];
    
    t.equal(result, 'on');
    t.end();
});

test('putout: parse-options: options rules overrides default match', (t) => {
    const customOptions = {
        rules: {
            'remove-only': 'off',
        },
    };
    
    const options = {
        rules: {
            'remove-only': 'on',
        },
    };
    
    const readOptions = stub().returns([
        join(__dirname, '..'),
        customOptions,
    ]);
    
    const {rules} = parseOptions({
        options,
        readOptions,
    });
    
    const result = rules['remove-only'];
    
    t.equal(result, 'on');
    t.end();
});

test('putout: parseOptions: readHomeOptions: __dirname', (t) => {
    const readCodeMods = stub().returns([__dirname, {}]);
    
    const readOptions = stub().returns([
        __dirname, {
            rules: {
                'remove-console': 'off',
            },
        },
    ]);
    
    const readHomeOptions = stub().returns({
        rules: {
            'remove-unused-variables': 'off',
        },
    });
    
    mockRequire('../../putout.json', {});
    
    const parseOptions = reRequire('.');
    
    const result = parseOptions({
        readOptions,
        readHomeOptions,
        readCodeMods,
    });
    
    const expected = {
        dir: __dirname,
        rules: {
            'remove-console': 'off',
            'remove-unused-variables': 'off',
        },
    };
    
    stopAll();
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parseOptions: custom options more important then default match', (t) => {
    const empty = {};
    
    const readCodeMods = stub().returns([__dirname, empty]);
    const readOptions = stub().returns([__dirname, empty]);
    const readHomeOptions = stub().returns(empty);
    
    mockRequire('../../putout.json', {
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
    });
    
    const parseOptions = reRequire('.');
    
    const options = {
        rules: {
            'remove-only': 'off',
        },
    };
    
    const result = parseOptions({
        name: 'index.spec.js',
        options,
        readOptions,
        readHomeOptions,
        readCodeMods,
    });
    
    const expected = {
        dir: __dirname,
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
        rules: {
            'remove-only': 'off',
        },
    };
    
    stopAll();
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parseOptions: custom match more important then custom options', (t) => {
    const empty = {};
    
    const readCodeMods = stub().returns([__dirname, empty]);
    const readOptions = stub().returns([__dirname, empty]);
    const readHomeOptions = stub().returns(empty);
    
    mockRequire('../../putout.json', empty);
    
    const parseOptions = reRequire('.');
    
    const options = {
        rules: {
            'remove-only': 'off',
        },
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
    };
    
    const result = parseOptions({
        name: 'parse-options.spec.js',
        options,
        readOptions,
        readHomeOptions,
        readCodeMods,
    });
    
    const expected = {
        dir: __dirname,
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
        rules: {
            'remove-only': 'on',
        },
    };
    
    stopAll();
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parseOptions: no code mods directory: .putout', (t) => {
    const empty = {};
    
    const readOptions = stub().returns([__dirname, empty]);
    const readHomeOptions = stub().returns(empty);
    
    mockRequire('../../putout.json', empty);
    
    const {readdirSync} = fs;
    
    fs.readdirSync = () => {
        throw 'error';
    };
    
    const parseOptions = reRequire('.');
    
    const options = {
        rules: {
            'remove-only': 'off',
        },
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
    };
    
    const result = parseOptions({
        name: 'parse-options.spec.js',
        options,
        readOptions,
        readHomeOptions,
    });
    
    const expected = {
        dir: __dirname,
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
        rules: {
            'remove-only': 'on',
        },
    };
    
    stopAll();
    fs.readdirSync = readdirSync;
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parseOptions: code mods directory: .putout: exclude node_modules', (t) => {
    const empty = {};
    
    const readOptions = stub().returns([__dirname, empty]);
    const readHomeOptions = stub().returns(empty);
    
    mockRequire('../../putout.json', empty);
    mockRequire('node:fs', {
        readdirSync: stub().returns(['node_modules']),
    });
    
    const parseOptions = reRequire('.');
    
    const options = {
        rules: {
            'remove-only': 'off',
        },
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
    };
    
    const result = parseOptions({
        name: 'parse-options.spec.js',
        options,
        readOptions,
        readHomeOptions,
    });
    
    const expected = {
        dir: __dirname,
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
        plugins: [],
        rules: {
            'remove-only': 'on',
        },
    };
    
    stopAll();
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parseOptions: read rules: putout-plugin', (t) => {
    const empty = {};
    
    const readOptions = stub().returns([__dirname, empty]);
    const readHomeOptions = stub().returns(empty);
    const readCodeMods = stub().returns(empty);
    
    mockRequire('../../putout.json', empty);
    
    const plugin = stub();
    mockRequire(join(process.cwd(), 'putout-plugin-hello'), plugin);
    
    const {readdirSync} = fs;
    
    fs.readdirSync = stub().returns(['putout-plugin-hello']);
    
    const parseOptions = reRequire('.');
    
    fs.readdirSync = readdirSync;
    
    const options = {
        rules: {
            'remove-only': 'off',
        },
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
    };
    
    const result = parseOptions({
        name: 'parse-options.spec.js',
        options,
        readOptions,
        readHomeOptions,
        readCodeMods,
        rulesdir: '.',
    });
    
    stopAll();
    reRequire('.');
    
    const expected = {
        dir: __dirname,
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
        rules: {
            'remove-only': 'on',
        },
        plugins: [`import:${CWD}/putout-plugin-hello`],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parseOptions: read rules', (t) => {
    const empty = {};
    
    const readOptions = stub().returns([__dirname, empty]);
    const readHomeOptions = stub().returns(empty);
    const readCodeMods = stub().returns(empty);
    
    mockRequire('../../putout.json', empty);
    mockRequire('node:fs', {
        readdirSync: stub().returns(['hello']),
    });
    
    const plugin = stub();
    mockRequire(join(process.cwd(), 'hello'), plugin);
    
    const parseOptions = reRequire('.');
    
    const options = {
        rules: {
            'remove-only': 'off',
        },
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
    };
    
    const result = parseOptions({
        name: 'parse-options.spec.js',
        options,
        readOptions,
        readHomeOptions,
        readCodeMods,
        rulesdir: '.',
    });
    
    const expected = {
        dir: __dirname,
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
        rules: {
            'remove-only': 'on',
        },
        plugins: [`import:${CWD}/hello`],
    };
    
    stopAll();
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parseOptions: read rules: not-rule-', (t) => {
    const empty = {};
    
    const readOptions = stub().returns([__dirname, empty]);
    const readHomeOptions = stub().returns(empty);
    const readCodeMods = stub().returns(empty);
    
    mockRequire('../../putout.json', empty);
    mockRequire('node:fs', {
        readdirSync: stub().returns(['not-rule-world', 'hello']),
    });
    
    const plugin = stub();
    mockRequire(join(process.cwd(), 'hello'), plugin);
    
    const parseOptions = reRequire('.');
    
    const options = {
        rules: {
            'remove-only': 'off',
        },
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
    };
    
    const result = parseOptions({
        name: 'parse-options.spec.js',
        options,
        readOptions,
        readHomeOptions,
        readCodeMods,
        rulesdir: '.',
    });
    
    const expected = {
        dir: __dirname,
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
        rules: {
            'remove-only': 'on',
        },
        plugins: [`import:${CWD}/hello`],
    };
    
    stopAll();
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parseOptions: read rules: *.md', (t) => {
    const empty = {};
    
    const readOptions = stub().returns([__dirname, empty]);
    const readHomeOptions = stub().returns(empty);
    const readCodeMods = stub().returns(empty);
    
    mockRequire('../../putout.json', empty);
    mockRequire('node:fs', {
        readdirSync: stub().returns(['README.md', 'hello']),
    });
    
    const plugin = stub();
    mockRequire(join(process.cwd(), 'hello'), plugin);
    
    const parseOptions = reRequire('.');
    const options = {
        rules: {
            'remove-only': 'off',
        },
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
    };
    
    const result = parseOptions({
        name: 'parse-options.spec.js',
        options,
        readOptions,
        readHomeOptions,
        readCodeMods,
        rulesdir: '.',
    });
    
    const expected = {
        dir: __dirname,
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
        rules: {
            'remove-only': 'on',
        },
        plugins: [`import:${CWD}/hello`],
    };
    
    stopAll();
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parseOptions: read rules: .', (t) => {
    const empty = {};
    
    const readOptions = stub().returns([__dirname, empty]);
    const readHomeOptions = stub().returns(empty);
    const readCodeMods = stub().returns(empty);
    
    mockRequire('../../putout.json', empty);
    mockRequire('node:fs', {
        readdirSync: stub().returns(['.rule-world', 'hello']),
    });
    
    const plugin = stub();
    mockRequire(join(process.cwd(), 'hello'), plugin);
    
    const parseOptions = reRequire('.');
    
    const options = {
        rules: {
            'remove-only': 'off',
        },
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
    };
    
    const result = parseOptions({
        name: 'parse-options.spec.js',
        options,
        readOptions,
        readHomeOptions,
        readCodeMods,
        rulesdir: '.',
    });
    
    const expected = {
        dir: __dirname,
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
        rules: {
            'remove-only': 'on',
        },
        plugins: [`import:${CWD}/hello`],
    };
    
    stopAll();
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parseOptions: read rules: error', (t) => {
    const empty = {};
    
    const readOptions = stub().returns([__dirname, empty]);
    const readHomeOptions = stub().returns(empty);
    const readCodeMods = stub().returns(empty);
    
    mockRequire('../../putout.json', empty);
    
    const {readdirSync} = fs;
    
    mockRequire('node:fs', {
        readdirSync: stub().throws('error'),
    });
    
    const parseOptions = reRequire('.');
    
    const options = {
        rules: {
            'remove-only': 'off',
        },
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
    };
    
    const result = parseOptions({
        name: 'parse-options.spec.js',
        options,
        readOptions,
        readHomeOptions,
        readCodeMods,
        rulesdir: '.',
    });
    
    const expected = {
        dir: __dirname,
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
        rules: {
            'remove-only': 'on',
        },
    };
    
    stopAll();
    fs.readdirSync = readdirSync;
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parseOptions: readOptions: do not returns dir, load rules can not read', (t) => {
    const empty = {};
    
    const readHomeOptions = stub().returns(empty);
    const readCodeMods = stub().returns(empty);
    const readOptions = stub().returns(['', empty]);
    
    mockRequire('../../putout.json', empty);
    
    const {readdirSync} = fs;
    
    fs.readdirSync = () => {
        throw 'error';
    };
    
    const parseOptions = reRequire('.');
    
    const options = {
        rules: {
            'remove-only': 'off',
        },
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
    };
    
    const result = parseOptions({
        name: 'parse-options.spec.js',
        options,
        readHomeOptions,
        readCodeMods,
        readOptions,
        rulesdir: '.',
    });
    
    const expected = {
        dir: '',
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
        rules: {
            'remove-only': 'on',
        },
    };
    
    stopAll();
    fs.readdirSync = readdirSync;
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parseOptions: readOptions: .putout.json', (t) => {
    const empty = {};
    
    const readHomeOptions = stub().returns(empty);
    const readCodeMods = stub().returns(empty);
    const readOptions = stub().returns(['../..', {}]);
    
    mockRequire('../../putout.json', empty);
    
    const {readdirSync} = fs;
    
    fs.readdirSync = () => {
        throw 'error';
    };
    
    const parseOptions = reRequire('.');
    
    const options = {
        rules: {
            'remove-only': 'off',
        },
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
    };
    
    const result = parseOptions({
        name: 'parse-options.spec.js',
        options,
        readHomeOptions,
        readCodeMods,
        readOptions,
        rulesdir: '.',
    });
    
    const expected = {
        dir: '../..',
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
        rules: {
            'remove-only': 'on',
        },
    };
    
    stopAll();
    fs.readdirSync = readdirSync;
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parseOptions: can not readd dir', (t) => {
    const empty = {};
    
    const readHomeOptions = stub().returns(empty);
    const readCodeMods = stub().returns(empty);
    const readOptions = stub().returns(['.', empty]);
    
    mockRequire('../../putout.json', empty);
    
    const {readdirSync} = fs;
    
    fs.readdirSync = () => {
        throw 'error';
    };
    
    const parseOptions = reRequire('.');
    
    const options = {
        rules: {
            'remove-only': 'off',
        },
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
    };
    
    const result = parseOptions({
        name: 'parse-options.spec.js',
        options,
        readHomeOptions,
        readCodeMods,
        readOptions,
        rulesdir: '.',
    });
    
    const expected = {
        dir: '.',
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
        rules: {
            'remove-only': 'on',
        },
    };
    
    stopAll();
    fs.readdirSync = readdirSync;
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parseOptions: readHomeOptions: .', (t) => {
    const empty = {};
    
    const readOptions = stub().returns(['.', {
        rules: {
            'remove-console': 'off',
        },
    }]);
    
    const readCodeMods = stub().returns(empty);
    
    mockRequire('node:fs', {
        readdirSync: stub().throws('error'),
    });
    
    mockRequire('./package.json', empty);
    mockRequire('../../putout.json', empty);
    
    const parseOptions = reRequire('.');
    
    const options = {
        rules: {
            'remove-only': 'off',
        },
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
    };
    
    const result = parseOptions({
        name: 'parse-options.spec.js',
        options,
        readOptions,
        readCodeMods,
        rulesdir: '.',
    });
    
    const expected = {
        dir: '.',
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
        rules: {
            'remove-console': 'off',
            'remove-only': 'on',
        },
    };
    
    stopAll();
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parseOptions: no args', (t) => {
    const empty = {};
    const {homedir} = os;
    const read = stub().returns(['', {}]);
    
    os.homedir = stub().returns('/');
    
    mockRequire('./recursive-read', read);
    mockRequire('./package.json', empty);
    mockRequire('../../putout.json', empty);
    mockRequire('escalade/sync', stub());
    
    const parseOptions = reRequire('.');
    const result = parseOptions();
    
    const expected = {
        dir: '',
    };
    
    os.homedir = homedir;
    
    stopAll();
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parseOptions: readOptions: package.json', (t) => {
    const empty = {};
    
    const readHomeOptions = stub().returns(empty);
    const readCodeMods = stub().returns(empty);
    const read = stub().returns(['', {}]);
    
    mockRequire('../../putout.json', empty);
    mockRequire('./recursive-read', read);
    
    const parseOptions = reRequire('.');
    
    const options = {
        rules: {
            'remove-only': 'off',
        },
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
    };
    
    const result = parseOptions({
        name: __filename,
        options,
        readHomeOptions,
        readCodeMods,
    });
    
    delete result.dir;
    
    const expected = {
        match: {
            '*.js': {
                'nodejs/convert-esm-to-commonjs': 'on',
            },
            '.eslintrc.json': {
                'eslint': 'on',
                'eslint/convert-require-to-import': 'off',
            },
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
        rules: {
            'remove-only': 'on',
            'nodejs/convert-esm-to-commonjs': 'on',
        },
    };
    
    stopAll();
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parseOptions: readOptions: no options but package.json', (t) => {
    const empty = {};
    
    const readHomeOptions = stub().returns(empty);
    const readCodeMods = stub().returns(empty);
    const read = stub().returns(['', {}]);
    
    mockRequire('../../package.json', {
        type: 'module',
    });
    
    mockRequire('../../putout.json', empty);
    mockRequire('./recursive-read', read);
    
    const parseOptions = reRequire('.');
    const options = {};
    
    const result = parseOptions({
        name: __filename,
        options,
        readHomeOptions,
        readCodeMods,
    });
    
    delete result.dir;
    
    const expected = {
        match: {
            '*.js': {
                'nodejs/convert-commonjs-to-esm': 'on',
                'nodejs/add-strict-mode': 'off',
            },
            '.eslintrc.json': {
                'eslint': 'on',
                'eslint/convert-require-to-import': 'on',
            },
            '{test,*.spec.js}': {
                'tape/convert-mock-require-to-mock-import': 'on',
            },
        },
        rules: {
            'nodejs/convert-commonjs-to-esm': 'on',
            'nodejs/add-strict-mode': 'off',
            'tape/convert-mock-require-to-mock-import': 'on',
        },
    };
    
    stopAll();
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parseOptions: rules dir: no once', (t) => {
    const empty = {};
    
    const readOptions = stub().returns([__dirname, empty]);
    const readHomeOptions = stub().returns(empty);
    const readCodeMods = stub().returns(empty);
    const hello = stub();
    
    mockRequire('../../putout.json', empty);
    
    const {readdirSync} = fs;
    const readdirSyncStub = stub().returns([]);
    
    fs.readdirSync = readdirSyncStub;
    
    mockRequire(join(__dirname, 'hello'), hello);
    
    const parseOptions = reRequire('.');
    const options = {
        rules: {
            'remove-only': 'off',
        },
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
    };
    
    parseOptions({
        name: 'parse-options.spec.js',
        options,
        readOptions,
        readHomeOptions,
        readCodeMods,
        rulesdir: 'hello',
    });
    
    parseOptions({
        name: 'parse-options.spec.js',
        options,
        readOptions,
        readHomeOptions,
        readCodeMods,
        rulesdir: 'world',
    });
    
    stopAll();
    fs.readdirSync = readdirSync;
    reRequire('.');
    
    t.calledTwice(readdirSyncStub);
    t.end();
});

test('putout: parse-options: defaults: no strict-mode/add', (t) => {
    const options = {
        rules: {
            'strict-mode': 'off',
        },
    };
    
    const {rules} = parseOptions({
        name: 'index.js',
        options,
    });
    
    const result = rules['strict-mode/add'];
    
    t.notOk(result);
    t.end();
});

test('putout: parse-options: defaults: strict-mode off', (t) => {
    const options = {
        rules: {
            'strict-mode': 'off',
        },
    };
    
    const {rules} = parseOptions({
        name: 'index.js',
        options,
    });
    
    const result = rules['strict-mode'];
    
    t.equal(result, 'off');
    t.end();
});

test('putout: parse-options: invalid', (t) => {
    const options = {
        exclude: ['.md'],
    };
    
    const [error] = tryCatch(parseOptions, {
        name: 'index.js',
        options,
    });
    
    t.equal(error.message, '.putout.json: exclude: must NOT have additional properties');
    t.end();
});
