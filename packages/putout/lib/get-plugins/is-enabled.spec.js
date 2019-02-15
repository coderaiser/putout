'use strict';

/* eslint node/no-unpublished-require:0 */
const test = require('supertape');
const isEnabled = require('./is-enabled');

test('putout: get-plugins: is-enabled', (t) => {
    const name = 'madrun/add-function';
    const rules = {
        'remove-unused-variables': true,
        'madrun/*': false,
    };
    
    const result = isEnabled(name, rules);
   
    t.notOk(result, 'should be disaabled');
    t.end();
});

test('putout: get-plugins: is-enabled: not found', (t) => {
    const name = 'madrun/add-function';
    const rules = {
        'madrun/add-function': false,
    };
    
    const result = isEnabled(name, rules);
   
    t.notOk(result, 'should be disaabled');
    t.end();
});

