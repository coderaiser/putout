'use strict';

const test = require('supertape');
const {parseRules} = require('./parse-rules');
const {isEnabled} = require('./is-enabled');

test('putout: get-plugins: is-enabled', (t) => {
    const name = 'madrun/add-function';
    
    const rules = [{
        rule: 'remove-unused-variables',
        state: true,
    }, {
        rule: 'madrun/*',
        state: false,
    }];
    
    const result = isEnabled(name, rules);
    
    t.notOk(result, 'should be disaabled');
    t.end();
});

test('putout: get-plugins: is-enabled: not found', (t) => {
    const name = 'madrun/add-function';
    
    const rules = parseRules({
        'madrun/add-function': false,
    });
    
    const result = isEnabled(name, rules);
    
    t.notOk(result);
    t.end();
});

test('putout: get-plugins: is-enabled: rule names cross', (t) => {
    const name = 'eslint/move-putout-to-end-of-list';
    
    const rules = [{
        rule: 'putout',
        state: false,
    }, {
        rule: 'eslint',
        state: true,
    }];
    
    const result = isEnabled(name, rules);
    
    t.ok(result, 'should be enabled');
    t.end();
});

test('putout: get-plugins: is-enabled: slash', (t) => {
    const name = 'nodejs/convert-commonjs-to-esm-require';
    
    const rules = parseRules({
        'nodejs': true,
        'nodejs/convert-commonjs-to-esm': false,
    });
    
    const result = isEnabled(name, rules);
    
    t.notOk(result);
    t.end();
});

test('putout: get-plugins: is-enabled: off', (t) => {
    const name = 'nodejs/convert-commonjs-to-esm-require';
    
    const rules = parseRules({
        'nodejs': false,
        'nodejs/declare': false,
    });
    
    const result = isEnabled(name, rules);
    
    t.notOk(result);
    t.end();
});

test('putout: get-plugins: is-enabled: similar names: on', (t) => {
    const name = 'eslint-plugin/convert-context-to-source';
    
    const rules = [{
        rule: 'eslint',
        state: false,
    }, {
        rule: 'eslint-plugin',
        state: true,
    }];
    
    const result = isEnabled(name, rules);
    
    t.ok(result);
    t.end();
});
