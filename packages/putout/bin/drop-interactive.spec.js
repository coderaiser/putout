import {test} from 'supertape';
import {dropInteractive} from './drop-interactive.js';

test('putout: bin: dropInteractive', (t) => {
    const result = dropInteractive(['-i']);
    const expected = [];
    
    t.deepEqual(result, expected);
    t.end();
});
