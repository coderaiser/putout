import {test} from 'supertape';

test('putout: plugin-sql: exports: convert-sqlite-to-postgres', async (t) => {
    const result = await import('@putout/plugin-sql/convert-sqlite-to-postgres');
    const expected = await import('../lib/convert-sqlite-to-postgres/index.js');
    
    t.equal(result, expected);
    t.end();
});

test('putout: plugin-sql: exports: convert-postgres-to-sqlite', async (t) => {
    const result = await import('@putout/plugin-sql/convert-postgres-to-sqlite');
    const expected = await import('../lib/convert-postgres-to-sqlite/index.js');
    
    t.equal(result, expected);
    t.end();
});
