'use strict';

const test = require('supertape');
const validateRules = require('./validate-rules');
const tryCatch = require('try-catch');

test('engine-runner: validate-rules', (t) => {
    const items = [
        ['remove-empty'],
    ];
    
    const rules = {
        'remove-empty/import': 'off',
    };
    
    const [e] = tryCatch(validateRules, {
        items,
        rules,
    });
    
    t.notOk(e);
    t.end();
});

test('engine-runner: validate-rules: plugin name with slash', (t) => {
    const items = [
        ['remove-empty/import'],
    ];
    
    const rules = {
        'remove-empty/import': 'off',
    };
    
    const [e] = tryCatch(validateRules, {
        items,
        rules,
    });
    
    t.notOk(e);
    t.end();
});

test('engine-runner: validate-rules: nested plugin', (t) => {
    const items = [
        ['estrace/trace', {
            rules: {},
        }],
    ];
    
    const rules = {
        'estrace/trace': 'off',
    };
    
    const [error] = tryCatch(validateRules, {
        items,
        rules,
    });
    
    t.equal(error.message, 'Rule "estrace/trace" cannot be applied to nested plugin "estrace/trace"');
    t.end();
});
