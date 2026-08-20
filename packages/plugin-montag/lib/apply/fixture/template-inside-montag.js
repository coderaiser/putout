test('happy-sql: roundtrip: update', (t) => {
    const source = montag`
        UPDATE CallExpression
        SET parent_type = :parent_type
        WHERE parent_id = :parent_id
    `;
    
    const ast = parseSql(source);
    const result = printSql(ast);
    const expected = `${source}\n`;
    
    t.equal(result, expected);
    t.end();
});
