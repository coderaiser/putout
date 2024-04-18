import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {test, stub} from 'supertape';
import tryToCatch from 'try-to-catch';
import process from 'node:process';
import {getESLint} from './get-eslint.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
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
        cwd: __dirname,
        fix: false,
        overrideConfig: {
            ignorePatterns: ['!.*'],
        },
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
        overrideConfig: {
            ignores: ['!.*'],
        },
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
    const find = stub().returns('/hello/world/eslint.config.js');
    
    await getESLint({
        name: 'index.js',
        loadESLintOverride,
        find,
        fix: false,
    });
    
    const expected = [{
        cwd: CWD,
        fix: false,
        overrideConfig: {
            ignores: ['!.*'],
        },
    }];
    
    t.calledWith(ESLintOverride, expected);
    t.end();
});

test('putout: eslint: get-eslint: flat: no overrides: rc', async (t) => {
    const lintText = stub();
    const error = Error('hello');
    const calculateConfigForFile = stub().rejects(error);
    
    const ESLintOverride = stub().returns({
        calculateConfigForFile,
        lintText,
    });
    
    const loadESLintOverride = stub().resolves(ESLintOverride);
    const findRC = stub().returns('/hello/world/.eslintrc.json');
    const findFlat = stub().returns('/eslint.config.js');
    
    await getESLint({
        name: 'index.js',
        loadESLintOverride,
        findRC,
        findFlat,
        fix: false,
    });
    
    const expected = [{
        cwd: CWD,
        fix: false,
        overrideConfig: {
            ignorePatterns: ['!.*'],
        },
    }];
    
    t.calledWith(ESLintOverride, expected);
    t.end();
});

test('putout: eslint: get-eslint: overrideConfigFile: rc', async (t) => {
    const lintText = stub();
    const error = Error('hello');
    const calculateConfigForFile = stub().rejects(error);
    
    const ESLintOverride = stub().returns({
        calculateConfigForFile,
        lintText,
    });
    
    const loadESLintOverride = stub().resolves(ESLintOverride);
    const findFlat = stub().returns('/hello/world/eslint.config.js');
    const findRC = stub().returns('/hello/.eslintrc.json');
    
    await getESLint({
        name: 'index.js',
        loadESLintOverride,
        findRC,
        findFlat,
        fix: false,
        overrideConfigFile: '.eslintrc.json',
    });
    
    const expected = [{
        cwd: CWD,
        fix: false,
        overrideConfig: {
            ignorePatterns: ['!.*'],
        },
        overrideConfigFile: '.eslintrc.json',
        useEslintrc: false,
    }];
    
    t.calledWith(ESLintOverride, expected);
    t.end();
});
