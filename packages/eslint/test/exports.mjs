import {test} from 'supertape';

test('@putout/eslint: exports: create-plugin', async (t) => {
    const {createPlugin: original} = await import('../lib/create-plugin/index.js');
    const {createPlugin} = await import('@putout/eslint/create-plugin');
    
    t.equal(createPlugin, original);
    t.end();
});
