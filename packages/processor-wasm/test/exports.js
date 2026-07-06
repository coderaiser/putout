import {test} from 'supertape';

test('putout: processor-wasm: exports: lint', async (t) => {
    const external = await import('@putout/processor-wasm/lint');
    const internal = await import('../lib/lint.js');
    
    t.equal(external, internal);
    t.end();
});
