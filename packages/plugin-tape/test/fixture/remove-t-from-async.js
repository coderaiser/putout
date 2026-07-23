test('sqlite: all returns empty array', async (t) => {
    const db = await createDb();
    await db.exec('CREATE TABLE t (id INTEGER PRIMARY KEY, x TEXT)');
    const rows = await db.all('SELECT x FROM t WHERE x = :x', {x: 'missing'});
    await t.dbAll(rows, []);
    
    t.end();
});
