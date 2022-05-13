import {test} from 'supertape';
import {createTest} from './index.mjs';

test('test: exported: processor: esm', async (t) => {
    const result = await import('@putout/test/processor');
    const expected = await import('./index.mjs');
    
    t.equal(result, expected);
    t.end();
});

test('test: exported: processor: createTest', (t) => {
    t.equal(typeof createTest(import.meta.url), 'function');
    t.end();
});
