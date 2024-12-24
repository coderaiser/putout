'use strict';

const {test} = require('supertape');

test('@putout/plugin-esm: exports: merge-duplicate-imports', (t) => {
    const exported = require('@putout/plugin-esm/merge-duplicate-imports');
    const internal = require('../lib/merge-duplicate-imports');
    
    t.equal(exported, internal);
    t.end();
});
