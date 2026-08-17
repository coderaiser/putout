[
    createTable(users, [
        column(id, BIGINT, identity(), primaryKey()),
        column(name, TEXT),
    ]),
];
