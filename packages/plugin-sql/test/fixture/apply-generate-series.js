__putout_processor_sql([
    withRecursive(
        numbers(
            'value',
            unionAll(
                select(
                    1,
                ),
                select(
                    value + 2,
                    from(
                        numbers,
                        where(
                            value < 10,
                        ),
                    ),
                ),
            ),
        ),
        select(
            value,
            from(
                numbers,
            ),
        ),
    ),
]);
