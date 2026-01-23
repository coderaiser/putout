import {test} from 'supertape';

test('@putout/processor-filesystem: exports', async (t) => {
    const {create: exportedCreate} = await import('@putout/processor-filesystem/create');
    const {create} = await import('#create');
    
    t.equal(create, exportedCreate);
    t.end();
});
