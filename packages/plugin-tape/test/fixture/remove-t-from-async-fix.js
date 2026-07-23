import {test} from 'supertape';

test('sqlite: all returns empty array', async ({dbAll: dbAll}, t) => {
    const db = await createDb();
    await db.exec('CREATE TABLE t (id INTEGER PRIMARY KEY, x TEXT)');
    const rows = await db.all('SELECT x FROM t WHERE x = :x', {
        x: 'missing',
    });
    await dbAll(rows, []);
});
