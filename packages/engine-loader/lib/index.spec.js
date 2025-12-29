import tryCatch from 'try-catch';
import test from 'supertape';
import {
    loadPlugins,
    validateRulesRelations,
} from './index.js';

test('engine-loader: load-plugins', (t) => {
    const result = loadPlugins({
        pluginNames: ['remove-debugger'],
    });
    
    t.equal(result.length, 1);
    t.end();
});

test('engine-loader: validate-rules: exports', (t) => {
    const pluginNames = [
        ['estrace/trace', {
            rules: {},
        }],
    ];
    
    const rules = {
        'estrace/trace': 'off',
    };
    
    const [error] = tryCatch(validateRulesRelations, {
        pluginNames,
        rules,
    });
    
    t.equal(error.message, `Rule 'estrace/trace' cannot be applied to nested plugin 'estrace/trace'`);
    t.end();
});
