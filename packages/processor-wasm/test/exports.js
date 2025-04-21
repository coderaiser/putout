import {test} from 'supertape';

test('putout: processor-wasm: exports: plugin', async (t) => {
    const external = await import('@putout/processor-wasm/plugin');
    const internal = await import('../lib/rules/index.js');
    
    t.equal(external, internal);
    t.end();
});

test('putout: processor-wasm: exports: lint', async (t) => {
    const external = await import('@putout/processor-wasm/lint');
    const internal = await import('../lib/lint.js');
    
    t.equal(external, internal);
    t.end();
});
