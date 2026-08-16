__putout_processor_sql([
    createSequence(users_id_seq),
    createTable(users, [
        column(id, INTEGER, nextval(users_id_seq), primaryKey()),
        column(name, TEXT),
    ]),
]);


__putout_processor_sql([
    createSequence(users_id_seq),
    createTable(users, [
        column(id, INTEGER, nextval(users_id_seq), primaryKey()),
    ]),
    createTable(posts, [
        column(id, INTEGER, nextval(users_id_seq), primaryKey()),
    ]),
]);