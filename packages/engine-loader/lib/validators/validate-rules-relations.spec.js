'use strict';

const {test} = require('supertape');
const tryCatch = require('try-catch');
const {validateRulesRelations} = require('./validate-rules-relations.js');

test('@putout/engine-loader: validateRulesRelations', (t) => {
    const [error] = tryCatch(validateRulesRelations, {
        rules: {
            '@ishvara/plugin-putout/declare': 'on',
        },
        pluginNames: [
            '@ishvara/plugin-putout',
        ],
    });
    
    t.notOk(error?.message);
    t.end();
});
