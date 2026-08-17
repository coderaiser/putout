[
    createTable(users, [
        column(id, INTEGER, primaryKey(), autoIncrement()),
        column(name, TEXT),
    ]),
];
