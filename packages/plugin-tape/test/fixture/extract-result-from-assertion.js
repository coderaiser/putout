t.notOk(screen
    .getByRole('button').disabled,
);

t.deepEqual(readState({
    getItem,
}), {
    a: 1,
});

test('one argument', (t) => {
    t.notOk(readState({
        getItem,
    }));
});