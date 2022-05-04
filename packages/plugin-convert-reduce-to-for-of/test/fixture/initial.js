const a = b.reduce((c, d) => ({
    ...c,
    [d.name]: 'hello',
}), {});
