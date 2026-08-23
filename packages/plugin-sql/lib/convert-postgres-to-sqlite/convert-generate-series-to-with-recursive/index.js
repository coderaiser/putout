const QUERY = `
    select(
        '*',
        from(
            generateSeries(
                __a,
                __c,
                __b,
            ),
        ),
    )
`;

export const report = () => `Use 'WITH RECURSIVE'`;

export const replace = () => ({
    [QUERY]: `
        withRecursive(
            numbers(
                'value',
                unionAll(
                    select(
                        __a,
                    ),
                    select(
                        value + __b,
                        from(
                            numbers,
                            where(
                                value < __c,
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
        )
    `,
});
