import {test} from 'supertape';
import {tryCatch} from 'try-catch';
import {_parseName} from './link.js';

test('@putout/compare: link: parseName', (t) => {
    const [error] = tryCatch(_parseName, {
        type: 'x',
    });
    
    t.equal(error.message, `☝️ Looks like type of node 'x' not supported by 'compare -> link -> parseName()'`);
    t.end();
});
