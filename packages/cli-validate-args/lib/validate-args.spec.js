'use strict';

const test = require('supertape');
const validateArgs = require('./validate-args');

test('putout: cli: validate args: invalid: suggest', async (t) => {
    const args = {
        _: [],
        fi: true,
    };
    
    const error = await validateArgs(args, ['fix']);
    
    t.equal(error.message, 'Invalid option `--fi`. Perhaps you meant `--fix`');
    t.end();
});

test('putout: cli: validate args: valid', async (t) => {
    const args = {
        _: [],
        fix: true,
    };
    
    const error = await validateArgs(args, ['fix']);
    
    t.notOk(error);
    t.end();
});

test('putout: cli: validate args: invalid', async (t) => {
    const args = {
        _: [],
        f: true,
    };
    
    const error = await validateArgs(args, ['fix']);
    
    t.equal(error.message, `Invalid option '-f'`);
    t.end();
});

