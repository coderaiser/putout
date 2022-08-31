import {
    test,
    stub,
} from 'supertape';
import tryToCatch from 'try-to-catch';
import {getESLint} from './get-eslint.mjs';

test('putout: eslint: get-eslint: config: putout', (t) => {
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
    
    getESLint({
        name: 'index.js',
        fix: false,
        ESLintOverride,
    });
    
    const expected = [{
        fix: false,
        overrideConfig: {
            ignorePatterns: [
                '!.*',
            ],
        },
    }];
    
    t.calledWith(ESLintOverride, expected);
    t.end();
});

test('putout: eslint: get-eslint: config: putout: new', (t) => {
    const calculateConfigForFile = stub().resolves({});
    
    const lintText = stub().returns([]);
    const ESLintOverride = stub().returns({
        calculateConfigForFile,
        lintText,
    });
    
    getESLint({
        name: 'index.js',
        ESLintOverride,
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
    
    const eslint = getESLint({
        name: 'index.js',
        ESLintOverride,
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
    
    const eslint = getESLint({
        name: 'index.js',
        ESLintOverride,
        find,
    });
    
    const [configError] = await tryToCatch(eslint.calculateConfigForFile, 'hello');
    
    t.equal(configError, error);
    t.end();
});

test('putout: eslint: get-eslint: flat: overrideConfigFile', (t) => {
    const lintText = stub();
    const error = Error('hello');
    const calculateConfigForFile = stub().rejects(error);
    
    const ESLintOverride = stub().returns({
        calculateConfigForFile,
        lintText,
    });
    
    const find = stub().returns('/eslint.config.js');
    getESLint({
        name: 'index.js',
        ESLintOverride,
        find,
        fix: false,
        overrideConfigFile: 'other.config.js',
    });
    
    const expected = [{
        fix: false,
        overrideConfig: {
            ignores: ['!.*',
            ],
        },
        overrideConfigFile: 'other.config.js',
    }];
    
    t.calledWith(ESLintOverride, expected);
    t.end();
});

