import test from 'supertape';
import montag from 'montag';
import {isJSON} from './is-json.js';

test('putout: processor-json: is-json', (t) => {
    const result = isJSON(montag`
        __putout_processor_json({
            "hello": "world"
        });
    `);
    
    t.ok(result);
    t.end();
});
