import {test} from 'supertape';
import removeTrailing from './remove-trailing-whitespaces-from-heading.js';

test('processor-markdown: remove-trailing: report', (t) => {
    const result = removeTrailing.report();
    const expected = 'Avoid trailing whitespaces';
    
    t.equal(result, expected);
    t.end();
});
