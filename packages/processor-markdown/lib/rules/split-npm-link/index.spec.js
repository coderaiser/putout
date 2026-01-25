import {test} from 'supertape';
import * as splitNpmLink from './index.js';

test('processor-markdown: split-npm-link: report', (t) => {
    const result = splitNpmLink.report();
    const expected = 'Split npm link';
    
    t.equal(result, expected);
    t.end();
});
