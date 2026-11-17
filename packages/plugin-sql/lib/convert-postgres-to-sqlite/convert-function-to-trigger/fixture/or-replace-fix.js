__putout_processor_sql([
    createTrigger(
        del_foo,
        afterDelete(
            foo,
        ),
        ifNotExists(),
        forEachRow(), [
            deleteFrom(
                from(
                    x,
                ),
                where(
                    y === OLD.id,
                ),
            ),
        ],
    ),
]);
