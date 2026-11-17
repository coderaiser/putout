__putout_processor_sql([
    createTrigger(
        del_foo,
        afterDelete(
            foo,
        ), [
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
