'use strict';

const {join} = require('path');

const test = require('supertape');
const stub = require('@cloudcmd/stub');
const mockRequire = require('mock-require');

const {reRequire, stopAll} = mockRequire;

const parseOptions = require('.');

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

test('putout: parseOptions: readHomeOptions', (t) => {
    const readCodeMods = stub().returns([
        __dirname, {
        },
    
    ]);
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
    
    mockRequire('../../putout.json', {
    });
    
    const parseOptions = reRequire('.');
    
    const result = parseOptions({
        readOptions,
        readHomeOptions,
        readCodeMods,
    });
    
    const expected = {
        dir: '/home/coderaiser/putout/packages/putout/lib/parse-options',
        rules: {
            'remove-console': 'off',
            'remove-unused-variables': 'off',
        },
    };
    
    stopAll();
    
    t.deepEqual(result, expected);
    t.end();
});

