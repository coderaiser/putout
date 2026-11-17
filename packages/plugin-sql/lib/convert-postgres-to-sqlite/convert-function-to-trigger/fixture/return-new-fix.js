__putout_processor_sql([
    createTrigger(
        add_foo,
        beforeInsert(
            foo,
        ),
        forEachRow(), [
            deleteFrom(
                from(
                    x,
                ),
                where(
                    y === NEW.id,
                ),
            ),
        ],
    ),
]);
