__putout_processor_sql([
    select(
        json_extract(
            data,
            '$.user.name',
        ),
        from(
            users,
        ),
    ),
]);

