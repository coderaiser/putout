__putout_processor_sql([
    createTable(users, [
        column(id, serial(), primaryKey()),
        column(name, TEXT),
    ]),
]);