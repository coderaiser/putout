import {test} from 'supertape';
import tryCatch from 'try-catch';
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
