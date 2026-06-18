import {test} from 'supertape';
import {tryCatch} from 'try-catch';
import {validateRulesRelations} from './validate-rules-relations.js';

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

test('@putout/engine-loader: validateRulesRelations: toggle object', (t) => {
    const [error] = tryCatch(validateRulesRelations, {
        rules: {
            '@ishvara/plugin-putout/declare': [{
                hello: 'world',
            }],
        },
        pluginNames: [
            '@ishvara/plugin-putout',
        ],
    });
    
    t.equal(error.message, `☝️ Looks like 'state' not 'boolean | 'on' | 'off', but: '{"hello":"world"}'`);
    t.end();
});
