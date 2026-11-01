import process from 'node:process';
import {test, stub} from 'supertape';
import {tryToCatch} from 'try-to-catch';
import {getESLint} from './get-eslint.js';

const noop = () => {};

const CWD = process.cwd();

test('putout: eslint: get-eslint: config: putout', async (t) => {
    const calculateConfigForFile = stub().resolves({
        rules: {
            'putout/remove-unused-variabls': 'error',
        },
    });
    
    const lintText = stub().returns([]);
    
    const ESLintOverride = stub().returns({
        calculateConfigForFile,
        lintText,
    });
    
    const loadESLintOverride = stub().resolves(ESLintOverride);
    
    await getESLint({
        name: new URL('index.js', import.meta.url).pathname,
        fix: false,
        loadESLintOverride,
    });
    
    const expected = [{
        cwd: CWD,
        fix: false,
        overrideConfig: [{
            ignores: ['!.*'],
        }],
    }];
    
    t.calledWith(ESLintOverride, expected);
    t.end();
});

test('putout: eslint: get-eslint: config: putout: new', async (t) => {
    const calculateConfigForFile = stub().resolves({});
    const lintText = stub().returns([]);
    
    const ESLintOverride = stub().returns({
        calculateConfigForFile,
        lintText,
    });
    
    const loadESLintOverride = stub().resolves(ESLintOverride);
    
    await getESLint({
        name: 'index.js',
        loadESLintOverride,
    });
    
    t.calledWithNew(ESLintOverride);
    t.end();
});

test('putout: eslint: get-eslint: no config found', async (t) => {
    const lintText = stub();
    const error = Error('hello');
    const calculateConfigForFile = stub().rejects(error);
    
    const ESLintOverride = stub().returns({
        calculateConfigForFile,
        lintText,
    });
    
    const loadESLintOverride = stub().resolves(ESLintOverride);
    
    const eslint = await getESLint({
        name: 'index.js',
        loadESLintOverride,
    });
    
    const [configError] = await tryToCatch(eslint.calculateConfigForFile, 'hello');
    
    t.equal(configError, error);
    t.end();
});

test('putout: eslint: get-eslint: flat', async (t) => {
    const lintText = stub();
    const error = Error('hello');
    const calculateConfigForFile = stub().rejects(error);
    const find = stub().returns('/eslint.config.js');
    
    const ESLintOverride = stub().returns({
        calculateConfigForFile,
        lintText,
    });
    
    const loadESLintOverride = stub().resolves(ESLintOverride);
    
    const eslint = await getESLint({
        name: 'index.js',
        loadESLintOverride,
        find,
    });
    
    const [configError] = await tryToCatch(eslint.calculateConfigForFile, 'hello');
    
    t.equal(configError, error);
    t.end();
});

test('putout: eslint: get-eslint: flat: overrideConfigFile', async (t) => {
    const lintText = stub();
    const error = Error('hello');
    const calculateConfigForFile = stub().rejects(error);
    
    const ESLintOverride = stub().returns({
        calculateConfigForFile,
        lintText,
    });
    
    const loadESLintOverride = stub().resolves(ESLintOverride);
    const find = stub().returns('/hello/world/eslint.config.js');
    
    await getESLint({
        name: 'index.js',
        loadESLintOverride,
        find,
        fix: false,
        overrideConfigFile: 'other.config.js',
    });
    
    const expected = [{
        cwd: CWD,
        fix: false,
        overrideConfig: [{
            ignores: ['!.*'],
        }],
        overrideConfigFile: 'other.config.js',
    }];
    
    t.calledWith(ESLintOverride, expected);
    t.end();
});

test('putout: eslint: get-eslint: flat: no overrides', async (t) => {
    const lintText = stub();
    const error = Error('hello');
    const calculateConfigForFile = stub().rejects(error);
    
    const ESLintOverride = stub().returns({
        calculateConfigForFile,
        lintText,
    });
    
    const loadESLintOverride = stub().resolves(ESLintOverride);
    
    await getESLint({
        name: 'index.js',
        loadESLintOverride,
        fix: false,
    });
    
    const expected = [{
        cwd: CWD,
        fix: false,
        overrideConfig: [{
            ignores: ['!.*'],
        }],
    }];
    
    t.calledWith(ESLintOverride, expected);
    t.end();
});

const createLoader = () => {
    const ESLintOverride = stub().returns({
        calculateConfigForFile: stub(),
        lintText: stub(),
    });
    
    const loadESLintOverride = stub().resolves(ESLintOverride);
    
    return {
        ESLintOverride,
        loadESLintOverride,
    };
};

test('putout: eslint: get-eslint: reuse: same options: created once', async (t) => {
    const {
        ESLintOverride,
        loadESLintOverride,
    } = createLoader();
    
    await getESLint({
        name: 'index.js',
        loadESLintOverride,
    });
    
    await getESLint({
        name: 'other.js',
        loadESLintOverride,
    });
    
    t.calledOnce(ESLintOverride);
    t.end();
});

test('putout: eslint: get-eslint: reuse: same options: same result', async (t) => {
    const {loadESLintOverride} = createLoader();
    
    const first = await getESLint({
        name: 'index.js',
        loadESLintOverride,
    });
    
    const second = await getESLint({
        name: 'other.js',
        loadESLintOverride,
    });
    
    t.equal(first, second);
    t.end();
});

