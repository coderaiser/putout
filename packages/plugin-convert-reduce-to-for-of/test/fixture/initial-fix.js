{
    let a = {};

    for (const c of b) {
        a = ({
            ...c,
            [a.name]: 'hello'
        });
    }
}
