__putout_processor_sql([
    select(
        '*',
        from(
            users,
            where([data, '?', 'email']),
        ),
    ),
]);