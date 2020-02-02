'use strict';

const fs = require('fs');
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
            'spec.js$': {
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
        name: 'parse-options.spec.js',
        options,
        readOptions,
        readHomeOptions,
        readCodeMods,
    });
    
    const expected = {
        dir: __dirname,
        match: {
            'spec.js$': {
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
            'spec.js$': {
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
            'spec.js$': {
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
            'spec.js$': {
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
            'spec.js$': {
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

