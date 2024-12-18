'use strict';

const {test} = require('supertape');

test('@putout/plugin-putout: exports', (t) => {
    const types = require('@putout/plugin-putout/declare/types');
    const internal = require('../lib/declare/types.json');
    
    t.equal(types, internal);
    t.end();
});
