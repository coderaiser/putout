__putout_processor_sql([
    createTable(users, [
        column(id, INTEGER, nextval(users_id_seq), primaryKey()),
        column(name, TEXT),
    ]),
]);
