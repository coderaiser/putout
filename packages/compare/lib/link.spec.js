'use strict';

const {test} = require('supertape');
const tryCatch = require('try-catch');
const {_parseName} = require('./link');

test('@putout/compare: link: parseName', (t) => {
    const [error] = tryCatch(_parseName, {
        type: 'x',
    });
    
    t.equal(error.message, `☝️ Looks like type of node 'x' not supported by 'compare -> link -> parseName()'`);
    t.end();
});
