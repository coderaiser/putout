import {test} from 'supertape';

test('@putout/operator-filesystem: exports: maybe', async (t) => {
    const {init} = await import('@putout/operator-filesystem/maybe');
    const {init: _init} = await import('../lib/maybe-fs.js');
    
    t.equal(init, _init);
    t.end();
});
