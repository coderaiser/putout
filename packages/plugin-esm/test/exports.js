import {test} from 'supertape';

test('@putout/plugin-esm: exports: merge-duplicate-imports', async (t) => {
    const exported = await import('@putout/plugin-esm/merge-duplicate-imports');
    const internal = await import('../lib/merge-duplicate-imports/index.js');
    
    t.equal(exported, internal);
    t.end();
});
