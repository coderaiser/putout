__putout_processor_sql([
    createTable(users, [
        column(id, BIGINT, identity(), primaryKey()),
        column(name, TEXT),
    ]),
]);
