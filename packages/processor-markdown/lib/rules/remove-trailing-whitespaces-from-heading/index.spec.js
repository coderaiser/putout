import {test} from 'supertape';
import * as removeTrailing from './index.js';

test('processor-markdown: remove-trailing: report', (t) => {
    const result = removeTrailing.report();
    const expected = 'Avoid trailing whitespaces';
    
    t.equal(result, expected);
    t.end();
});
