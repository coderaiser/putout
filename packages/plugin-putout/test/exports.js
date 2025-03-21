import {test} from 'supertape';

test('@putout/plugin-putout: exports', async (t) => {
    const types = await import('@putout/plugin-putout/declare/types');
    const internal = await import('../lib/declare/types.js');
    
    t.equal(types, internal);
    t.end();
});
