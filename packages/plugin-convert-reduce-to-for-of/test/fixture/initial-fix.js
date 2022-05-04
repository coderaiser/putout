{
    let a = {};

    for (const c of b) {
        a = ({
            ...c,
            d
        });
    }
}
