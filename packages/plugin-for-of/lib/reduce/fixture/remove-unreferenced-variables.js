const m = list.reduce((x, {a, b = []}) => ({
    ...x,
    [a]: b || 'hello',
}), {});
