test('hello world', (t) => {
    const a = async () => true;

    const b = async () => {
    };

    const c = async () => {
        return a;
    };

    const d = async () => throw Error('hello');

    const e = async () => {
        throw Error('hello');
    };
});
