'use strict';

const test = require('supertape');
const {isJS} = require('./supported-files');

test('putout: isJS: tsx', (t) => {
    const result = isJS('index.tsx');
    
    t.ok(result);
    t.end();
});

test('putout: isJS: mjs', (t) => {
    const result = isJS('index.mjs');
    
    t.ok(result);
    t.end();
});
