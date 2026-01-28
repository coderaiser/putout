import {test} from 'supertape';

test('putout: cli-choose: exports: keypress', async (t) => {
    const {initKeypressListen: result} = await import('@putout/cli-choose/keypress');
    const {initKeypressListen: expected} = await import('../lib/keypress.js');
    
    t.equal(result, expected);
    t.end();
});
