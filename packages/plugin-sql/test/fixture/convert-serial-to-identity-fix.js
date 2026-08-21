__putout_processor_sql([
    createTable(
        users, [
            column(
                id,
                INTEGER,
                primaryKey(),
                identity(),
            ),
            column(
                name,
                TEXT,
            ),
        ],
    ),
]);
