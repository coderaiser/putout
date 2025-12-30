import test from 'supertape';
import * as exitCodes from './exit-codes.js';

test('putout: cli: exit-codes: mjs', async (t) => {
    const cjs = await import('./exit-codes.cjs');
    
    t.deepEqual(cjs.default, exitCodes);
    t.end();
});
