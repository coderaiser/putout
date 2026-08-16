__putout_processor_sql([
    insert(into(users, name, values('Alice'))),
    select(lastInsertRowid())
]);
