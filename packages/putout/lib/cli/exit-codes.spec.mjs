import test from 'supertape';
import * as exitCodes from './exit-codes.mjs';

test('putout: cli: exit-codes: mjs', async (t) => {
    const cjs = await import('./exit-codes.js');
    
    t.deepEqual(cjs.default, exitCodes);
    t.end();
});

