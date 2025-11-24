import {test} from 'supertape';
import {dropInteractive} from './drop-interactive.mjs';

test('putout: bin: dropInteractive', (t) => {
    const result = dropInteractive(['-i']);
    const expected = [];
    
    t.deepEqual(result, expected);
    t.end();
});
