'use strict';

const test = require('supertape');
const montag = require('montag');
const {isJSON} = require('./is-json.cjs');

test('putout: processor-json: is-json', (t) => {
    const result = isJSON(montag`
        __putout_processor_json({
            "hello": "world"
        });
    `);
    
    t.ok(result);
    t.end();
});
