{
    let m = {};
    
    for (const {a, b = []} of list) {
        m = {
            ...x,
            [a]: b || 'hello',
        };
    }
}