test('putout: eslint: get-eslint: reuse: other directory: created once', async (t) => {
    const {
        ESLintOverride,
        loadESLintOverride,
    } = createLoader();
    
    await getESLint({
        name: '/hello/index.js',
        loadESLintOverride,
    });
    
    await getESLint({
        name: '/world/lib/index.js',
        loadESLintOverride,
    });
    
    t.calledOnce(ESLintOverride);
    t.end();
});

test('putout: eslint: get-eslint: reuse: equal config, other object: created once', async (t) => {
    const {
        ESLintOverride,
        loadESLintOverride,
    } = createLoader();
    
    await getESLint({
        name: 'index.js',
        config: [{
            rules: {
                'no-var': 'error',
            },
        }],
        loadESLintOverride,
    });
    
    await getESLint({
        name: 'index.js',
        config: [{
            rules: {
                'no-var': 'error',
            },
        }],
        loadESLintOverride,
    });
    
    t.calledOnce(ESLintOverride);
    t.end();
});

test('putout: eslint: get-eslint: reuse: other fix: created twice', async (t) => {
    const {
        ESLintOverride,
        loadESLintOverride,
    } = createLoader();
    
    await getESLint({
        name: 'index.js',
        fix: false,
        loadESLintOverride,
    });
    
    await getESLint({
        name: 'index.js',
        fix: true,
        loadESLintOverride,
    });
    
    t.calledCount(ESLintOverride, 2);
    t.end();
});

test('putout: eslint: get-eslint: reuse: other putout: created twice', async (t) => {
    const {
        ESLintOverride,
        loadESLintOverride,
    } = createLoader();
    
    await getESLint({
        name: 'index.js',
        putout: false,
        loadESLintOverride,
    });
    
    await getESLint({
        name: 'index.js',
        putout: true,
        loadESLintOverride,
    });
    
    t.calledCount(ESLintOverride, 2);
    t.end();
});

test('putout: eslint: get-eslint: reuse: other config: created twice', async (t) => {
    const {
        ESLintOverride,
        loadESLintOverride,
    } = createLoader();
    
    await getESLint({
        name: 'index.js',
        config: [{
            rules: {
                'no-var': 'error',
            },
        }],
        loadESLintOverride,
    });
    
    await getESLint({
        name: 'index.js',
        config: [{
            rules: {
                'no-var': 'off',
            },
        }],
        loadESLintOverride,
    });
    
    t.calledCount(ESLintOverride, 2);
    t.end();
});

test('putout: eslint: get-eslint: reuse: other overrideConfigFile: created twice', async (t) => {
    const {
        ESLintOverride,
        loadESLintOverride,
    } = createLoader();
    
    await getESLint({
        name: 'index.js',
        loadESLintOverride,
    });
    
    await getESLint({
        name: 'index.js',
        overrideConfigFile: 'other.config.js',
        loadESLintOverride,
    });
    
    t.calledCount(ESLintOverride, 2);
    t.end();
});

test('putout: eslint: get-eslint: reuse: config with function: not reused', async (t) => {
    const {
        ESLintOverride,
        loadESLintOverride,
    } = createLoader();
    
    const config = [{
        processor: noop,
    }];
    
    await getESLint({
        name: 'index.js',
        config,
        loadESLintOverride,
    });
    
    await getESLint({
        name: 'index.js',
        config,
        loadESLintOverride,
    });
    
    t.calledCount(ESLintOverride, 2);
    t.end();
});

test('putout: eslint: get-eslint: reuse: other loader: not shared', async (t) => {
    const one = createLoader();
    const two = createLoader();
    
    await getESLint({
        name: 'index.js',
        loadESLintOverride: one.loadESLintOverride,
    });
    
    await getESLint({
        name: 'index.js',
        loadESLintOverride: two.loadESLintOverride,
    });
    
    const result = [
        one.ESLintOverride.callCount,
        two.ESLintOverride.callCount,
    ];
    
    const expected = [1, 1];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: eslint: get-eslint: reuse: overrideConfigFile: not reused', async (t) => {
    const {
        ESLintOverride,
        loadESLintOverride,
    } = createLoader();
    
    await getESLint({
        name: 'index.js',
        overrideConfigFile: 'other.config.js',
        loadESLintOverride,
    });
    
    await getESLint({
        name: 'index.js',
        overrideConfigFile: 'other.config.js',
        loadESLintOverride,
    });
    
    t.calledCount(ESLintOverride, 2);
    t.end();
});

test('putout: eslint: get-eslint: overrideConfigFile: cwd of the file', async (t) => {
    const {
        ESLintOverride,
        loadESLintOverride,
    } = createLoader();
    
    await getESLint({
        name: '/hello/world/index.js',
        fix: false,
        overrideConfigFile: 'other.config.js',
        loadESLintOverride,
    });
    
    const expected = [{
        cwd: '/hello/world',
        fix: false,
        overrideConfig: [{
            ignores: ['!.*'],
        }],
        overrideConfigFile: 'other.config.js',
    }];
    
    t.calledWith(ESLintOverride, expected);
    t.end();
});
