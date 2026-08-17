__putout_processor_sql([
    createTable(users, [
        column(id, INTEGER, primaryKey(), autoIncrement()),
        column(name, TEXT),
    ]),
]);
