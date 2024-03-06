import {test, stub} from 'supertape';
import tryToCatch from 'try-to-catch';
import {getESLint} from './get-eslint.mjs';

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
        name: 'index.js',
        fix: false,
        loadESLintOverride,
    });
    
    const expected = [{
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
    const find = stub().returns('/eslint.config.js');
    
    await getESLint({
        name: 'index.js',
        loadESLintOverride,
        find,
        fix: false,
        overrideConfigFile: 'other.config.js',
    });
    
    const expected = [{
        fix: false,
        overrideConfig: {
            ignores: ['!.*'],
        },
        overrideConfigFile: 'other.config.js',
    }];
    
    t.calledWith(ESLintOverride, expected);
    t.end();
});
