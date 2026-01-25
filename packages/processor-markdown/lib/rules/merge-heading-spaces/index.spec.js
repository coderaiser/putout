import {test} from 'supertape';
import * as mergeHeadingSpaces from './index.js';

test('processor-markdown: merge-heading-spaces: report', (t) => {
    const result = mergeHeadingSpaces.report();
    const expected = 'Merge heading spaces';
    
    t.equal(result, expected);
    t.end();
});
