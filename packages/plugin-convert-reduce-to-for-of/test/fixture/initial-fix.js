button.addEventListener('click', () => {
    let a = {};

    for (const c of b) {
        a = ({
            ...c,
            [a.name]: 'hello'
        });
    }
});
