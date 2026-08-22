const QUERY = `
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
`;

export const report = () => `Use 'generate_series()'`;

export const replace = () => ({
    [QUERY]: `
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
    `,
});
