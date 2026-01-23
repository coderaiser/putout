import process from 'node:process';
import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
import {test, stub} from 'supertape';
import {tryCatch} from 'try-catch';
import {parseOptions} from '#parse-options';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const CWD = process.cwd();
const empty = {};

test('putout: parse-options: custom options rules overrides default match', (t) => {
    const customOptions = {
        rules: {
            'remove-only': 'on',
        },
    };
    
    const readOptions = stub().returns([
        new URL('..', import.meta.url).pathname,
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
        new URL('..', import.meta.url).pathname,
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
    
    const defaultOptions = {};
    
    const overrides = {
        defaultOptions,
    };
    
    const result = parseOptions({
        readOptions,
        readHomeOptions,
        readCodeMods,
    }, overrides);
    
    const expected = {
        dir: __dirname,
        rules: {
            'remove-console': 'off',
            'remove-unused-variables': 'off',
        },
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parseOptions: custom options more important then default match', (t) => {
    const readCodeMods = stub().returns([__dirname, empty]);
    const readOptions = stub().returns([__dirname, empty]);
    const readHomeOptions = stub().returns(empty);
    
    const defaultOptions = {
        match: {
            '*.spec.js': {
                'remove-only': 'on',
            },
        },
    };
    
    const options = {
        rules: {
            'remove-only': 'off',
        },
    };
    
    const overrides = {
        defaultOptions,
    };
    
    const result = parseOptions({
        name: 'index.spec.js',
        options,
        readOptions,
        readHomeOptions,
        readCodeMods,
    }, overrides);
    
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
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parseOptions: custom match more important then custom options', (t) => {
    const readCodeMods = stub().returns([__dirname, empty]);
    const readOptions = stub().returns([__dirname, empty]);
    const readHomeOptions = stub().returns(empty);
    
    const defaultOptions = empty;
    
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
    
    const overrides = {
        defaultOptions,
    };
    
    const result = parseOptions({
        name: 'parse-options.spec.js',
        options,
        readOptions,
        readHomeOptions,
        readCodeMods,
    }, overrides);
    
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
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parseOptions: no code mods directory: .putout', (t) => {
    const readOptions = stub().returns([__dirname, empty]);
    const readHomeOptions = stub().returns(empty);
    
    const readdirSync = () => {
        throw 'error';
    };
    
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
    
    const overrides = {
        readdirSync,
        defaultOptions: empty,
    };
    
    const result = parseOptions({
        name: 'parse-options.spec.js',
        options,
        readOptions,
        readHomeOptions,
    }, overrides);
    
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
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parseOptions: code mods directory: .putout: exclude node_modules', (t) => {
    const readOptions = stub().returns([__dirname, empty]);
    const readHomeOptions = stub().returns(empty);
    
    const defaultOptions = empty;
    const readdirSync = stub().returns(['node_modules']);
    
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
    
    const overrides = {
        readdirSync,
        defaultOptions,
    };
    
    const result = parseOptions({
        name: 'parse-options.spec.js',
        options,
        readOptions,
        readHomeOptions,
    }, overrides);
    
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
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parseOptions: read rules: putout-plugin', (t) => {
    const readOptions = stub().returns([__dirname, empty]);
    const readHomeOptions = stub().returns(empty);
    const readCodeMods = stub().returns(empty);
    
    const defaultOptions = empty;
    
    const readdirSync = stub().returns(['putout-plugin-hello']);
    
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
    
    const overrides = {
        defaultOptions,
        readdirSync,
    };
    
    const result = parseOptions({
        name: 'parse-options.spec.js',
        options,
        readOptions,
        readHomeOptions,
        readCodeMods,
        rulesdir: '.',
    }, overrides);
    
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
    const readOptions = stub().returns([__dirname, empty]);
    const readHomeOptions = stub().returns(empty);
    const readCodeMods = stub().returns(empty);
    
    const readdirSync = stub().returns(['hello']);
    
    const overrides = {
        readdirSync,
        defaultOptions: empty,
    };
    
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
    }, overrides);
    
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
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parseOptions: read rules: not-rule-', (t) => {
    const readOptions = stub().returns([__dirname, empty]);
    const readHomeOptions = stub().returns(empty);
    const readCodeMods = stub().returns(empty);
    
    const defaultOptions = empty;
    const readdirSync = stub().returns(['not-rule-world', 'hello']);
    
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
    
    const overrides = {
        defaultOptions,
        readdirSync,
    };
    
    const result = parseOptions({
        name: 'parse-options.spec.js',
        options,
        readOptions,
        readHomeOptions,
        readCodeMods,
        rulesdir: '.',
    }, overrides);
    
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
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parseOptions: read rules: *.md', (t) => {
    const readOptions = stub().returns([__dirname, empty]);
    const readHomeOptions = stub().returns(empty);
    const readCodeMods = stub().returns(empty);
    
    const defaultOptions = empty;
    const readdirSync = stub().returns(['README.md', 'hello']);
    
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
    
    const overrides = {
        defaultOptions,
        readdirSync,
    };
    
    const result = parseOptions({
        name: 'parse-options.spec.js',
        options,
        readOptions,
        readHomeOptions,
        readCodeMods,
        rulesdir: '.',
    }, overrides);
    
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
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parseOptions: read rules: .', (t) => {
    const readOptions = stub().returns([__dirname, empty]);
    const readHomeOptions = stub().returns(empty);
    const readCodeMods = stub().returns(empty);
    
    const readdirSync = stub().returns(['.rule-world', 'hello']);
    
    const overrides = {
        defaultOptions: empty,
        readdirSync,
    };
    
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
    }, overrides);
    
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
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parseOptions: read rules: error', (t) => {
    const readOptions = stub().returns([__dirname, empty]);
    const readHomeOptions = stub().returns(empty);
    const readCodeMods = stub().returns(empty);
    
    const readdirSync = stub().throws('error');
    const overrides = {
        defaultOptions: empty,
        readdirSync,
    };
    
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
    }, overrides);
    
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
    
    fs.readdirSync = readdirSync;
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parseOptions: readOptions: do not returns dir, load rules can not read', (t) => {
    const readHomeOptions = stub().returns(empty);
    const readCodeMods = stub().returns(empty);
    const readOptions = stub().returns(['', empty]);
    
    const readdirSync = () => {
        throw 'error';
    };
    
    const overrides = {
        defaultOptions: empty,
        readdirSync,
    };
    
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
    }, overrides);
    
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
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parseOptions: readOptions: .putout.json', (t) => {
    const readHomeOptions = stub().returns(empty);
    const readCodeMods = stub().returns(empty);
    const readOptions = stub().returns(['../..', {}]);
    
    const readdirSync = () => {
        throw 'error';
    };
    
    const overrides = {
        readdirSync,
        defaultOptions: empty,
    };
    
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
    }, overrides);
    
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
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parseOptions: can not readd dir', (t) => {
    const readHomeOptions = stub().returns(empty);
    const readCodeMods = stub().returns(empty);
    const readOptions = stub().returns(['.', empty]);
    
    const readdirSync = () => {
        throw 'error';
    };
    
    const overrides = {
        readdirSync,
        defaultOptions: empty,
    };
    
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
    }, overrides);
    
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
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parseOptions: readHomeOptions: .', (t) => {
    const readOptions = stub().returns(['.', {
        rules: {
            'remove-console': 'off',
        },
    }]);
    
    const readCodeMods = stub().returns(empty);
    
    const readdirSync = stub().throws('error');
    const defaultOptions = empty;
    
    const overrides = {
        defaultOptions,
        readdirSync,
    };
    
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
    }, overrides);
    
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
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parseOptions: no args', (t) => {
    const recursiveRead = stub().returns(['', {}]);
    const homedir = stub().returns('/');
    const escalade = stub();
    const readHomeOptions = stub().returns({});
    
    const info = {
        readHomeOptions,
    };
    
    const result = parseOptions(info, {
        homedir,
        recursiveRead,
        defaultOptions: {},
        escalade,
    });
    
    const expected = {
        dir: '',
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parseOptions: readOptions: package.json', (t) => {
    const readHomeOptions = stub().returns(empty);
    const readCodeMods = stub().returns(empty);
    const recursiveRead = stub().returns(['', {}]);
    
    const readPackageJson = stub().returns(['../../package.json', {
        type: 'commonjs',
    }]);
    
    const overrides = {
        recursiveRead,
        defaultOptions: {},
        readPackageJson,
    };
    
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
    }, overrides);
    
    delete result.dir;
    
    const expected = {
        match: {
            '*.js': {
                'nodejs/convert-esm-to-commonjs': 'on',
                'nodejs/add-missing-strict-mode': 'on',
                'nodejs/remove-useless-strict-mode': 'off',
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
            'nodejs/add-missing-strict-mode': 'on',
            'nodejs/remove-useless-strict-mode': 'off',
        },
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parseOptions: readOptions: no options but package.json', (t) => {
    const readHomeOptions = stub().returns(empty);
    const readCodeMods = stub().returns(empty);
    const recursiveRead = stub().returns(['', {}]);
    
    const readPackageJson = stub().returns(['../../package.json', {
        type: 'module',
    }]);
    
    const overrides = {
        recursiveRead,
        defaultOptions: empty,
        readPackageJson,
    };
    
    const options = {};
    
    const result = parseOptions({
        name: __filename,
        options,
        readHomeOptions,
        readCodeMods,
    }, overrides);
    
    delete result.dir;
    
    const expected = {
        match: {
            '*.js': {
                'nodejs/convert-commonjs-to-esm': 'on',
                'nodejs/add-missing-strict-mode': 'off',
                'nodejs/remove-useless-strict-mode': 'on',
            },
            '.eslintrc.json': {
                'eslint': 'on',
                'eslint/convert-require-to-import': 'on',
            },
        },
        rules: {
            'nodejs/convert-commonjs-to-esm': 'on',
            'nodejs/add-missing-strict-mode': 'off',
            'nodejs/remove-useless-strict-mode': 'on',
        },
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: parseOptions: rules dir: no once', (t) => {
    const readOptions = stub().returns([__dirname, empty]);
    const readHomeOptions = stub().returns(empty);
    const readCodeMods = stub().returns(empty);
    
    const readdirSync = stub().returns([]);
    const overrides = {
        defaultOptions: empty,
        readdirSync,
    };
    
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
    }, overrides);
    
    parseOptions({
        name: 'parse-options.spec.js',
        options,
        readOptions,
        readHomeOptions,
        readCodeMods,
        rulesdir: 'world',
    });
    
    t.calledOnce(readdirSync);
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
