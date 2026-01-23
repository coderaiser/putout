import {test} from 'supertape';

test('@putout/processor-filesystem: exports', async (t) => {
    const {create: exportedCreate} = await import('@putout/processor-filesystem/create');
    const {create} = await import('../lib/create.js');
    
    t.equal(create, exportedCreate);
    t.end();
});
