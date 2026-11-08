button.addEventListener('click', () => {
    let a = {};
    
    for (const d of b) {
        a = {
            ...a,
            [d.name]: 'hello',
        };
    }
});
