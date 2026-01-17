if (RegExp(`^${rule}`).test(name))
    return state;

if (RegExp(`^${rule}/`).test(name))
    return state;
