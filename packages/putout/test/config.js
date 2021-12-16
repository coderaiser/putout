'use strict';

const test = require('supertape');
const putoutConfig = require('../putout.json');

test('putout: config: ignore: .yarn', (t) => {
    const {ignore} = putoutConfig;
    
    const result = ignore.includes('**/.yarn');
    
    t.ok(result);
    t.end();
});

test('putout: config: ignore: .pnp.*', (t) => {
    const {ignore} = putoutConfig;
    
    const result = ignore.includes('**/.pnp.*');
    
    t.ok(result);
    t.end();
});

