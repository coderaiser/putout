[
    createTable(users, [
        column(id, BIGINT, identityByDefault(), primaryKey()),
        column(name, TEXT),
    ]),
];
