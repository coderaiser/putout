test('hello world', (t) => {
    const a = stub().resolves(true);

    const b = stub().resolves();

    const c = async () => {
        return a;
    };

    const d = stub().rejects(Error('hello'));

    const e = stub().rejects(Error('hello'));
});
