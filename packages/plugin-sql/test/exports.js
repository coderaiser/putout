import {test} from 'supertape';

test('putout: plugin-sql: exports: convert-sqlite-to-postgresql', async (t) => {
    const result = await import('@putout/plugin-sql/convert-sqlite-to-postgres');
    const expected = await import('../lib/convert-sqlite-to-postgres/index.js');
    
    t.equal(result, expected);
    t.end();
});
