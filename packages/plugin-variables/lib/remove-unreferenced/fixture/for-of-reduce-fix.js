{
    let m = {};
    
    for (const {a, b = []} of list) {
        m = {
            ...m,
            [a]: b || 'hello',
        };
    }
}
